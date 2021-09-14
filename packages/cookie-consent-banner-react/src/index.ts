import { useEffect, useState } from "react";
export * from "./stencilproxy/components";

function isCustomEvent(event: Event): event is CustomEvent {
  return "acceptedCategories" in event;
}

export function useCookieConsent(): string[] {
  const [acceptedCategories, setAcceptedCategories] = useState<string[]>([]);

  const acceptedCategoriesListener: EventListener = (event) => {
    if (isCustomEvent(event)) {
      setAcceptedCategories(event?.detail?.acceptedCategories ?? []);
    }
  };

  useEffect(() => {
    window.addEventListener(
      "cookie_consent_preferences_restored",
      acceptedCategoriesListener
    );
    window.addEventListener(
      "cookie_consent_preferences_updated",
      acceptedCategoriesListener
    );

    return (): void => {
      window.removeEventListener(
        "cookie_consent_preferences_restored",
        acceptedCategoriesListener
      );
      window.removeEventListener(
        "cookie_consent_preferences_updated",
        acceptedCategoriesListener
      );
    };
  }, []);

  return acceptedCategories;
}
