// lib/serverTranslation.ts
import Cookies from "js-cookie";
import { createInstance } from "i18next";
import Backend from "i18next-fs-backend";
import { getOptions } from "./i18nConfig";
import path from "path";

export async function getServerTranslation(ns = "common") {
  // خواندن زبان از کوکی با استفاده از cookie-js
  const lang = Cookies.get("language") || "en"; // در صورت نبودن کوکی، انگلیسی پیش‌فرض میشه

  const i18nInstance = createInstance();
  await i18nInstance.use(Backend).init({
    ...getOptions(lang, ns),
    backend: {
      loadPath: path.resolve(
        "./public/locales/{{lng}}/{{ns}}.json"
      ),
    },
  });

  return {
    t: i18nInstance.t,
    i18n: i18nInstance,
  };
}
