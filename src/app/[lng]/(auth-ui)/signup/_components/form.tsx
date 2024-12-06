"use client";

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
import { Form, ZodFieldError } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { signUp } from "@/app/actions/auth";
import { Stack, FormItem, FormLabel } from "@/app/_components";

export function SignUpForm() {
  const { t } = useTranslation("auth");

  return (
    <Form action={signUp} initialData="">
      {({
        isPending,
        isInvalid,
        validationError,
        error,
        data,
        isFailure,
        isSuccess,
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
              <Label htmlFor="email" value={t("signUp.email")} />
            </FormLabel>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@net3.com"
              required
              shadow
              color={
                isInvalid && validationError.email
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={
                isInvalid && (
                  <ZodFieldError errors={validationError} name="email" />
                )
              }
            />
          </FormItem>
          <FormItem>
            <FormLabel>
              <Label htmlFor="password" value={t("signUp.password")} />
            </FormLabel>
            <TextInput
              id="password"
              name="password"
              type="password"
              required
              shadow
              color={
                isInvalid && validationError.password
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={
                isInvalid && (
                  <ZodFieldError errors={validationError} name="password" />
                )
              }
            />
          </FormItem>
          <FormItem>
            <FormLabel>
              <Label
                htmlFor="passwordRepeat"
                value={t("signUp.passwordRepeat")}
              />
            </FormLabel>
            <TextInput
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              required
              shadow
              color={
                isInvalid && validationError.passwordRepeat
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
              helperText={
                isInvalid && (
                  <ZodFieldError
                    errors={validationError}
                    name="passwordRepeat"
                  />
                )
              }
            />
          </FormItem>
          <FormItem className="flex items-center gap-2">
            <Checkbox
              id="tos"
              name="tos"
              color={
                isInvalid && validationError.tos
                  ? "failure"
                  : isSuccess
                    ? "success"
                    : undefined
              }
            />
            <div className="flex flex-col">
              <Label
                htmlFor="tos"
                className="flex whitespace-pre-wrap"
                color={
                  isInvalid && validationError.tos
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
              {isInvalid && validationError.tos && (
                <ZodFieldError errors={validationError} name="tos">
                  {({ errors }) => (
                    <HelperText className="mt-0 text-xs" color="failure">
                      {errors[0]}
                    </HelperText>
                  )}
                </ZodFieldError>
              )}
            </div>
          </FormItem>
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
        </Stack>
      )}
    </Form>
  );
}
