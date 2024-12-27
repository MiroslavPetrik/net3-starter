"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { SignInForm } from "./_components/form";
import { translate } from "@/i18n";
import { type Params } from "@/types";
import { signIn } from "@/app/actions/auth";

export default async function SignIn({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <>
      <PageHeader>{t("signIn.title")}</PageHeader>
      <Action action={signIn} initialData="">
        <SignInForm />
      </Action>
    </>
  );
}
