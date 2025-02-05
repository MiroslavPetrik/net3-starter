"use client";

import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages } from "@/i18n/options";
import type { Languages, LanguageParam } from "@/i18n/types";
import { castString } from "@/i18n/castString";
import { Dropdown } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useLngPathname } from "@/i18n/use-lng-pathname";

const flagMap: Record<Languages, string> = {
  sk: "🇸🇰",
  en: "🇺🇸",
};

export function LanguageSwitcher({ lng }: LanguageParam) {
  const { t } = useTranslation("global");
  const pathname = useLngPathname(lng);

  return (
    <Dropdown
      renderTrigger={() => (
        <div>
          <Trans i18nKey="languageSwitcher" t={t}>
            Language:
            <strong>
              {castString({ lng: `${flagMap[lng]} ${lng.toUpperCase()}` })}
            </strong>
          </Trans>
        </div>
      )}
    >
      {languages.map((lang) => (
        <Dropdown.Item key={lang} as={Link} href={`/${lang}${pathname}`}>
          {flagMap[lang]} {lang.toUpperCase()}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
