"use server";
import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordForm } from "./_components/form";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";
import { type ResetTokenParam } from "@/edgedb/resetToken";

export default async function ResetPassword({
  params: { lng },
  searchParams: { reset_token },
}: Params & { searchParams: ResetTokenParam }) {
  const { t } = await useTranslation("auth", lng);

  return (
    <>
      <PageHeader>{t("resetPassword.title")}</PageHeader>
      <ResetPasswordForm reset_token={reset_token} />
    </>
  );
}
