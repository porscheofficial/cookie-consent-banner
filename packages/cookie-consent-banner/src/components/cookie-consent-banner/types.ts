export interface CategoryItem {
  label: string;
  key: string;
  isMandatory?: boolean;
  description: string;
}

export interface CookieAttributes {
  /** either number of days from now or a Date object */
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}
