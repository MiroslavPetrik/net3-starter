"use client";

import { type PropsWithChildren, useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages } from "./options";
import { useLngCookie } from "./use-lng-cookie";
import type { LanguageParam } from "./types";
import { setZodErrorMap } from "./zodError";

const runsOnServerSide = typeof window === "undefined";

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./${language}/${namespace}.json`),
    ),
  )
  .init(
    {
      ...getOptions("global"),
      lng: undefined, // detect the language on client side
      detection: {
        order: ["path", "htmlTag", "cookie", "navigator"],
      },
      preload: runsOnServerSide ? languages : [],
    },
    (_err, t) => {
      setZodErrorMap({ t });
    },
  );

export function Language({ lng, children }: PropsWithChildren<LanguageParam>) {
  const [cookie, setLngCookie] = useLngCookie();
  const { i18n } = useTranslation();

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    void i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      void i18n.changeLanguage(lng);
    }, [lng, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookie === lng) return;
      setLngCookie(lng);
    }, [lng, cookie, setLngCookie]);
  }

  return <>{children}</>;
}
