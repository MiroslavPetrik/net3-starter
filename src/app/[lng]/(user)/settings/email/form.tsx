"use client";

import { Form, useActionContext } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";
import { type UserEmail } from "@/types";
import { Label, TextInput } from "flowbite-react";
import { FormLabel, FormItem, Stack } from "@/app/_components";
import { resendVerificationEmail } from "./action";

type Props = { email: UserEmail };

export function EmailForm({ email }: Props) {
  const { t } = useTranslation("settings");

  const { isSuccess, isFailure, data, error } = useActionContext(
    resendVerificationEmail,
  );

  return (
    <Form>
      <Stack>
        <FormItem>
          <FormLabel>
            <Label
              htmlFor="email"
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
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
        {!email.verifiedAt && (
          <div>
            <SubmitButton color="warning">
              {({ isPending }) =>
                isPending
                  ? t("email.sendingVerificationLink")
                  : t("email.sendVerificationLink")
              }
            </SubmitButton>
          </div>
        )}
      </Stack>
    </Form>
  );
}
