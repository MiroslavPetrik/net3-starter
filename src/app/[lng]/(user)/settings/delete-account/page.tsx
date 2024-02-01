"use server";

import { PageHeader } from "@/app/_components/page-header";
import { DeleteUser } from "./_components/delete-user";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";

export default async function DeleteAccount({ params: { lng } }: Params) {
  const { t } = await useTranslation("settings", lng);

  return (
    <>
      <PageHeader>{t("deleteAccount.title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {t("deleteAccount.warningMessage")}
      </p>
      <DeleteUser />
    </>
  );
}
