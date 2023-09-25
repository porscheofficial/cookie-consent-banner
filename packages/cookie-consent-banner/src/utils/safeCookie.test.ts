import { stringifyCookie } from "./safeCookie";

describe("stringifyCookie", () => {
  it("should return a string with the correct name and value", () => {
    const name = "test";
    const value = "123";
    const result = stringifyCookie(name, value);
    expect(result).toContain(
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    );
  });

  it("should handle special characters in the value", () => {
    const name = "test";
    const value = "abc%def";
    const result = stringifyCookie(name, value);
    expect(result).toContain(
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    );
  });

  it("should include the expires attribute if provided as a number (number of days)", () => {
    const MILLISECONDS_IN_DAY = 86400000;
    const name = "test";
    const value = "123";
    const expires = 1;
    const result = stringifyCookie(name, value, { expires });
    const expectedDate = new Date(
      Date.now() + expires * MILLISECONDS_IN_DAY,
    ).toUTCString();
    expect(result).toContain(`expires=${expectedDate}`);
  });

  it("should include the expires attribute if provided as a Date object", () => {
    const name = "test";
    const value = "123";
    const expires = new Date("2024-01-01");
    const result = stringifyCookie(name, value, { expires });
    expect(result).toContain(`expires=${expires.toUTCString()}`);
  });

  it("should include other attributes if provided", () => {
    const name = "test";
    const value = "123";
    const path = "/test";
    const domain = "example.com";
    const secure = true;
    const sameSite = "strict";
    const result = stringifyCookie(name, value, {
      path,
      domain,
      secure,
      sameSite,
    });
    expect(result).toContain(`path=${path}`);
    expect(result).toContain(`domain=${domain}`);
    expect(result).toContain("secure");
    expect(result).toContain(`sameSite=${sameSite}`);
  });
});
