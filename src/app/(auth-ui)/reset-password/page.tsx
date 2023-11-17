"use server";
import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordForm } from "./_components/form";

export default async function ResetPassword() {
  return (
    <>
      <PageHeader>Set New Password</PageHeader>
      <ResetPasswordForm />
    </>
  );
}
