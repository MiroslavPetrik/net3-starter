"use server";
import { PageHeader } from "@/app/_components/page-header";
import { SignUpForm } from "./_components/form";

export default async function SignUp() {
  return (
    <>
      <PageHeader>Sign Up</PageHeader>
      <SignUpForm />
    </>
  );
}
