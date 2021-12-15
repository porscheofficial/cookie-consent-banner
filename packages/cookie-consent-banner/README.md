<div align="center">
  <a target="_blank" rel="noopener noreferrer" href="https://github.com/porscheofficial/cookie-consent-banner/">
    <img src="https://github.com/porscheofficial/cookie-consent-banner/raw/main/assets/logo.svg" alt="" width="200" height="200"/>
  </a>

# Cookie Consent Banner – Web Component

</div>

The Cookie Consent Banner is implemented as Web Component and additionally exported as React Component.
This guide explains how to use the Web Component.

_Click here to have a look on the documentation of the [React Component](https://github.com/porscheofficial/cookie-consent-banner/tree/main/packages/cookie-consent-banner-react)._
_Make sure to also have a look on the [main repository](https://github.com/porscheofficial/cookie-consent-banner)._

---

- [Usage](#spiral_notepad-usage)
  - [Installation](#installation)
  - [Attributes](#attributes)
  - [Events Dispatched](#events-dispatched-by-the-component)
  - [Events Receivable](#events-receivable-by-the-component)
  - [Styling](#styling)
- [Real World Example](#rocket-real-world-example)
- [Disclaimer](#disclaimer)
- [License](#license)

## :spiral_notepad: Usage

### Installation

Either install via a package manager, or include the component through one of the various npm delivery networks (skypack, unpkg,..).

```bash
// yarn
yarn add @porscheofficial/cookie-consent-banner
// or npm
npm i @porscheofficial/cookie-consent-banner --S
```

```html
<script
  type="module"
  src="https://unpkg.com/@porscheofficial/cookie-consent-banner@1.0.0/dist/cookie-consent-banner/cookie-consent-banner.esm.js"
></script>
```

### Attributes

| Attribute (Web Component)                         | Default                         | Type             | Description                                                                      |
| :------------------------------------------------ | :------------------------------ | :--------------- | :------------------------------------------------------------------------------- |
| `available-categories`                            | `[]`                            | `CategoryItem[]` | Provide the available Categories. See Real World example                         |
| `cookie-domain`                                   | `document.location.hostname`    | `string`         |                                                                                  |
| `cookie-name`                                     | `"cookies_accepted_categories"` | `string`         |                                                                                  |
| `disable-reset-site-cookies-on-consent-withdrawn` | `false`                         | `boolean`        | Prevent cookies from being deleted automatically if consent of the user changed. |
| `headline`                                        | `undefined`                     | `string`         |                                                                                  |
| `btn-label-accept-and-continue`                   | `undefined`                     | `string`         |                                                                                  |
| `btn-label-select-all-and-continue`               | `undefined`                     | `string`         |                                                                                  |
| `btn-label-only-essential-and-continue`           | `undefined`                     | `string`         |                                                                                  |
| `btn-label-persist-selection-and-continue`        | `undefined`                     | `string`         |
| `content-settings-description`                    | `undefined`                     | `string`         |                                                                                  |

### Events Dispatched by the Component

| Event                                 | Description                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------ |
| `cookie_consent_preferences_restored` | Consent Settings have been saved previously and are now restored on Page Load. |
| `cookie_consent_preferences_updated`  | Consent Settings have been updated. Either initially set or changed.           |

### Events Receivable by the Component

It's possible to send JavaScript Events to control the banner.

| Event                         | Description                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `cookie_consent_show`         | Show the the Consent Banner.                                                                   |
| `cookie_consent_details_show` | Show the detailed settings (categories). Also the Consent Banner is shown if not done already. |

#### Q: How to show the cookie consent banner again?

In order to allow the user to always update its preferences it's possible to trigger the banner by sending an event:

```html
<a href="javascript:document.dispatchEvent(new Event('cookie_consent_show'))">
  Show Cookie Settings
</a>
```

### Styling

The appearance of the component can be influenced by updating the availabe CSS Properties.

```html
<style>
  :root {
    /* COLORS */
    --cookie-consent-banner-colors-primary: #81c784;
    --cookie-consent-banner-colors-primary-border: #81c784;
    --cookie-consent-banner-colors-primary-content: #fff;
    --cookie-consent-banner-colors-secondary: transparent;
    --cookie-consent-banner-colors-secondary-border: #fff;
    --cookie-consent-banner-colors-secondary-content: #fff;
    --cookie-consent-banner-colors-background-body: rgba(25, 31, 34, 0.92);
    --cookie-consent-banner-colors-text: #fff;

    /* BORDER-RADIUS */
    --cookie-consent-banner-border-radius-buttons: 1rem;
    --cookie-consent-banner-border-radius-body: 0;

    /* SPACINGS */
    --cookie-consent-banner-spacings-container-padding-top: 1rem;
    --cookie-consent-banner-spacings-container-padding-left: 1rem;
    --cookie-consent-banner-spacings-container-padding-bottom: 1rem;
    --cookie-consent-banner-spacings-container-padding-right: 1rem;

    --cookie-consent-banner-spacings-body-padding-top: 0;
    --cookie-consent-banner-spacings-body-padding-left: 2rem;
    --cookie-consent-banner-spacings-body-padding-bottom: 0;
    --cookie-consent-banner-spacings-body-padding-right: 2rem;

    /* Z-INDEX */
    --cookie-consent-banner-z-index-container: 99;

    /* FONTS */
    --cookie-consent-banner-font-family-headline: inherit;
    --cookie-consent-banner-font-size-headline: 1.5rem;
    --cookie-consent-banner-font-family-body: inherit;
    --cookie-consent-banner-font-size-body: 0.875rem;
  }
</style>
```

## :rocket: Real World Examples

### ...with Tag Manager

This example shows how the component could be integrated into your web application by leveraging the features of a tag manager.
The tag manager is not loaded as long as there is no consent given.
Once the visitor stores the consent settings, two things happen: The consent data is stored as a cookie `cookies_accepted_categories` and the tag manager is initialized.
Have a look on the main repository for an [example consent flow](https://github.com/porscheofficial/cookie-consent-banner#arrows_counterclockwise-consent-flow).

```html
<!-- Import Web Component -->
<script
  type="module"
  src="https://unpkg.com/@porscheofficial/cookie-consent-banner@2.1.0/dist/cookie-consent-banner/cookie-consent-banner.esm.js"
></script>
<!-- Update Styles-->
<style>
  :root {
    --cookie-consent-banner-z-index-container: 101;
    --cookie-consent-banner-colors-primary: rgba(0, 255, 255, 0.82);
    --cookie-consent-banner-colors-primary-border: var(
      --cookie-consent-banner-colors-primary
    );
    --cookie-consent-banner-colors-primary-content: #fff;

    --cookie-consent-banner-border-radius-buttons: 100px;
    --cookie-consent-banner-border-radius-body: 0;

    --cookie-consent-banner-spacings-container-padding-top: 0;
    --cookie-consent-banner-spacings-container-padding-left: 0;
    --cookie-consent-banner-spacings-container-padding-bottom: 0;
    --cookie-consent-banner-spacings-container-padding-right: 0;
  }
</style>

<!-- Init Web Component -->
<cookie-consent-banner
  btn-label-accept-and-continue="Agree and continue"
  btn-label-only-essential-and-continue="Continue with technically required cookies only"
  btn-label-persist-selection-and-continue="Save selection and continue"
  btn-label-select-all-and-continue="Select all and continue"
  content-settings-description="You can decide which cookies are used by selecting the respective options below. Please note that your selection may impair in the functionality of the service."
>
  We use cookies and similar technologies to provide certain features, enhance
  the user experience and deliver content that is relevant to your interests.
  Depending on their purpose, analysis and marketing cookies may be used in
  addition to technically necessary cookies. By clicking on "Agree and
  continue", you declare your consent to the use of the aforementioned cookies.
  <a
    href="javascript:document.dispatchEvent(new Event('cookie_consent_details_show'))"
  >
    Here
  </a>
  you can make detailed settings or revoke your consent (in part if necessary)
  with effect for the future. For further information, please refer to our
  <a href="/privacy-policy">Privacy Policy</a>
  .
</cookie-consent-banner>

<!-- Open Banner again -->
<a href="javascript:document.dispatchEvent(new Event('cookie_consent_show'))">
  Show Cookie Consent Settings
</a>

<!-- Scripts -->
<script>
  /* Update available Cookie Categories */
  const cookieConsentBannerElement = document.querySelector(
    "cookie-consent-banner"
  );
  cookieConsentBannerElement.availableCategories = [
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
      label: "Analysis cookies",
    },
    {
      description:
        "Enable us to offer and evaluate relevant content and interest-based advertising.",
      key: "marketing",
      label: "Marketing cookies",
    },
  ];

  /* Init Tag Manager */
  function loadTagManager() {
    if (typeof google_tag_manager !== "undefined") return; // load only once
    const gTags = function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
      let f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    };

    gTags(window, document, "script", "dataLayer", "GTM-XXX");
  }
  window.addEventListener(
    "cookie_consent_preferences_restored",
    loadTagManager
  );
  window.addEventListener("cookie_consent_preferences_updated", loadTagManager);
</script>
```

### ...without Tag Manager

This example shows how the component could be integrated into your web application without leveraging the features of a tag manager.
The scripts are not loaded as long as there is no consent given.
Once the visitor stores the consent settings, two things happen: The consent data is stored as a cookie `cookies_accepted_categories` and the script elements are added to the page.

```html
<!-- Import Web Component -->
<script
  type="module"
  src="https://unpkg.com/@porscheofficial/cookie-consent-banner@2.1.0/dist/cookie-consent-banner/cookie-consent-banner.esm.js"
></script>
<!-- Update Styles-->
<style>
  :root {
    --cookie-consent-banner-z-index-container: 101;
    --cookie-consent-banner-colors-primary: rgba(0, 255, 255, 0.82);
    --cookie-consent-banner-colors-primary-border: var(
      --cookie-consent-banner-colors-primary
    );
    --cookie-consent-banner-colors-primary-content: #fff;

    --cookie-consent-banner-border-radius-buttons: 100px;
    --cookie-consent-banner-border-radius-body: 0;

    --cookie-consent-banner-spacings-container-padding-top: 0;
    --cookie-consent-banner-spacings-container-padding-left: 0;
    --cookie-consent-banner-spacings-container-padding-bottom: 0;
    --cookie-consent-banner-spacings-container-padding-right: 0;
  }
</style>

<!-- Init Web Component -->
<cookie-consent-banner
  btn-label-accept-and-continue="Agree and continue"
  btn-label-only-essential-and-continue="Continue with technically required cookies only"
  btn-label-persist-selection-and-continue="Save selection and continue"
  btn-label-select-all-and-continue="Select all and continue"
  content-settings-description="You can decide which cookies are used by selecting the respective options below. Please note that your selection may impair in the functionality of the service."
>
  We use cookies and similar technologies to provide certain features, enhance
  the user experience and deliver content that is relevant to your interests.
  Depending on their purpose, analysis and marketing cookies may be used in
  addition to technically necessary cookies. By clicking on "Agree and
  continue", you declare your consent to the use of the aforementioned cookies.
  <a
    href="javascript:document.dispatchEvent(new Event('cookie_consent_details_show'))"
  >
    Here
  </a>
  you can make detailed settings or revoke your consent (in part if necessary)
  with effect for the future. For further information, please refer to our
  <a href="/privacy-policy">Privacy Policy</a>
  .
</cookie-consent-banner>

<!-- Open Banner again -->
<a href="javascript:document.dispatchEvent(new Event('cookie_consent_show'))">
  Show Cookie Consent Settings
</a>

<script>
  /* Update available Cookie Categories */
  const cookieConsentBannerElement = document.querySelector(
    "cookie-consent-banner"
  );
  cookieConsentBannerElement.availableCategories = [
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
      label: "Analysis cookies",
    },
    {
      description:
        "Enable us to offer and evaluate relevant content and interest-based advertising.",
      key: "marketing",
      label: "Marketing cookies",
    },
  ];
</script>

<script>
  // =========================================================================
  // EXAMPLE
  // ANALYTICS w/o TAG MANAGER
  // =========================================================================
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());

  gtag("config", "ENTERID");

  function loadAnalyticsScript() {
    // Add Script only once
    const scriptElementExists = document.querySelector("[data-scriptid='ga']");
    if (scriptElementExists || window?.ga) return;

    const firstScriptElement = document.getElementsByTagName("script")[0];

    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.setAttribute("async", "true");
    scriptElement.setAttribute(
      "src",
      "https://www.googletagmanager.com/gtag/js?id=ENTERID"
    );
    scriptElement.setAttribute("data-scriptid", "ga");

    firstScriptElement.parentNode.insertBefore(
      scriptElement,
      firstScriptElement
    );
  }
  // =========================================================================
  // COOKIE CONSENT: LOAD SCRIPTS AFTER USER INTERACTION
  // =========================================================================
  function loadScripts(event) {
    const acceptedCategories = event?.detail?.acceptedCategories;

    if (acceptedCategories.includes("analytics")) {
      console.log("Analytics accepted.");

      loadAnalyticsScript();
    }
    if (acceptedCategories.includes("marketing")) {
      console.log("Marketing accepted.");
    }
  }

  window.addEventListener("cookie_consent_preferences_restored", loadScripts);
  window.addEventListener("cookie_consent_preferences_updated", loadScripts);
</script>
```

---

## Disclaimer

_Please note that you must individually assess the legal requirements regarding the implementation of the Cookie Consent Banner, in particular which choices to offer in which granularity and which information to provide in which detail and at which point of the user journey. The examples mentioned are not intended to provide any advice regarding legal requirements. All responsibility for the implementation of the Cookie Consent Banner and its compliance with legal requirements lies with the user._

## License

See [LICENSE](./LICENSE.md).
