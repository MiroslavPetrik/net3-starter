"use client";

import { signup } from "@/app/actions/auth";
import {
  Alert,
  Button,
  Checkbox,
  HelperText,
  Label,
  TextInput,
} from "flowbite-react";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";

export function SignUpForm() {
  const { t } = useTranslation("auth");

  return (
    <Form action={signup} initialData="">
      {({
        isPending,
        isInvalid,
        validationError,
        error,
        data,
        isFailure,
        isSuccess,
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
            <div className="mb-2 block">
              <Label htmlFor="email" value={t("signUp.email")} />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@net3.com"
              required
              shadow
              color={
                isInvalid && validationError.fieldErrors.email
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={validationError?.fieldErrors.email?.[0]}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value={t("signUp.password")} />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              required
              shadow
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
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="passwordRepeat"
                value={t("signUp.passwordRepeat")}
              />
            </div>
            <TextInput
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              required
              shadow
              color={
                isInvalid && validationError.fieldErrors.passwordRepeat
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={validationError?.fieldErrors.passwordRepeat?.[0]}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="tos"
              name="tos"
              color={
                isInvalid && validationError.fieldErrors.tos
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
            />
            <div className="flex flex-col">
              <Label
                htmlFor="tos"
                className="flex"
                color={
                  isInvalid && validationError.fieldErrors.tos
                    ? "failure"
                    : isSuccess
                      ? "success"
                      : undefined
                }
              >
                <Trans i18nKey="signUp.agreeTOC" t={t}>
                  I agree with the&nbsp;
                  <Link
                    href="#"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    terms and conditions
                  </Link>
                </Trans>
              </Label>
              {isInvalid && validationError.fieldErrors.tos && (
                <HelperText className="mt-0 text-xs" color="failure">
                  {validationError.fieldErrors.tos?.[0]}
                </HelperText>
              )}
            </div>
          </div>
          <Button type="submit" disabled={isPending} isProcessing={isPending}>
            {t("signUp.register")}
          </Button>
          <Label>
            <Trans i18nKey="signUp.linkToSignIn" t={t}>
              Already have an account?&nbsp;
              <Link
                href="/signin"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Sign in
              </Link>
            </Trans>
          </Label>
        </div>
      )}
    </Form>
  );
}
