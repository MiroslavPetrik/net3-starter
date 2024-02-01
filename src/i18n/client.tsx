"use client";

import { type PropsWithChildren, useEffect } from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, i18nCookieName } from "./options";
import type { Languages, LanguageParam } from "./types";
import { usePathname } from "next/navigation";

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
  .init({
    ...getOptions("global"),
    lng: undefined, // detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function Language({ lng, children }: PropsWithChildren<LanguageParam>) {
  const [cookies, setCookie] = useCookies([i18nCookieName]);
  const { i18n } = useTranslation();

  const cookie = cookies[i18nCookieName] as string;

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
      setCookie(i18nCookieName, lng, { path: "/" });
    }, [lng, cookie, setCookie]);
  }

  return <>{children}</>;
}

export function useLngPathname(lng: Languages) {
  const pathname = usePathname();

  const prefix = `/${lng}/`;

  return pathname.startsWith(prefix)
    ? pathname.slice(prefix.length - 1)
    : pathname;
}
