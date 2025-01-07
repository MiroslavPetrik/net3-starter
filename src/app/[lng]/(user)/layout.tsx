import type { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { authorizedSession } from "@/edgedb";
import { translate } from "@/i18n";
import { api } from "@/trpc/server";

import { Navbar } from "./_components/navbar";
import { SignOutButton } from "./_components/sign-out-button";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<Params>) {
  if (!(await authorizedSession())) {
    redirect("/");
  }

  const user = await api.user.getCurrent.query();

  if (!user) {
    redirect("/onboarding");
  }

  const { lng } = await params;
  const { t } = await translate("global", lng);

  return (
    <>
      <Navbar
        lng={lng}
        user={user}
        signOutButton={<SignOutButton>{t("signOut")}</SignOutButton>}
      />
      <main className="container mx-auto flex flex-1">{children}</main>
    </>
  );
}
