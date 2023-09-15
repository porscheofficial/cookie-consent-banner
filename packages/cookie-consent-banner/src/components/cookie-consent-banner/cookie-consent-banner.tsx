/* eslint-disable @typescript-eslint/no-unsafe-return,no-unused-vars,@typescript-eslint/no-unused-vars */
// https://github.com/ionic-team/stencil/blob/master/BREAKING_CHANGES.md
import {
  Component,
  Event,
  EventEmitter,
  Listen,
  h,
  State,
  Prop,
  JSX,
} from "@stencil/core";
import { CategoryItem } from "./types";
import { getCookie } from "../../utils/parseCookies";

@Component({
  tag: "cookie-consent-banner",
  styleUrl: "cookie-consent-banner.css",
  shadow: true,
})
export class CookieConsentBanner {
  // ===========================================================================
  // PROPS
  // ===========================================================================

  // Available Categories
  @Prop() public availableCategories: CategoryItem[] = [];

  // Overwrite Cookie Name
  @Prop() public cookieName = "cookies_accepted_categories";

  // Overwrite Cookie Domain
  @Prop() public cookieDomain = document.location.hostname;

  // Site Cookies will be deleted if consent for any category is withdrawn. Set to true to disable behaviour.
  @Prop() public disableResetSiteCookiesOnConsentWithdrawn = false;

  // A cookie banner could have impact on the Web Vitals / LCP measurement
  // See #7
  @Prop() public disableSlideInAnimation = false;

  // Add Headline
  @Prop() public headline: string;

  // BTN Label Accept and Continue
  @Prop() public btnLabelAcceptAndContinue: string;

  // BTN Label Only essential and Continue
  @Prop() public btnLabelOnlyEssentialAndContinue: string;

  // BTN Label Select all and Continue
  @Prop() public btnLabelSelectAllAndContinue: string;

  // BTN Label Persist selection and Continue
  @Prop() public btnLabelPersistSelectionAndContinue: string;

  // CONTENT Settings description
  @Prop() public contentSettingsDescription: string;

  // Event Handler
  @Prop() public handlePreferencesRestored: ({
    acceptedCategories,
  }: {
    acceptedCategories: string[];
  }) => void;

  // Event Handler
  @Prop() public handlePreferencesUpdated: ({
    acceptedCategories,
  }: {
    acceptedCategories: string[];
  }) => void;

  // =============================================================================
  // STATES
  // =============================================================================

  @State() public isShown = false;

  @State() public acceptedCategoriesNext: string[] = [];

  @State() public acceptedCategoriesPersisted: string[] = [];

  @State() public isShownSettings = false;

  // Trigger isShown via Event
  @Listen("cookie_consent_show", { target: "document" })
  public eventListenerShow(): void {
    this.isShown = true;
  }

  // Trigger isShown and isShownSettings via Event
  @Listen("cookie_consent_details_show", { target: "document" })
  public eventListenerDetailsShow(): void {
    this.isShown = true;
    this.isShownSettings = true;
  }

  // ===========================================================================
  // EVENTS
  // ===========================================================================

  // Cookie Consent has been given previously
  @Event({
    eventName: "cookie_consent_preferences_restored",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  public eventCookieConsentRestored: EventEmitter;

  // Cookie Consent updated or initially given
  @Event({
    eventName: "cookie_consent_preferences_updated",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  public eventCookieConsentUpdated: EventEmitter;

  // ===========================================================================

  /* eslint-disable-next-line @typescript-eslint/explicit-member-accessibility */
  public componentWillLoad(): void {
    const defaultCookies = this.availableCategories
      .filter((category) => category.isMandatory)
      .map((category) => category.key);

    let cookieValues: string[] = [];

    if (document.cookie) {
      const cookieValueString = getCookie(this.cookieName);
      cookieValues = cookieValueString ? cookieValueString.split(",") : [];
    }

    if (cookieValues.length === 0) {
      this.isShown = true;
      // Nothing stored yet
      this.acceptedCategoriesPersisted = defaultCookies;
      this.acceptedCategoriesNext = defaultCookies;
    } else {
      this.acceptedCategoriesPersisted = cookieValues;
      this.acceptedCategoriesNext = cookieValues;
      this.eventCookieConsentRestored.emit({
        acceptedCategories: cookieValues,
      });
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (this.handlePreferencesRestored) {
        this.handlePreferencesRestored({
          acceptedCategories: cookieValues,
        });
      }
    }
  }

  private persistSelection(): void {
    // Need to reset cookies?
    const consentWithdrawn = Boolean(
      this.acceptedCategoriesPersisted.filter(
        (x) => !this.acceptedCategoriesNext.includes(x)
      ).length
    );
    // Reset cookies
    if (!this.disableResetSiteCookiesOnConsentWithdrawn && consentWithdrawn) {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
    }

    this.acceptedCategoriesPersisted = this.acceptedCategoriesNext;
    const cookieValue = this.acceptedCategoriesNext.join(",");
    document.cookie = `${this.cookieName}=${cookieValue};domain=${this.cookieDomain};max-age=50400000;path=/`;
    this.eventCookieConsentUpdated.emit({
      acceptedCategories: this.acceptedCategoriesPersisted,
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.handlePreferencesUpdated) {
      this.handlePreferencesUpdated({
        acceptedCategories: this.acceptedCategoriesPersisted,
      });
    }
    this.isShown = false;
  }

  private handleAcceptAll(): void {
    this.acceptedCategoriesNext = this.availableCategories.map(
      (category) => category.key
    );
    this.persistSelection();
  }

  private handleEssentialsOnly(): void {
    const mandatoryCategories = this.availableCategories.filter(
      (category) => category.isMandatory
    );
    this.acceptedCategoriesNext = mandatoryCategories.map(
      (category) => category.key
    );
    this.persistSelection();
  }

  public render(): JSX.Element | null {
    if (!this.isShown) {
      return null;
    }
    return (
      <div
        class={this.disableSlideInAnimation ? "cc cc_disable-slide-in" : "cc"}
      >
        <div
          class="cc_body"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie Consent Management"
          tabIndex={-1}
        >
          {Boolean(this.headline) && (
            <h1 class="cc_headline" part="headline">
              {this.headline}
            </h1>
          )}
          <form>
            <p class="cc_text" part="description-main">
              <slot />
            </p>
            {Boolean(this.isShownSettings) && (
              <div class="cc_settings">
                <p part="description-settings" class="cc_settings_description">
                  {this.contentSettingsDescription}
                </p>
                <div class="cc_checkboxes">
                  {this.availableCategories.map((category) => (
                    <label
                      part="checkbox-label"
                      class="cc_checkboxes_item"
                      htmlFor={`check-category-${category.label}`}
                    >
                      <input
                        part="checkbox"
                        id={`check-category-${category.label}`}
                        type="checkbox"
                        disabled={category.isMandatory ?? false}
                        checked={this.acceptedCategoriesNext.includes(
                          category.key
                        )}
                        onChange={(event): void => {
                          const isChecked = (
                            event.currentTarget as HTMLInputElement
                          ).checked;
                          if (isChecked) {
                            this.acceptedCategoriesNext = [
                              ...this.acceptedCategoriesNext,
                              category.key,
                            ];
                          } else {
                            this.acceptedCategoriesNext =
                              this.acceptedCategoriesNext.filter(
                                (item) => item !== category.key
                              );
                          }
                        }}
                      />{" "}
                      {category.label}
                      {": "}
                      {category.description}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div class="cc_buttons">
              {Boolean(this.isShownSettings) && (
                <button
                  part="button-persist-selection"
                  type="submit"
                  class="secondary"
                  onClick={() => this.persistSelection()}
                  onKeyPress={() => this.persistSelection()}
                >
                  {this.btnLabelPersistSelectionAndContinue}
                </button>
              )}
              {!this.isShownSettings &&
                !!this.btnLabelOnlyEssentialAndContinue && (
                  <button
                    part="button-essential-only"
                    class="secondary"
                    type="button"
                    onClick={() => this.handleEssentialsOnly()}
                    onKeyPress={() => this.handleEssentialsOnly()}
                  >
                    {this.btnLabelOnlyEssentialAndContinue}
                  </button>
                )}
              <button
                part="button-accept-all"
                onClick={() => this.handleAcceptAll()}
                onKeyPress={() => this.handleAcceptAll()}
                type="button"
              >
                {!this.isShownSettings
                  ? this.btnLabelAcceptAndContinue
                  : this.btnLabelSelectAllAndContinue}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
