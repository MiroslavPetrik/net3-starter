import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/edgedb/edge";

export async function middleware(request: NextRequest) {
  const session = auth.getSession();
  const loggedIn = await session.isLoggedIn();

  if (!loggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/onboarding", "/dashboard", "/profile/:path*"],
};
