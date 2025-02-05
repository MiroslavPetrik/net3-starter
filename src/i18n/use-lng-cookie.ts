"use client";

import { useCookies } from "react-cookie";
import { useCallback } from "react";
import type { Languages } from "./types";
import { i18nCookieName } from "./options";

export function useLngCookie() {
  const [cookies, setCookie] = useCookies([i18nCookieName]);

  const cookie = cookies[i18nCookieName] as string | undefined;

  const setLngCookie = useCallback(
    (lng: Languages) => {
      setCookie(i18nCookieName, lng, { path: "/" });
    },
    [setCookie],
  );

  return [cookie, setLngCookie] as const;
}
