import { redirect } from "next/navigation";
import { type Params } from "@/types";
import { translate } from "@/i18n";
import { api } from "@/trpc/server";

export default async function Dashboard({ params }: Params) {
  const user = await api.user.getCurrent.query();

  if (!user) {
    redirect("/onboarding");
  }
  const { lng } = await params;
  const { t } = await translate("dashboard", lng);

  return (
    <div className="pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight">
        {t("welcome", { name: user.name })}
      </h1>
    </div>
  );
}
