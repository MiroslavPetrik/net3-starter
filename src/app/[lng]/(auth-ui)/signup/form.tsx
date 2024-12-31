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
import {
  Form,
  createComponents,
  useActionContext,
} from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { signUp } from "@/app/actions/auth";
import { Stack, FormItem, FormLabel } from "@/app/_components";

const { FieldError } = createComponents(signUp);

export function SignUpForm() {
  const { t } = useTranslation("auth");

  const { isPending, isFailure, isSuccess, isInvalid, error, data } =
    useActionContext(signUp);

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
        <FieldError>
          {({ error }) => (
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
                color={getColor(error)}
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
        <FieldError name="password">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} value={t("signUp.password")} />
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                required
                shadow
                color={getColor(error)}
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
        <FieldError name="passwordRepeat">
          {({ error, name }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} value={t("signUp.passwordRepeat")} />
              </FormLabel>
              <TextInput
                id={name}
                name={name}
                type="password"
                required
                shadow
                color={getColor(error)}
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
        <FieldError>
          {({ error }) => (
            <FormItem className="flex items-center gap-2">
              <Checkbox id="tos" name="tos" color={getColor(error)} />
              <div className="flex flex-col">
                <Label
                  htmlFor="tos"
                  className="flex whitespace-pre-wrap"
                  color={getColor(error)}
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
                <HelperText className="mt-0 text-xs" color="failure">
                  {error}
                </HelperText>
              </div>
            </FormItem>
          )}
        </FieldError>
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
    </Form>
  );
}
