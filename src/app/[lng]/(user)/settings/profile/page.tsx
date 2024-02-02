import { PageHeader } from "@/app/_components/page-header";
import { UpdateUser } from "./_components/update-user";

import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";

export default async function Profile({ params: { lng } }: Params) {
  const user = await api.user.getCurrent.query();
  if (!user) {
    redirect("/");
  }
  const { t } = await useTranslation("settings", lng);

  return (
    <>
      <PageHeader>{t("editProfile.title")}</PageHeader>
      <div className="w-full max-w-xs">
        <UpdateUser user={user} />
      </div>
    </>
  );
}
