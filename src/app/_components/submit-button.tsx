"use client";

import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "flowbite-react";
import { useTranslation } from "react-i18next";

export function SubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  const { t } = useTranslation("global");

  return (
    <Button {...props} type="submit" isProcessing={pending} disabled={pending}>
      {children ?? (pending ? t("submitting") : t("submit"))}
    </Button>
  );
}
