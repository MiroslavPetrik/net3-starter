"use server";

import { PageHeader } from "@/app/_components/page-header";
import { SignUpForm } from "./_components/form";
import { translate } from "@/i18n";
import { type Params } from "@/types";

export default async function SignUp({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("auth", lng);

  return (
    <>
      <PageHeader>{t("signUp.title")}</PageHeader>
      <SignUpForm />
    </>
  );
}
