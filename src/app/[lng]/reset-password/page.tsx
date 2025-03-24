"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { type SearchParams, type Params, getSearchParam } from "@/types";
import { translate } from "@/i18n";
import { resetTokenFieldName } from "@/gel/shared";

import { resetPassword } from "./action";
import { ResetPasswordForm } from "./form";

type ResetPasswordSearchParams = SearchParams<typeof resetTokenFieldName>;

export default async function ResetPassword({
  params,
  searchParams,
}: Params & ResetPasswordSearchParams) {
  const { lng } = await params;
  const { reset_token = "" } = getSearchParam(
    await searchParams,
    resetTokenFieldName,
  );
  const { t } = await translate("auth", lng);

  return (
    <Action action={resetPassword} initialData="">
      <PageHeader>{t("resetPassword.title")}</PageHeader>
      <ResetPasswordForm reset_token={reset_token} />
    </Action>
  );
}
