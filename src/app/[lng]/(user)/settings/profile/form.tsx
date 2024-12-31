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
import { updateUser } from "./action";

const { FieldError } = createComponents(updateUser);

export function UpdateUserForm({ user }: { user: User }) {
  const { t } = useTranslation("settings");

  const { isPending, isSuccess, isInvalid, data } =
    useActionContext(updateUser);

  function getColor(error?: string) {
    return isInvalid && error ? "failure" : isSuccess ? "success" : undefined;
  }

  return (
    <Form className="flex flex-col gap-2">
      <Stack>
        {isSuccess && <Alert color="success">{data}</Alert>}
        <FieldError name="name">
          {({ name, error }) => (
            <FormItem>
              <FormLabel>
                <Label htmlFor={name} color={getColor(error)}>
                  {t("editProfile.name")}
                </Label>
              </FormLabel>
              <TextInput
                defaultValue={user.name}
                id={name}
                name={name}
                type="text"
                disabled={isPending}
                color={getColor(error)}
                placeholder={t("editProfile.newName")}
                helperText={error}
              />
            </FormItem>
          )}
        </FieldError>
        <SubmitButton />
      </Stack>
    </Form>
  );
}
