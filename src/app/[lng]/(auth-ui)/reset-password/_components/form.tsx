"use client";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { resetPassword } from "@/app/actions/auth";
import { Alert } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { type ResetTokenParam, resetTokenFieldName } from "@/edgedb/shared";
import { Stack, FormItem, FormLabel } from "@/app/_components";

export function ResetPasswordForm({ reset_token }: ResetTokenParam) {
  const { t } = useTranslation("auth");

  return (
    <Form action={resetPassword} initialData="">
      {({
        error,
        data,
        validationError,
        isInvalid,
        isFailure,
        isSuccess,
        isPending,
      }) => (
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
          <FormItem>
            <FormLabel>
              <Label
                htmlFor="password"
                color={
                  isInvalid && validationError.password
                    ? "failure"
                    : isSuccess
                      ? "success"
                      : undefined
                }
              >
                {t("resetPassword.newPassword")}
              </Label>
            </FormLabel>
            <TextInput
              id="password"
              name="password"
              type="password"
              disabled={isPending}
              color={
                isInvalid && validationError.password
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={validationError?.password?._errors[0]}
            />
          </FormItem>
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
      )}
    </Form>
  );
}
