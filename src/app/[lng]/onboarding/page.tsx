import { CreateUser } from "./_components/create-user";

import { redirect } from "next/navigation";
import { selectCurrentUser } from "@/edgedb/user";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";

export default async function Onboarding({ params: { lng } }: Params) {
  const user = await selectCurrentUser();
  const { t } = await useTranslation("onboarding", lng);

  if (user) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className="mb-4 text-6xl font-extrabold tracking-tight">
        {t("title")}
      </h1>
      <h2 className="mb-6 text-xl">{t("subtitle")}</h2>
      <div className="w-full max-w-xs">
        <CreateUser />
      </div>
    </main>
  );
}
