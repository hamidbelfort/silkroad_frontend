// lib/LanguageManager.ts
import Cookies from "js-cookie";

export class LanguageManager {
  private static cookieKey = "language";

  /**
   * تنظیم زبان کاربر (در کوکی و localStorage)
   * @param lang مثل "en" یا "zh"
   */
  static set(lang: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cookieKey, lang);
    }
    Cookies.set(this.cookieKey, lang, {
      path: "/",
      expires: 7,
    });
  }

  /**
   * گرفتن زبان فعلی کاربر
   * اولویت: localStorage → کوکی → "en"
   */
  static get(): string {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem(this.cookieKey) ||
        Cookies.get(this.cookieKey) ||
        "en"
      );
    }
    return Cookies.get(this.cookieKey) || "en";
  }
}
