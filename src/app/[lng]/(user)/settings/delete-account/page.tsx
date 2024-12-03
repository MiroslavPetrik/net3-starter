"use server";

import { PageHeader } from "@/app/_components/page-header";
import { DeleteUserForm } from "./_components/form";
import { type Params } from "@/types";
import { translate } from "@/i18n";

export default async function DeleteAccount({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("settings", lng);

  return (
    <>
      <PageHeader>{t("deleteAccount.title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {t("deleteAccount.warningMessage")}
      </p>
      <DeleteUserForm />
    </>
  );
}
