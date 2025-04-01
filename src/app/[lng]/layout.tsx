import "@/styles/globals.css";

import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";

import { TRPCReactProvider } from "@/trpc/react";
import type { Params } from "@/types";
import { Language } from "@/i18n/client";
import { font } from "@/styles/font";
import { CookiesProvider } from "../_components/cookies-provider";

export const metadata = {
  title: "GNT Starter App",
  description:
    "GNT stands for Gel + Next.js + T3 (Tailwind + TypeScript + tRPC)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params,
}: PropsWithChildren<Params>) {
  const { lng } = await params;
  const cookie = (await cookies()).toString();

  return (
    <html lang={lng}>
      <body className={`font-sans ${font.variable} flex min-h-screen flex-col`}>
        <CookiesProvider cookies={cookie}>
          <Language lng={lng}>
            <TRPCReactProvider cookies={cookie}>{children}</TRPCReactProvider>
          </Language>
        </CookiesProvider>
      </body>
    </html>
  );
}
