"use client";

import Link from "next/link";
import { Label, TextInput } from "flowbite-react";
import {
  Form,
  createComponents,
  useActionContext,
} from "react-form-action/client";
import { Alert } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next/TransWithoutContext";
import { SubmitButton } from "@/app/_components/submit-button";
import { FormLabel, FormItem, Stack } from "@/app/_components";
import { signIn } from "@/app/actions/auth";

const { FieldError } = createComponents(signIn);

export function SignInForm() {
  const { t } = useTranslation("auth");

  const { isPending, isFailure, isSuccess, isInvalid, error, validationError } =
    useActionContext(signIn);

  return (
    <Form>
      <Stack>
        {isFailure && (
          <div>
            <Alert color="failure">{error.message}</Alert>
          </div>
        )}
        <FormItem>
          <FormLabel>
            <Label htmlFor="email">{t("signIn.email")}</Label>
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
            helperText={<FieldError name="email" />}
          />
        </FormItem>
        <FormItem>
          <FormLabel>
            <Label htmlFor="password" className="flex justify-between">
              <span>{t("signIn.password")}</span>
              <Link
                tabIndex={-1}
                href="/reset-password-email"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                {t("signIn.forgotPassword")}
              </Link>
            </Label>
          </FormLabel>
          <TextInput
            id="password"
            name="password"
            disabled={isPending}
            color={
              isInvalid && validationError.password
                ? "failure"
                : isSuccess
                  ? "success"
                  : undefined
            }
            type="password"
            placeholder="Your password"
            helperText={<FieldError name="password" />}
          />
        </FormItem>
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
      </Stack>
    </Form>
  );
}
