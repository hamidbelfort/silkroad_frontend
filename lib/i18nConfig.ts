// lib/i18nConfig.ts
export const fallbackLng = "en";
export const languages = ["en", "zh"];
export const defaultNS = "common";

export function getOptions(
  lng = fallbackLng,
  ns = defaultNS
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    ns,
    defaultNS,
    backend: {
      loadPath: `/locales/${lng}/${ns}.json`,
    },
  };
}
