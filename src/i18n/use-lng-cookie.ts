"use client";

import { useCookies } from "react-cookie";
import { useCallback } from "react";
import type { Languages } from "./types";
import { i18nCookieName } from "./options";

type i18nCookies = {
  [i18nCookieName]?: string;
};

export function useLngCookie() {
  const [cookies, setCookie] = useCookies<typeof i18nCookieName, i18nCookies>([
    i18nCookieName,
  ]);

  const i18nCookie = cookies[i18nCookieName];

  const setLngCookie = useCallback(
    (lng: Languages) => {
      setCookie(i18nCookieName, lng, { path: "/" });
    },
    [setCookie],
  );

  return [i18nCookie, setLngCookie] as const;
}
