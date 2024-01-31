import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/i18n/options";
import { type LanguageParam, useTranslation, castString } from "@/i18n/";

export const Footer = async ({ lng }: LanguageParam) => {
  const { t } = await useTranslation("global", lng);

  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{castString({ lng })}</strong> to:{" "}
      </Trans>
      {languages
        .filter((lang) => lng !== lang)
        .map((lang, index) => {
          return (
            <span key={lang}>
              {index > 0 && " or "}
              <Link href={`/${lang}`}>{lang}</Link>
            </span>
          );
        })}
    </footer>
  );
};
