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

  const pathnameHasLocale = languages.some(
    (loc) =>
      req.nextUrl.pathname.startsWith(`/${loc}/`) ||
      req.nextUrl.pathname === `/${loc}`,
  );

  // Redirect if lng in path is not supported
  if (!pathnameHasLocale && !req.nextUrl.pathname.startsWith("/_next")) {
    // the URL, does not keep searchParams from the url passed as second argument
    const searchParams = req.nextUrl.searchParams.toString();

    const url =
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url).toString() +
      (searchParams.length ? `?${searchParams}` : "");

    return NextResponse.redirect(url);
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
