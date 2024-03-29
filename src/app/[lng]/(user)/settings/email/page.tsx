"use server";

import { PageHeader } from "@/app/_components/page-header";
import { EmailForm } from "./_components/form";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { VerifiedAlert } from "./_components/verified-alert";
import { Stack } from "@/app/_components";

export default async function Page({ params: { lng } }: Params) {
  const user = await api.user.getCurrent.query();
  if (!user) {
    redirect("/");
  }
  const { t } = await useTranslation("settings", lng);

  return (
    <>
      <PageHeader>{t("email.title")}</PageHeader>
      <Stack>
        {user.email?.verifiedAt && <VerifiedAlert lng={lng} />}
        <EmailForm email={user.email!} />
      </Stack>
    </>
  );
}
