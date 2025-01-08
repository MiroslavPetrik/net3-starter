"use client";

import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";

export function DeleteUserForm() {
  const { t } = useTranslation("settings");

  return (
    <Form>
      <SubmitButton color="failure">
        {({ isPending }) =>
          isPending ? t("deleteAccount.submitting") : t("deleteAccount.submit")
        }
      </SubmitButton>
    </Form>
  );
}
