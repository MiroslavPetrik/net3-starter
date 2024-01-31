"use server";
import { PageHeader } from "@/app/_components/page-header";
import { ResetPasswordForm } from "./_components/form";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";

export default async function ResetPassword({ params: { lng } }: Params) {
  const { t } = await useTranslation("auth", lng);

  return (
    <>
      <PageHeader>{t("resetPassword.title")}</PageHeader>
      <ResetPasswordForm />
    </>
  );
}
