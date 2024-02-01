import { type InitOptions } from "i18next";

export const fallbackLng = "en";
export const languages = [fallbackLng] as const; // add your locales (e.g. "de", "sk") into the list
export const i18nCookieName = "i18next" as const;

export function getOptions(ns: string, lng = fallbackLng) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    defaultNS: false,
    ns,
  } satisfies InitOptions;
}
