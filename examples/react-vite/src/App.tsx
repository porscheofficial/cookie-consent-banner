import {
  CookieConsentBanner,
  triggerCookieConsentBanner,
} from "@porscheofficial/cookie-consent-banner-react";

function App() {
  return (
    <>
      <button
        onClick={() => {
          triggerCookieConsentBanner();
        }}
        type="button"
      >
        Open Cookie Consent Banner
      </button>
      <CookieConsentBanner
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
          type="button"
        >
          Here
        </button>{" "}
        you can make detailed settings or revoke your consent (in part if
        necessary) with effect for the future. For further information, please
        refer to our
        <a href="/privacy-policy">Privacy Policy</a>.
      </CookieConsentBanner>
    </>
  );
}

export default App;
