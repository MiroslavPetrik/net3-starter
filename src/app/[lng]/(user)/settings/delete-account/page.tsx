"use server";

import { Action } from "react-form-action/client";
import { PageHeader } from "@/app/_components/page-header";
import { type Params } from "@/types";
import { translate } from "@/i18n";

import { deleteUser } from "./action";
import { DeleteUserForm } from "./form";

export default async function DeleteAccount({ params }: Params) {
  const { lng } = await params;
  const { t } = await translate("settings", lng);

  return (
    <Action action={deleteUser} initialData="">
      <PageHeader>{t("deleteAccount.title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {t("deleteAccount.warningMessage")}
      </p>
      <DeleteUserForm />
    </Action>
  );
}
