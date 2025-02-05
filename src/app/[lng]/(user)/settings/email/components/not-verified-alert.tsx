import { translate, type LanguageParam } from "@/i18n";
import { Alert } from "flowbite-react/components/Alert";
import { Trans } from "react-i18next/TransWithoutContext";

export async function NotVerifiedAlert({ lng }: LanguageParam) {
  const { t } = await translate("settings", lng);

  return (
    <Alert rounded color="warning">
      <Trans i18nKey="email.pleaseVerifyEmail" t={t}>
        <span className="font-medium">Email is not verified!</span> Please
        verify your email address, so you can access your account in case you
        forget your password.
      </Trans>
    </Alert>
  );
}
