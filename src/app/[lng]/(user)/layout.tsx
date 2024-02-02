import type { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";
import { SignOutButton } from "./_components/sign-out-button";
import { type Params } from "@/types";
import { redirect } from "next/navigation";
import { auth } from "@/edgedb";
import { selectCurrentUser } from "@/edgedb/user";
import { useTranslation } from "@/i18n";

export default async function Layout({
  children,
  params: { lng },
}: PropsWithChildren<Params>) {
  const session = auth.getSession();
  const isSignedIn = await session.isSignedIn();

  if (!isSignedIn) {
    redirect("/");
  }

  const user = await selectCurrentUser();

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
