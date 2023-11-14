"use server";
import { PageHeader } from "@/app/_components/page-header";
import { SignInForm } from "./_components/signin-form";

export default async function SignIn() {
  return (
    <>
      <PageHeader>Sign In</PageHeader>
      <SignInForm />
    </>
  );
}
