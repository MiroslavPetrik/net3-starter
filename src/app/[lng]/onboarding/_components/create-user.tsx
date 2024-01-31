"use client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";

const initialState = {
  message: "Please insert your name.",
};

export function CreateUser() {
  const { t } = useTranslation("onboarding");

  return (
    <Form
      action={createUser}
      initialData={initialState}
      className="flex flex-col gap-2"
    >
      {({ error, isFailure }) => (
        <div className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              value={t("name")}
              color={isFailure ? "failure" : undefined}
            />
            <TextInput
              id="name"
              required
              color={isFailure ? "failure" : undefined}
              name="name"
              type="text"
              placeholder="Patrick"
              helperText={error?.message}
            />
          </div>
          <SubmitButton />
        </div>
      )}
    </Form>
  );
}
