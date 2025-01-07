"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { translate } from "@/i18n";
import { type Params } from "@/types";
import { resetPasswordEmail } from "./action";
import { ResetPasswordEmailForm } from "./form";

export default async function ResetPasswordEmail({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <>
      <PageHeader>{t("resetPasswordEmail.title")}</PageHeader>
      <Action action={resetPasswordEmail} initialData="">
        <ResetPasswordEmailForm />
      </Action>
    </>
  );
}
