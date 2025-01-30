"use client";

import { Alert, Label, TextInput } from "flowbite-react";
import {
  createComponents,
  Form,
  useActionContext,
} from "react-form-action/client";
import { type User } from "@/types/user";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";
import { FormItem, FormLabel, Stack } from "@/app/_components";
import { useState } from "react";
import { updateUser } from "./action";
import { updateUserSchema } from "./schema";

const { FieldError, Success } = createComponents(updateUser);

export function UpdateUserForm({ user }: { user: User }) {
  const { t } = useTranslation("settings");
  const [nameError, setNameErr] = useState<string | undefined>(undefined);
  const { isPending, isSuccess, isInvalid } = useActionContext(updateUser);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form className="flex flex-col gap-2">
      <Stack>
        <Success>
          <Alert color="success">{t("editProfile.success")}</Alert>
        </Success>
        <FieldError name="name">
          {({ name, error }) => (
            <FormItem>
              <FormLabel>
                <Label
                  htmlFor={name}
                  color={nameError ? "failure" : getColor(error)}
                >
                  {t("editProfile.name")}
                </Label>
              </FormLabel>
              <TextInput
                defaultValue={user.name}
                id={name}
                name={name}
                type="text"
                disabled={isPending}
                color={nameError ? "failure" : getColor(error)}
                placeholder={t("editProfile.newName")}
                helperText={error ?? nameError}
                onChange={(e) => {
                  const result = updateUserSchema.shape.name.safeParse(
                    e.target.value,
                  );

                  setNameErr(result.error?.errors[0]?.message);
                }}
              />
            </FormItem>
          )}
        </FieldError>
        <SubmitButton />
      </Stack>
    </Form>
  );
}
