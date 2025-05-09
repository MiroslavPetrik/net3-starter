import Link from "next/link";

import { authorizedSession } from "@/gel";
import { redirect } from "next/navigation";
import { translate } from "@/i18n";
import { type Params } from "@/types";

import { LanguageSwitcher } from "../_components/language-switcher";

export default async function Home({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("global", lng);

  if (await authorizedSession()) {
    redirect("/dashboard");
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-green-400 to-cyan-600 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span>GNT</span> Starter
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20"
              href="/signin"
            >
              <h3 className="text-2xl font-bold">{t("signIn")}</h3>
            </Link>
            <Link
              className="rounded-xl bg-white/10 p-4 text-center hover:bg-white/20"
              href="/signup"
            >
              <h3 className="text-2xl font-bold">{t("signUp")}</h3>
            </Link>
          </div>
        </div>
        <LanguageSwitcher lng={lng} />
      </main>
    </>
  );
}
