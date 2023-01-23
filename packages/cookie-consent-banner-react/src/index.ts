import { useEffect, useState } from "react";

// @ts-expect-error will be there after build
// eslint-disable-next-line import/extensions,import/no-unresolved
export * from "./stencilproxy/components";

const isCustomEvent = (
  event: Event
): event is CustomEvent<{
  acceptedCategories: string[];
}> => {
  if (!Object.hasOwn(event, "detail")) return false;
  const { detail } = event as unknown as { detail: Record<string, unknown> };

  if (!Object.hasOwn(detail, "acceptedCategories")) return false;
  return Array.isArray(detail.acceptedCategories);
};

export const useCookieConsent = (): string[] => {
  const [acceptedCategories, setAcceptedCategories] = useState<string[]>([]);

  const acceptedCategoriesListener: EventListener = (event) => {
    if (isCustomEvent(event)) {
      setAcceptedCategories(event.detail.acceptedCategories);
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
};

export const triggerCookieConsentBanner = (options?: {
  showDetails: boolean;
}): void => {
  if (options?.showDetails) {
    document.dispatchEvent(new Event("cookie_consent_details_show"));
  } else {
    document.dispatchEvent(new Event("cookie_consent_show"));
  }
};
