import { parseCookies, CookieMap } from "./parseCookies";

const mockDocumentCookie = (cookieString: string) =>
  Object.defineProperty(window.document, "cookie", {
    writable: true,
    value: cookieString,
  });

describe("parseCookies", () => {
  it("should work with one cookie", () => {
    const cookieStringSingle = "first=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
    };

    mockDocumentCookie(cookieStringSingle);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should work with multiple cookies", () => {
    const cookieStringSingle = "first=someValue;second=someValue;third=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
      third: "someValue",
    };

    mockDocumentCookie(cookieStringSingle);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim leading spaces", () => {
    const cookieStringWithLeadingSpaces = "first=someValue; second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringWithLeadingSpaces);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim trailing spaces", () => {
    const cookieStringWithTrailingSpaces = "first=someValue ;second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringWithTrailingSpaces);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim leading and trailing spaces", () => {
    const cookieStringLeadingAndTrailingSpaces =
      " first=someValue ;second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringLeadingAndTrailingSpaces);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim leading tabs", () => {
    const cookieStringWithLeadingTabs = "\tfirst=someValue;second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringWithLeadingTabs);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim trailing tabs", () => {
    const cookieStringWithTrailingTabs = "first=someValue\t;second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringWithTrailingTabs);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });

  it("should trim leading and trailing tabs", () => {
    const cookieStringLeadingAndTrailingTabs = "\tfirst=someValue\t;second=someValue";
    const expectedParsed: CookieMap = {
      first: "someValue",
      second: "someValue",
    };

    mockDocumentCookie(cookieStringLeadingAndTrailingTabs);

    expect(parseCookies()).toMatchObject(expectedParsed);
  });
});
