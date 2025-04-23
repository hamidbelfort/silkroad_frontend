// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
//import { getOptions } from "./i18nConfig"; // فایل جدید برای تنظیمات

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "zh"],
    defaultNS: "common",
    ns: ["common"],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: [
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
      ],
      caches: ["cookie"],
    },
  });

export default i18n;
