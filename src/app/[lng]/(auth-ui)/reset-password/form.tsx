"use client";

import { Label, TextInput } from "flowbite-react";
import {
  Form,
  useActionContext,
  createComponents,
} from "react-form-action/client";
import { Alert } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { SubmitButton } from "@/app/_components/submit-button";
import { type ResetTokenParam, resetTokenFieldName } from "@/edgedb/shared";
import { Stack, FormItem, FormLabel } from "@/app/_components";
import { resetPassword } from "@/app/actions/auth";

const { FieldError } = createComponents(resetPassword);

export function ResetPasswordForm({ reset_token }: ResetTokenParam) {
  const { t } = useTranslation("auth");

  const { isPending, isFailure, isSuccess, isInvalid, error, data } =
    useActionContext(resetPassword);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form>
      <Stack>
        {isSuccess && (
          <div>
            <Alert color="success">{data}</Alert>
          </div>
        )}
        {isFailure && (
          <div>
            <Alert color="failure">{error.message}</Alert>
          </div>
        )}

        <FieldError name="password">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("resetPassword.newPassword")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                disabled={isPending}
                color={getColor(error)}
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
        <input name={resetTokenFieldName} defaultValue={reset_token} hidden />
        <SubmitButton />
        <Label>
          <Trans i18nKey="resetPassword.linkToReset" t={t}>
            Link expired?&nbsp;
            <Link
              href="/reset-password-email"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Get another.
            </Link>
          </Trans>
        </Label>
      </Stack>
    </Form>
  );
}
