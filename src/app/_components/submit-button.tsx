"use client";

import { useFormStatus } from "react-dom";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation("global");

  return (
    <Button type="submit" isProcessing={pending} disabled={pending}>
      {pending ? t("submitting") : t("submit")}
    </Button>
  );
}
