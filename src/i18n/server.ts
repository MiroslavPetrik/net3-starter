import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./options";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(ns, lng));
  return i18nInstance;
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
