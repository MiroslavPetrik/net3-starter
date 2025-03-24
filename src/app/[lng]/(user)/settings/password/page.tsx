import { redirect } from "next/navigation";
import { translate } from "@/i18n";
import { Action } from "react-form-action/client";
import { type Params } from "@/types";
import { api } from "@/trpc/server";
import { PageHeader } from "@/app/_components/page-header";

import { sendPasswordResetEmail } from "./action";
import { PasswordResetEmailForm } from "./form";

export default async function Page({ params }: Params) {
  const { lng } = await params;
  const user = await api.user.getCurrentUser();

  if (!user?.email) {
    redirect("/");
  }

  const { t } = await translate("settings", lng);

  const sendCurrentUserPasswordResetEmail = sendPasswordResetEmail.bind(
    null,
    user.email.address,
  );

  return (
    <Action action={sendCurrentUserPasswordResetEmail} initialData={undefined}>
      <PageHeader>{t("password.title")}</PageHeader>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        {t("password.message", { email: user.email.address })}
      </p>
      <PasswordResetEmailForm />
    </Action>
  );
}
