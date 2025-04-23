// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import { getOptions } from "./i18nConfig"; // فایل جدید برای تنظیمات

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    ...getOptions(),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
