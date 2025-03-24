"use client";

import type { PropsWithChildren } from "react";
import { CookiesProvider as Provider, Cookies } from "react-cookie";

type Props = PropsWithChildren<{
  cookies: string;
}>;

export function CookiesProvider({ cookies, children }: Props) {
  return <Provider cookies={new Cookies(cookies)}>{children}</Provider>;
}
