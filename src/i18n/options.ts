import { type InitOptions } from "i18next";
import { type Languages } from "./types";

export const fallbackLng = "en";
export const languages = [fallbackLng, "sk"] as const; // add your locales (e.g. "de", "sk") into the list
export const i18nCookieName = "i18next" as const;

// For each lang in languages, import your zod mapping
import enZod from "zod-i18n-map/locales/en/zod.json";
import skZod from "zod-i18n-map/locales/sk/zod.json";
import { zodErrorNameSpace } from "./zodError";

const resources: Record<Languages, { zod: Record<string, unknown> }> = {
  en: { zod: enZod },
  sk: { zod: skZod },
};

export function getOptions(ns: string, lng = fallbackLng) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    defaultNS: false,
    ns: [ns, zodErrorNameSpace],
    partialBundledLanguages: true,
    resources,
  } satisfies InitOptions;
}
