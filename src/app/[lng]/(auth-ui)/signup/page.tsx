"use server";

import { PageHeader } from "@/app/_components/page-header";
import { SignUpForm } from "./_components/form";
import { useTranslation } from "@/i18n";
import { type Params } from "@/types";

export default async function SignUp({ params: { lng } }: Params) {
  const { t } = await useTranslation("auth", lng);

  return (
    <>
      <PageHeader>{t("signUp.title")}</PageHeader>
      <SignUpForm />
    </>
  );
}
