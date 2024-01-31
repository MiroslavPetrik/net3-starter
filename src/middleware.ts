import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@/i18n/options";
import type { NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|assets|favicon.ico|sw.js).*)",
  ],
};

export function middleware(req: NextRequest) {
  const cookiesList = cookies();
  let lng;
  if (cookiesList.has(cookieName))
    lng = acceptLanguage.get(cookiesList.get(cookieName)?.value);
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
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
