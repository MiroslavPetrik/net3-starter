import type { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";
import { SignOutButton } from "./_components/sign-out-button";
import { type Params } from "@/types";
import { redirect } from "next/navigation";
import { auth } from "@/edgedb";
import { selectCurrentUser } from "@/edgedb/user";

export default async function Layout({ children }: PropsWithChildren<Params>) {
  const session = auth.getSession();
  const loggedIn = await session.isLoggedIn();

  if (!loggedIn) {
    redirect("/");
  }

  const user = await selectCurrentUser();

  if (!user) {
    redirect("/onboarding");
  }

  return (
    <>
      <Navbar user={user} signOutButton={<SignOutButton />} />
      <main className="container mx-auto flex flex-1 ">{children}</main>
    </>
  );
}
