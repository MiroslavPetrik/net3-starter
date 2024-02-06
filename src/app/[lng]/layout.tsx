import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";

import { TRPCReactProvider } from "@/trpc/react";
import type { Params } from "@/types";
import { Language } from "@/i18n/client";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "NET3 App",
  description:
    "NET3 stands for Next.js + EdgeDB + T3 (Tailwind + TypeScript + tRPC)",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { lng },
}: PropsWithChildren<Params>) {
  return (
    <html lang={lng}>
      <body
        className={`font-sans ${inter.variable} flex min-h-screen flex-col`}
      >
        <Language lng={lng}>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </Language>
      </body>
    </html>
  );
}
