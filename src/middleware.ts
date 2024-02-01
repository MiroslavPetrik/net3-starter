import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, i18nCookieName } from "@/i18n/options";
import type { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { getLngCookie } from "./i18n";

acceptLanguage.languages([...languages]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|assets|favicon.ico|sw.js).*)",
  ],
};

export function middleware(req: NextRequest) {
  const cookiesList = cookies();
  let lng;
  if (cookiesList.has(i18nCookieName)) lng = acceptLanguage.get(getLngCookie());
  if (!lng) lng = acceptLanguage.get(headers().get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some(
      (loc) =>
        req.nextUrl.pathname.startsWith(`/${loc}/`) ||
        req.nextUrl.pathname === `/${loc}`,
    ) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(headers().get("referer")!);
    const lngInReferer = languages.find((locale) =>
      refererUrl.pathname.startsWith(`/${locale}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(i18nCookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
