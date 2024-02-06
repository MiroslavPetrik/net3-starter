"use client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";

export function CreateUserForm() {
  const { t } = useTranslation("onboarding");

  return (
    <Form
      action={createUser}
      initialData={undefined}
      className="flex flex-col gap-2"
    >
      {({ error, isInvalid, validationError }) => (
        <div className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              value={t("name")}
              color={isInvalid ? "failure" : undefined}
            />
            <TextInput
              id="name"
              required
              color={isInvalid ? "failure" : undefined}
              name="name"
              type="text"
              placeholder="Patrick"
              helperText={validationError?.fieldErrors.name}
            />
          </div>
          <SubmitButton />
        </div>
      )}
    </Form>
  );
}
