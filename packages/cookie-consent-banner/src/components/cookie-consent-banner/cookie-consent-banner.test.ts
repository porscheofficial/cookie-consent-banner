import { E2EPage, newE2EPage } from "@stencil/core/testing";

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
  interests. Depending on their purpose, analysis and marketing cookies may
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

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it("should render", async () => {
    await page.setContent(cookieBannerFullyConfigured);

    const cookieBanner = await page.find("cookie-consent-banner");

    expect(cookieBanner).toBeDefined();
    expect(cookieBanner).toHaveClasses(["hydrated"]);
  });

  it("should be displayed if no cookies are set", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc"
    );

    expect(cookieBannerInnerDiv).toBeDefined();
  });

  it("should be displayed if cookies other than cookieName are set", async () => {
    await page.setContent(cookieBannerFullyConfigured);
    await page.setCookie({
      name: "someUnrelatedCookie",
      value: "someValue",
      domain: "localhost",
    });
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc"
    );

    expect(cookieBannerInnerDiv).toBeDefined();
  });

  it("should not be displayed if cookieName cookie is set", async () => {
    // default `cookieName` is cookies_accepted_categories
    await page.setCookie({
      name: "cookies_accepted_categories",
      value: "technically_required,analytics",
      domain: "localhost",
    });
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc"
    );

    expect(cookieBannerInnerDiv).toBeNull();
  });

  it("should not be displayed if cookieName cookie and other cookies are set", async () => {
    // default `cookieName` is cookies_accepted_categories
    await page.setCookie({
      name: "cookies_accepted_categories",
      value: "technically_required,analytics",
      domain: "localhost",
    });

    await page.setCookie({
      name: "someUnrelatedCookie",
      value: "someValue",
      domain: "localhost",
    });
    await page.setContent(cookieBannerFullyConfigured);
    const cookieBannerInnerDiv = await page.find(
      "cookie-consent-banner >>> .cc"
    );

    expect(cookieBannerInnerDiv).toBeNull();
  });
});
