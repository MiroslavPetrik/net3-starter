import { Action } from "react-form-action/client";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { translate } from "@/i18n";

import { PageHeader } from "@/app/_components/page-header";
import { UpdateUserForm } from "./form";
import { updateUser } from "./action";

export default async function Profile({ params }: Params) {
  const user = await api.user.getCurrent.query();
  if (!user) {
    redirect("/");
  }
  const { lng } = await params;
  const { t } = await translate("settings", lng);

  return (
    <>
      <PageHeader>{t("editProfile.title")}</PageHeader>
      <div className="w-full max-w-xs">
        <Action action={updateUser} initialData="">
          <UpdateUserForm user={user} />
        </Action>
      </div>
    </>
  );
}
