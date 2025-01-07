"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { type ResetTokenParam } from "@/edgedb/shared";

import { resetPassword } from "./action";
import { ResetPasswordForm } from "./form";

export default async function ResetPassword({
  params,
  searchParams,
}: Params & { searchParams: Promise<ResetTokenParam> }) {
  const { lng } = await params;
  const { reset_token } = await searchParams;
  const { t } = await translate("auth", lng);

  return (
    <Action action={resetPassword} initialData="">
      <PageHeader>{t("resetPassword.title")}</PageHeader>
      <ResetPasswordForm reset_token={reset_token} />
    </Action>
  );
}
