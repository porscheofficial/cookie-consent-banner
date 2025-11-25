import { E2EPage, newE2EPage } from "@stencil/core/testing";

type Cookie = Awaited<ReturnType<E2EPage['cookies']>>[number];

const cookieBannerFullyConfigured = `
<cookie-consent-banner
  btn-label-accept-and-continue="Agree and continue"
  btn-label-only-essential-and-continue="Continue with technically required cookies only"
  btn-label-persist-selection-and-continue="Save selection and continue"
  btn-label-select-all-and-continue="Select all and continue"
  content-settings-description="You can decide which cookies are used by selecting the respective options below. Please note that your selection may impair in the functionality of the service."
>
  We use cookies and similar technologies to provide certain features,
  enhance the user experience and deliver content that is relevant to your
  interests. Depending on their purpose, Analytics and marketing cookies may
  be used in addition to technically necessary cookies. By clicking on
  "Agree and continue", you declare your consent to the use of the
  aforementioned cookies.
  <a
    href="javascript:document.dispatchEvent(new Event('cookie_consent_details_show'))"
  >
    Here
  </a>
  you can make detailed settings or revoke your consent (in part if
  necessary) with effect for the future. For further information, please
  refer to our
  <a href="/privacy-policy">Privacy Policy</a>
  .
</cookie-consent-banner>
`;

describe("Cookie Consent Banner", () => {
  let page: E2EPage;

  const clickInCookieBanner = async (innerSelector: string): Promise<void> => {
    // somehow .click() doesn't work in the shadow dom
    // (Puppeteer Error "Node is either not clickable or not an HTMLElement")
    await page.evaluate((inner) => {
      (
        document
          .querySelector("cookie-consent-banner")
          ?.shadowRoot?.querySelector(inner) as HTMLElement | undefined
      )?.click();
    }, innerSelector);
  };

  const getConsentCookie = async (): Promise<Cookie | undefined> =>
    (await page.cookies()).find(
      (cookie) => cookie.name === "cookies_accepted_categories",
    );

  beforeEach(async () => {
    page = await newE2EPage();

    await page.waitForChanges();
  });

  afterEach(async () => {
    await page.deleteCookie(
      {
        name: "cookies_accepted_categories",
      },
      { name: "someUnrelatedCookie" },
    );
  });

  it("should render", async () => {
    await page.setContent(cookieBannerFullyConfigured);

    const cookieBanner = await page.find("cookie-consent-banner");

    expect(cookieBanner).not.toBeNull();
    expect(cookieBanner).toHaveClasses(["hydrated"]);
  });

  it("should be displayed if no cookies are set", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc",
    );

    expect(cookieBannerInnerDiv).not.toBeNull();
  });

  it("should be displayed if cookies other than cookieName are set", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    await page.setCookie({
      name: "someUnrelatedCookie",
      value: "someValue",
      domain: "localhost",
    });
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc",
    );

    expect(cookieBannerInnerDiv).not.toBeNull();
  });

  it("should not be displayed if cookieName cookie is set", async () => {
    // default `cookieName` is cookies_accepted_categories
    await page.setCookie({
      name: "cookies_accepted_categories",
      value: encodeURIComponent("technically_required,analytics"),
      domain: "localhost",
    });
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc",
    );

    expect(cookieBannerInnerDiv).toBeNull();
  });

  it("should not be displayed if cookieName cookie and other cookies are set", async () => {
    // default `cookieName` is cookies_accepted_categories
    await page.setCookie({
      name: "cookies_accepted_categories",
      value: encodeURIComponent("technically_required,analytics"),
      domain: "localhost",
    });

    await page.setCookie({
      name: "someUnrelatedCookie",
      value: "someValue",
      domain: "localhost",
    });
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc",
    );

    expect(cookieBannerInnerDiv).toBeNull();
  });

  it("should set cookies_accepted_categories to all passed cookie categories when 'Accept All' button is clicked", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    await page.waitForChanges();
    const banner = await page.find("cookie-consent-banner");

    banner.setProperty("availableCategories", [
      {
        description:
          "Enable you to navigate and use the basic functions and to store preferences.",
        key: "technically_required",
        label: "Technically necessary cookies",
        isMandatory: true,
      },
      {
        description:
          "Enable us to determine how visitors interact with our service in order to improve the user experience.",
        key: "analytics",
        label: "Analytics cookies",
      },
    ]);
    await page.waitForChanges();

    const acceptAllBtn = await page.find(
      "cookie-consent-banner >>> .btn_accept_all",
    );
    expect(acceptAllBtn).toEqualText("Agree and continue");
    await clickInCookieBanner(".btn_accept_all");
    await page.waitForChanges();

    // Check if cookies_accepted_categories is set to "technically_required,analytics"
    const cookieAcceptedCategories = (await page.cookies()).find(
      (cookie) => cookie.name === "cookies_accepted_categories",
    );
    expect(cookieAcceptedCategories?.value).toBe(
      encodeURIComponent("technically_required,analytics"),
    );
  });

  it("should set cookies_accepted_categories to only the mandatory when 'Only required' button is clicked", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    await page.waitForChanges();
    const banner = await page.find("cookie-consent-banner");

    banner.setProperty("availableCategories", [
      {
        description:
          "Enable you to navigate and use the basic functions and to store preferences.",
        key: "technically_required",
        label: "Technically necessary cookies",
        isMandatory: true,
      },
      {
        description:
          "Enable us to determine how visitors interact with our service in order to improve the user experience.",
        key: "analytics",
        label: "Analytics cookies",
      },
    ]);
    await page.waitForChanges();

    const onlyRequiredButton = await page.find(
      "cookie-consent-banner >>> .btn_essentials_only",
    );
    expect(onlyRequiredButton).toEqualText(
      "Continue with technically required cookies only",
    );
    await clickInCookieBanner(".btn_essentials_only");
    await page.waitForChanges();

    // Check if cookies_accepted_categories is set to "technically_required,analytics"
    const cookieAcceptedCategories = await getConsentCookie();
    expect(cookieAcceptedCategories?.value).toBe(
      encodeURIComponent("technically_required"),
    );
  });

  it("should set the cookies_accepted_categories cookie with all passed cookie attributes", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    await page.waitForChanges();

    const inAWeek = new Date();
    // eslint-disable-next-line no-magic-numbers, @typescript-eslint/no-magic-numbers
    inAWeek.setDate(inAWeek.getDate() + 7);

    await page.$eval(
      "cookie-consent-banner",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (elm: any, _inAWeekTimestamp) => {
        /* eslint-disable @typescript-eslint/no-unsafe-member-access, no-param-reassign  */
        // within the browser's context
        // let's set new property values on the component
        elm.availableCategories = [
          {
            description:
              "Enable you to navigate and use the basic functions and to store preferences.",
            key: "technically_required",
            label: "Technically necessary cookies",
            isMandatory: true,
          },
        ];
        elm.cookieAttributes = {
          expires: new Date(_inAWeekTimestamp),
          secure: true,
          sameSite: "lax",
        };
      },
      inAWeek.getTime(),
    );
    await page.waitForChanges();
    await clickInCookieBanner(".btn_accept_all");
    await page.waitForChanges();

    const cookieAcceptedCategories = await getConsentCookie();

    expect(cookieAcceptedCategories?.expires).toBe(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      Math.floor(inAWeek.getTime() / 1000), // Puppeteer returns seconds, JS uses milliseconds
    );
    expect(cookieAcceptedCategories?.secure).toBe(true);
    expect(cookieAcceptedCategories?.sameSite).toBe("Lax");

    expect(0).toBe(0);
  });
});
