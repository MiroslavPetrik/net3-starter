import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { auth } from "@/edgedb";
import { useTranslation } from "@/i18n";
import { api } from "@/trpc/server";

import { Navbar } from "./_components/navbar";
import { SignOutButton } from "./_components/sign-out-button";

export default async function Layout({
  children,
  params: { lng },
}: PropsWithChildren<Params>) {
  const session = auth.getSession();
  const isSignedIn = await session.isSignedIn();

  if (!isSignedIn) {
    redirect("/");
  }

  const user = await api.user.getCurrent.query();

  if (!user) {
    redirect("/onboarding");
  }

  const { t } = await useTranslation("global", lng);

  return (
    <>
      <Navbar
        lng={lng}
        user={user}
        signOutButton={<SignOutButton>{t("signOut")}</SignOutButton>}
      />
      <main className="container mx-auto flex flex-1 ">{children}</main>
    </>
  );
}
