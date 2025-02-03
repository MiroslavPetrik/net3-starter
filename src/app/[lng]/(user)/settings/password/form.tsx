"use client";

import { Alert } from "flowbite-react/components/Alert";
import { useTranslation } from "react-i18next";
import { Form, useActionContext } from "react-form-action/client";
import { SubmitButton } from "@/app/_components/submit-button";
import { Stack } from "@/app/_components";

export function PasswordResetEmailForm() {
  const { t } = useTranslation("settings");

  // TODO: the hook (and also createComponents) does not yet accept action with arguments.
  const { isSuccess, isFailure, error } = useActionContext();

  return (
    <Form>
      <Stack>
        <div>
          <SubmitButton>
            {({ isPending }) =>
              isPending
                ? t("password.sendEmail.pending")
                : t("password.sendEmail.submit")
            }
          </SubmitButton>
        </div>
        {isSuccess && (
          <Alert color="success" rounded>
            {t("password.sendEmail.success")}
          </Alert>
        )}
        {isFailure && (
          <Alert color="failure" rounded>
            {(error as Error).message}
          </Alert>
        )}
      </Stack>
    </Form>
  );
}
