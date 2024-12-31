"use client";

import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { useTranslation } from "react-i18next";
import { Alert } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import {
  Form,
  useActionContext,
  createComponents,
} from "react-form-action/client";

import { SubmitButton } from "@/app/_components/submit-button";
import { resetPasswordEmail } from "@/app/actions/auth";
import { Stack, FormItem, FormLabel } from "@/app/_components";

const { FieldError } = createComponents(resetPasswordEmail);

export function ResetPasswordEmailForm() {
  const { t } = useTranslation("auth");

  const { isPending, isFailure, isSuccess, isInvalid, error, data } =
    useActionContext(resetPasswordEmail);

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
        <FieldError name="email">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("resetPasswordEmail.email")}
                </Label>
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                disabled={isPending}
                color={getColor(error)}
                type="text"
                placeholder="hello@net3.app"
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
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
    </Form>
  );
}
