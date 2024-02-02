import { useTranslation, type LanguageParam } from "@/i18n";
import { Alert } from "flowbite-react";
import { Trans } from "react-i18next/TransWithoutContext";

export async function VerifiedAlert({ lng }: LanguageParam) {
  const { t } = await useTranslation("settings", lng);

  return (
    <Alert color="success" rounded>
      <Trans i18nKey="email.alreadyVerified" t={t}>
        <span className="font-medium">Your email is verified.</span> You can
        safely request a password reset email in case you need it.
      </Trans>
    </Alert>
  );
}
