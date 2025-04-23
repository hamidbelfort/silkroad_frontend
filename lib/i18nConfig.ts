// lib/i18nConfig.ts
export const fallbackLng = "en";
export const languages = ["en", "zh"];
export const defaultNS = "common";

export function getOptions(
  lng = fallbackLng,
  ns = ["common"]
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    ns,
    defaultNS,
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: `/locales/${lng}/${ns}.json`,
    },
  };
}
