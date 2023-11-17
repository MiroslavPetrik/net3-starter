"use server";
import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordEmailForm } from "./_components/form";

export default async function ResetPassword() {
  return (
    <>
      <PageHeader>Reset Password</PageHeader>
      <ResetPasswordEmailForm />
    </>
  );
}
