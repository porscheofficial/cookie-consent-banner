<div align="center">
  <a target="_blank" rel="noopener noreferrer" href="https://github.com/porscheofficial/cookie-consent-banner/">
    <img src="https://github.com/porscheofficial/cookie-consent-banner/raw/main/assets/logo.svg" alt="" width="200" height="200"/>
  </a>

# Cookie Consent Banner – React

</div>

The Cookie Consent Banner is implemented as Web Component and additionally exported as React Component.
This guide explains how to use the React Component.

_Click here to have a look on the documentation of the [Web Component](https://github.com/porscheofficial/cookie-consent-banner/tree/main/packages/cookie-consent-banner)._  
_Make sure to also have a look on the [main repository](https://github.com/porscheofficial/cookie-consent-banner)._

---

- [Usage](#spiral_notepad-usage)
  - [Installation](#installation)
  - [Attributes](#attributes)
  - [Events Dispatched](#events-dispatched-by-the-component)
  - [Events Receivable](#events-receivable-by-the-component)
  - [Styling](#styling)
- [Real World Example](#-real-world-example-with-tag-manager-and-custom-error-tracking)
- [Disclaimer](#disclaimer)
- [License](#license)

## :spiral_notepad: Usage

### Installation

```bash
// yarn
yarn add @porscheofficial/cookie-consent-banner-react
// or npm
npm i @porscheofficial/cookie-consent-banner-react --S
```

### Properties

| Property (React)                            | Default                         | Type                                                                   | Description                                                                      |
| :------------------------------------------ | :------------------------------ | :--------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `availableCategories`                       | `[]`                            | `CategoryItem[]`                                                       | Provide the available Categories. See Real World example                         |
| `cookieDomain`                              | `document.location.hostname`    | `string`                                                               |                                                                                  |
| `cookieName`                                | `"cookies_accepted_categories"` | `string`                                                               |                                                                                  |
| `disableResetSiteCookiesOnConsentWithdrawn` | `false`                         | `boolean`                                                              | Prevent cookies from being deleted automatically if consent of the user changed. |
| `disableSlideInAnimation`                   | `false`                         | `boolean`                                                              | Disable slide-in animation of banner (See #7)                                    |
| `headline`                                  | `undefined`                     | `string`                                                               |                                                                                  |
| `btnLabelAcceptAndContinue`                 | `undefined`                     | `string`                                                               |                                                                                  |
| `btnLabelAllAndContinue`                    | `undefined`                     | `string`                                                               |                                                                                  |
| `btnLabelOnlyEssentialAndContinue`          | `undefined`                     | `string`                                                               |                                                                                  |
| `btnLabelPersistSelectionAndContinue`       | `undefined`                     | `string`                                                               |                                                                                  |
| `contentSettingsDescription`                | `undefined`                     | `string`                                                               |                                                                                  |
| `handlePreferencesRestored`                 | `undefined`                     | `({ acceptedCategories, }: { acceptedCategories: string[]; }) => void` |
| `handlePreferencesUpdated`                  | `undefined`                     | `({ acceptedCategories, }: { acceptedCategories: string[]; }) => void` |                                                                                  |

### Events Dispatched by the Component

Instead of listening to the events directly, the props `handlePreferencesRestored` and `handlePreferencesUpdated` can be used.

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

#### How to use it?

In order to allow the user to always update its preferences it's possible to trigger the banner by sending an event:

```html
<a href="javascript:document.dispatchEvent(new Event('cookie_consent_show'))">
  Show Cookie Settings
</a>
```

### Convenience Functions

#### React Hook `useCookieConsent`

Subscribe to changes of the consent.

```ts
import { useCookieConsent } from "@porscheofficial/cookie-consent-banner-react";

export const SomePage: React.FC = () => {
  const acceptedCategories = useCookieConsent();
  //...
};
```

#### `triggerCookieConsentBanner`

Easily show the cookie consent banner.

```ts
import { triggerCookieConsentBanner } from "@porscheofficial/cookie-consent-banner-react";

// Only the banner
triggerCookieConsentBanner();

// Also show the details
triggerCookieConsentBanner({ showDetails: true });
```

### Styling

Styling can be done in two different ways: Either via the availabe CSS Properties or via the [CSS `::part` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

#### Styling with CSS Properties

The appearance of the component can be influenced by updating the availabe CSS Properties. In most cases this is enough customization flexibility but since not every aspect is exposed, you might want to use the [`::part` selectors](#styling-with-the-part-selectors) if you need more flexibility.

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

#### Styling with the `::part` selectors

For full control over the styles we provide you these CSS parts to customize completely by your own:

1. `cookie-consent-banner::part(button-accept-all)` for styling the primary button which triggers "Accept All Cookies"
2. `cookie-consent-banner::part(button-persist-selection)` for styling the secondary button which triggers "Save Selection"
3. `cookie-consent-banner::part(button-essential-only)` for styling the secondary button which triggers "Only required Cookies"
4. `cookie-consent-banner::part(checkbox)` for styling the checkboxes
5. `cookie-consent-banner::part(description-main)` for styling the main description text
6. `cookie-consent-banner::part(description-settings)` for styling the description text on the expanded settings
7. `cookie-consent-banner::part(headline)` for styling the headline

```html
<style>
  cookie-consent-banner::part(primary-button) {
    text-transform: uppercase;
  }

  cookie-consent-banner::part(secondary-button) {
    text-transform: uppercase;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  }

  cookie-consent-banner::part(checkbox) {
    accent-color: rgb(24, 251, 107);
  }

  cookie-consent-banner::part(description),
  cookie-consent-banner::part(headline) {
    font-family: "Arial", sans-serif;
  }
</style>
```

## 🚀 Real World example with Tag Manager and Custom Error Tracking

This example shows how the component could be integrated into your web application.
Additional scripts that set cookies, for which the consent of the visitor is required, can either be loaded via a tag manager or programmatically.
In the following example, an `ErrorTrackingService` is initialized after the consent has been given and a Tag Manager Script is added to the head of the page.
Once the visitor stores the consent settings, two things happen: The consent data is stored as a cookie `cookies_accepted_categories` and the tag manager is initialized, which takes care of other scripts (tags).
Have a look on the main repository for an [example consent flow](https://github.com/porscheofficial/cookie-consent-banner#arrows_counterclockwise-consent-flow).

```jsx
import {
  CookieConsentBanner,
  triggerCookieConsentBanner,
} from "@porscheofficial/cookie-consent-banner-react";

const initConsent = ({ acceptedCategories }) => {
  // -------------------------------------------------------------------------
  // Error Tracking Service
  // Analytics
  // -------------------------------------------------------------------------
  if (acceptedCategories.includes("analytics")) {
    ErrorTrackingService.init({
      dsn: process.env.DSN,
      environment: process.env.ENV,
    });
  }
};

const Root = ({ children }) => {
  const [acceptedCategories, setAcceptedCategories] = useState([]);

  return (
    <div>
      <Helmet>
        {(Boolean(acceptedCategories.includes("analytics")) ||
          Boolean(acceptedCategories.includes("marketing"))) &&
          process.env.ENV === "prod" && (
            <script id="tagmanager-script" key="tagmanager-script">
              {/* Load Tag Manager Script */}
            </script>
          )}
      </Helmet>
      <div>{children}</div>
      <CookieConsentBanner
        handlePreferencesUpdated={initConsent}
        handlePreferencesRestored={initConsent}
        btnLabelAcceptAndContinue="Agree and continue"
        btnLabelSelectAllAndContinue="Select all and continue"
        btnLabelOnlyEssentialAndContinue="Continue with technically required cookies only"
        btnLabelPersistSelectionAndContinue="Save selection and continue"
        contentSettingsDescription="You can decide which cookies are used by selecting the respective options below. Please note that your selection may impair in the functionality of the service."
        availableCategories={[
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
        ]}
      >
        We use cookies and similar technologies to provide certain features,
        enhance the user experience and deliver content that is relevant to your
        interests. Depending on their purpose, analysis and marketing cookies
        may be used in addition to technically necessary cookies. By clicking on
        &quot;Agree and continue&quot;, you declare your consent to the use of
        the aforementioned cookies.
        <button
          onClick={() => {
            triggerCookieConsentBanner({ showDetails: true });
          }}
          onKeyPress={() => {
            triggerCookieConsentBanner({ showDetails: true });
          }}
          type="button"
        >
          Here
        </button> you can make detailed settings or revoke your consent (in part
        if necessary) with effect for the future. For further information, please
        refer to our
        <a href="/privacy-policy">Privacy Policy</a>.
      </CookieConsentBanner>
    </div>
  );
};
```

---

## Disclaimer

_Please note that you must individually assess the legal requirements regarding the implementation of the Cookie Consent Banner, in particular which choices to offer in which granularity and which information to provide in which detail and at which point of the user journey. The examples mentioned are not intended to provide any advice regarding legal requirements. All responsibility for the implementation of the Cookie Consent Banner and its compliance with legal requirements lies with the user._

## License

See [LICENSE](./LICENSE.md).
