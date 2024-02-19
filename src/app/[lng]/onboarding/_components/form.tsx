"use client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { Stack, FormLabel, FormItem } from "@/app/_components";

export function CreateUserForm() {
  const { t } = useTranslation("onboarding");

  return (
    <Form action={createUser} initialData={undefined}>
      {({ isInvalid, validationError }) => (
        <Stack>
          <FormItem>
            <FormLabel>
              <Label
                htmlFor="name"
                value={t("name")}
                color={isInvalid ? "failure" : undefined}
              />
            </FormLabel>
            <TextInput
              id="name"
              required
              color={isInvalid ? "failure" : undefined}
              name="name"
              type="text"
              placeholder="Patrick"
              helperText={validationError?.fieldErrors.name}
            />
          </FormItem>
          <SubmitButton />
        </Stack>
      )}
    </Form>
  );
}
