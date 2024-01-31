"use server";

import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordEmailForm } from "./_components/form";
import { useTranslation } from "@/i18n";
import { type Params } from "@/types";

export default async function ResetPassword({ params: { lng } }: Params) {
  const { t } = await useTranslation("auth", lng);

  return (
    <>
      <PageHeader>{t("resetPasswordEmail.title")}</PageHeader>
      <ResetPasswordEmailForm />
    </>
  );
}
