"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { SignUpForm } from "./_components/form";
import { translate } from "@/i18n";
import { type Params } from "@/types";
import { signUp } from "@/app/actions/auth";

export default async function SignUp({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <>
      <PageHeader>{t("signUp.title")}</PageHeader>
      <Action action={signUp} initialData="">
        <SignUpForm />
      </Action>
    </>
  );
}
