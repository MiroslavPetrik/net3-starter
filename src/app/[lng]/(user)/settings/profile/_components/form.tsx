"use client";

import { Alert, Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { type User } from "@/types/user";
import { useTranslation } from "react-i18next";
import { updateUser } from "@/app/actions/";
import { SubmitButton } from "@/app/_components/submit-button";
import { FormItem, FormLabel, Stack } from "@/app/_components";

export function UpdateUserForm({ user }: { user: User }) {
  const { t } = useTranslation("settings");

  return (
    <Form action={updateUser} initialData="" className="flex flex-col gap-2">
      {({ data, validationError, isInvalid, isSuccess, isPending }) => (
        <Stack>
          {isSuccess && <Alert color="success">{data}</Alert>}
          <FormItem>
            <FormLabel>
              <Label
                htmlFor="name"
                color={
                  isInvalid ? "failure" : isSuccess ? "success" : undefined
                }
              >
                {t("editProfile.name")}
              </Label>
            </FormLabel>
            <TextInput
              defaultValue={user.name}
              id="name"
              name="name"
              disabled={isPending}
              color={isInvalid ? "failure" : isSuccess ? "success" : undefined}
              type="text"
              placeholder={t("editProfile.newName")}
              helperText={
                isInvalid ? validationError.fieldErrors.name : undefined
              }
            />
          </FormItem>
          <SubmitButton />
        </Stack>
      )}
    </Form>
  );
}
