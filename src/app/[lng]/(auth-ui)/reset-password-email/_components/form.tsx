"use client";
import Link from "next/link";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form, ZodFieldError } from "react-form-action/client";
import { resetPasswordEmail } from "@/app/actions/auth";
import { Alert } from "flowbite-react";
import { Trans } from "react-i18next/TransWithoutContext";
import { useTranslation } from "react-i18next";
import { Stack, FormItem, FormLabel } from "@/app/_components";

export function ResetPasswordEmailForm() {
  const { t } = useTranslation("auth");

  return (
    <Form action={resetPasswordEmail} initialData="">
      {({
        error,
        data,
        validationError,
        isFailure,
        isInvalid,
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
                htmlFor="email"
                color={
                  isInvalid && validationError.email
                    ? "failure"
                    : isSuccess
                      ? "success"
                      : undefined
                }
              >
                {t("resetPasswordEmail.email")}
              </Label>
            </FormLabel>
            <TextInput
              id="email"
              name="email"
              disabled={isPending}
              color={
                isInvalid && validationError.email
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              type="text"
              placeholder="hello@net3.app"
              helperText={
                isInvalid && (
                  <ZodFieldError errors={validationError} name="email" />
                )
              }
            />
          </FormItem>
          <SubmitButton />
          <Label>
            <Trans i18nKey="resetPasswordEmail.linkToSignIn" t={t}>
              Go back to&nbsp;
              <Link
                href="/signin"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Sign in
              </Link>
            </Trans>
          </Label>
        </Stack>
      )}
    </Form>
  );
}
