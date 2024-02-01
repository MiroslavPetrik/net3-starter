import { selectCurrentUser } from "@/edgedb/user";
import { useTranslation } from "@/i18n";
import { type Params } from "@/types";
import { redirect } from "next/navigation";

export default async function Dashboard({ params: { lng } }: Params) {
  const user = await selectCurrentUser();

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
