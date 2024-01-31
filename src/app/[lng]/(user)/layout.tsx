import type { PropsWithChildren } from "react";
import { Navbar } from "./_components/navbar";
import { withUser } from "@/guards/withUser";
import { SignOutButton } from "./_components/sign-out-button";

export default withUser<PropsWithChildren>(function Layout({ user, children }) {
  return (
    <>
      <Navbar user={user} signOutButton={<SignOutButton />} />
      <main className="container mx-auto flex flex-1 ">{children}</main>
    </>
  );
});
