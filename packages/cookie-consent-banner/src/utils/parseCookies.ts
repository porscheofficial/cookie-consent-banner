export type CookieMap = Record<string, string | undefined>;

export const parseCookies = (): CookieMap =>
  document.cookie.split(";").reduce<CookieMap>((acc, curr) => {
    const [key, value] = curr.split("=");

    // key and value may be surrounded by whitespace (space and tab characters)
    const cookieKey = key.trim();
    const cookieValue = value.trim();
    return { ...acc, [cookieKey]: cookieValue };
  }, {});

export const getCookie = (cookieName: string): string | undefined =>
  parseCookies()[cookieName];
