"use client";

import { resendVerificationEmail } from "@/app/actions/auth";
import { Form } from "react-form-action/client";
import { Trans, useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";
import { type UserEmail } from "@/types";
import { Alert, Label, TextInput } from "flowbite-react";
import { FormLabel, FormItem, Stack } from "@/app/_components";

export function EmailForm({ email }: { email: UserEmail }) {
  const { t } = useTranslation("settings");

  return (
    <Form action={resendVerificationEmail} initialData="">
      {({ data, error, isSuccess, isFailure, isPending }) => (
        <Stack>
          {!email.verifiedAt && (
            <Alert
              color="warning"
              rounded
              additionalContent={
                <SubmitButton color="warning">
                  {isPending
                    ? t("email.sendingVerificationLink")
                    : t("email.sendVerificationLink")}
                </SubmitButton>
              }
            >
              <Trans i18nKey="email.pleaseVerifyEmail" t={t}>
                <span className="font-medium">Email is not verified!</span>{" "}
                Please verify your email address, so you can access your account
                in case you forget your password.
              </Trans>
            </Alert>
          )}
          <FormItem>
            <FormLabel>
              <Label
                htmlFor="email"
                color={
                  isFailure ? "failure" : isSuccess ? "success" : undefined
                }
              >
                {t("email.yourEmail")}
              </Label>
            </FormLabel>
            <TextInput
              readOnly
              id="email"
              name="email"
              value={email.address}
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
              helperText={
                isFailure && error.message
                  ? error.message
                  : isSuccess
                    ? data
                    : undefined
              }
            />
          </FormItem>
        </Stack>
      )}
    </Form>
  );
}
