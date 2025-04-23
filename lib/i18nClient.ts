// lib/i18n-client.ts
import Cookies from "js-cookie";
export function getClientLanguage(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || "en";
  }
  return "en";
}

export function setClientLanguage(lang: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang);
    //document.cookie = `language=${lang}; path=/`;
    Cookies.set("language", lang, { path: "/" });
  }
}
