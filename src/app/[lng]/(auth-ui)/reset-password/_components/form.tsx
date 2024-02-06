"use client";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { resetPassword } from "@/app/actions/auth";
import { Alert } from "flowbite-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { type ResetTokenParam, resetTokenFieldName } from "@/edgedb";

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
        <div className="flex flex-col gap-4">
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
          <div>
            <Label
              htmlFor="password"
              color={
                isInvalid && validationError.fieldErrors.password
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
            >
              {t("resetPassword.newPassword")}
            </Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              disabled={isPending}
              color={
                isInvalid && validationError.fieldErrors.password
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={validationError?.fieldErrors.password?.[0]}
            />
          </div>
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
        </div>
      )}
    </Form>
  );
}
