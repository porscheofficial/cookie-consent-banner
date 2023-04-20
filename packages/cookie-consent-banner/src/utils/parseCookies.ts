export const parseCookies = () =>
  document.cookie
    .split(";")
    .reduce<Record<string, string | undefined>>((acc, curr) => {
      const [key, value] = curr.split("=");

      // key and value may be surrounded by whitespace (space and tab characters)
      const cookieKey = key.trim();
      const cookieValue= value.trim();
      return { ...acc, [cookieKey]: cookieValue };
    }, {});

export const getCookie = (cookieName: string) => parseCookies()[cookieName];
