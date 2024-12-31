"use server";
import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { type ResetTokenParam } from "@/edgedb/shared";
import { resetPassword } from "@/app/actions/auth";
import { ResetPasswordForm } from "./form";

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
      <Action action={resetPassword} initialData="">
        <ResetPasswordForm reset_token={reset_token} />
      </Action>
    </>
  );
}
