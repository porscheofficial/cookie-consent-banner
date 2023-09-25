import type { CookieAttributes } from "../components/cookie-consent-banner/types";

const isDefined = <T>(argument: T | undefined): argument is T =>
  argument !== undefined;

export const stringifyCookie = (
  name: string,
  value: string,
  attributes?: CookieAttributes,
): string => {
  const cookieAttributes: CookieAttributes = attributes ?? {};
  const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  ).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)}`;

  const attributesString = Object.entries(cookieAttributes)
    .filter(isDefined)
    .map(([attributeKey, attributeValue]) => {
      if (attributeKey === "expires") {
        if (typeof attributeValue === "number") {
          const MILLISECONDS_IN_DAY = 86400000;
          const expiresAsDate = new Date(
            Date.now() + attributeValue * MILLISECONDS_IN_DAY,
          );
          return `${attributeKey}=${expiresAsDate.toUTCString()}`;
        }
        return `${attributeKey}=${(attributeValue as Date).toUTCString()}`;
      }
      if (attributeKey === "secure") {
        return attributeKey;
      }

      return `${attributeKey}=${attributeValue as string | number}`;
    })
    .join("; ");

  return `${cookieString}; ${attributesString}`;
};

export const defaultCookieAttributes: CookieAttributes = {
  path: "/",
  expires: 7,
  domain: document.location.hostname,
};

export const safeCookie = (
  ...attrs: Parameters<typeof stringifyCookie>
): void => {
  const [name, value, attributes] = attrs;
  document.cookie = stringifyCookie(name, value, {
    ...defaultCookieAttributes,
    ...attributes,
  });
};
