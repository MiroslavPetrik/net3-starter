"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { translate } from "@/i18n";
import { type Params } from "@/types";

import { signIn } from "./action";
import { SignInForm } from "./form";

export default async function SignIn({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <Action action={signIn} initialData="">
      <PageHeader>{t("signIn.title")}</PageHeader>
      <SignInForm />
    </Action>
  );
}
