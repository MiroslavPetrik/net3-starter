import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, i18nCookieName, fallbackLng } from "./options";
import { cookies } from "next/headers";
import { type Languages } from "./types";

const initI18next = async (lng: string, ns: string) => {
  const i18n = createInstance();

  await i18n
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(ns, lng));

  return i18n;
};

export async function useTranslation(
  ns: string,
  lng: string,
  options: { keyPrefix?: string } = {},
) {
  const i18n = await initI18next(lng, ns);

  return {
    t: i18n.getFixedT(lng, ns, options.keyPrefix),
    i18n,
  };
}

export const getLngCookie = () =>
  (cookies().get(i18nCookieName)?.value ?? fallbackLng) as Languages;
