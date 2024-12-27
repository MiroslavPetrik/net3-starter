"use client";

import {
  Form,
  useActionContext,
  createComponents,
} from "react-form-action/client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label } from "flowbite-react/components/Label";
import { TextInput } from "flowbite-react/components/TextInput";
import { useTranslation } from "react-i18next";
import { Stack, FormLabel, FormItem } from "@/app/_components";

const { FieldError } = createComponents(createUser);

export function CreateUserForm() {
  const { t } = useTranslation("onboarding");

  const { isInvalid } = useActionContext(createUser);

  return (
    <Form>
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
            helperText={<FieldError name="name" />}
          />
        </FormItem>
        <SubmitButton />
      </Stack>
    </Form>
  );
}
