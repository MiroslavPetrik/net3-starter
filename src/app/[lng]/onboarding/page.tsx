import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { api } from "@/trpc/server";

import { CreateUserForm } from "./_components/form";

export default async function Onboarding({ params }: Params) {
  const { lng } = await params;
  const user = await api.user.getCurrent.query();

  if (user) {
    redirect("/");
  }

  const { t } = await translate("onboarding", lng);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-extrabold tracking-tight">
        {t("title")}
      </h1>
      <h2 className="mb-6 text-xl">{t("subtitle")}</h2>
      <div className="w-full max-w-xs">
        <CreateUserForm />
      </div>
    </main>
  );
}
