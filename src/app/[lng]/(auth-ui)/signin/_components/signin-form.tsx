"use client";

import Link from "next/link";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { signin } from "@/app/actions/auth";
import { Alert } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";

export function SignInForm() {
  const { t } = useTranslation("auth");

  return (
    <Form action={signin} initialData="">
      {({
        error,
        validationError,
        isInvalid,
        isFailure,
        isSuccess,
        isPending,
      }) => (
        <div className="flex flex-col gap-4">
          {isFailure && (
            <div>
              <Alert color="failure">{error.message}</Alert>
            </div>
          )}
          <div>
            <Label htmlFor="email">{t("signIn.email")}</Label>
            <TextInput
              id="email"
              name="email"
              disabled={isPending}
              color={
                isInvalid && validationError.fieldErrors.email
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              type="text"
              placeholder="hello@net3.app"
              helperText={validationError?.fieldErrors.email?.[0]}
            />
          </div>
          <div>
            <Label htmlFor="password" className="flex justify-between">
              <span>{t("signIn.password")}</span>
              <Link
                href="/reset-password-email"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                {t("signIn.forgotPassword")}
              </Link>
            </Label>
            <TextInput
              id="password"
              name="password"
              disabled={isPending}
              color={
                isInvalid && validationError.fieldErrors.password
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              type="password"
              placeholder="Your password"
              helperText={validationError?.fieldErrors.password?.[0]}
            />
          </div>
          <SubmitButton />
          <Label>
            <Trans i18nKey="signIn.linkToSignUp" t={t}>
              Don&apos;t have an account?&nbsp;
              <Link
                href="/signup"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Sign up
              </Link>
            </Trans>
          </Label>
        </div>
      )}
    </Form>
  );
}
