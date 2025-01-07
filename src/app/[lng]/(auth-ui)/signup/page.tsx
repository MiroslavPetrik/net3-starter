"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { translate } from "@/i18n";
import { type Params } from "@/types";

import { signUp } from "./action";
import { SignUpForm } from "./form";

export default async function SignUp({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <Action action={signUp} initialData="">
      <PageHeader>{t("signUp.title")}</PageHeader>
      <SignUpForm />
    </Action>
  );
}
