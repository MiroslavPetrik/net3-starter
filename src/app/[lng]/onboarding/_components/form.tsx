"use client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label } from "flowbite-react/components/Label";
import { TextInput } from "flowbite-react/components/TextInput";
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
              helperText={validationError?.name?._errors[0]}
            />
          </FormItem>
          <SubmitButton />
        </Stack>
      )}
    </Form>
  );
}
