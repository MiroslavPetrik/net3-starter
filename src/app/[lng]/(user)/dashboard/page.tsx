import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { useTranslation } from "@/i18n";
import { api } from "@/trpc/server";

export default async function Dashboard({ params: { lng } }: Params) {
  const user = await api.user.getCurrent.query();

  if (!user) {
    redirect("/onboarding");
  }

  const { t } = await useTranslation("dashboard", lng);

  return (
    <div className="pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {t("welcome", { name: user.name })}
      </h1>
    </div>
  );
}
