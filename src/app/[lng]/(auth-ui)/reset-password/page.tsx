"use server";
import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordForm } from "./_components/form";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { type ResetTokenParam } from "@/edgedb/shared";

export default async function ResetPassword({
  params,
  searchParams,
}: Params & { searchParams: Promise<ResetTokenParam> }) {
  const { lng } = await params;
  const { reset_token } = await searchParams;
  const { t } = await translate("auth", lng);

  return (
    <>
      <PageHeader>{t("resetPassword.title")}</PageHeader>
      <ResetPasswordForm reset_token={reset_token} />
    </>
  );
}
