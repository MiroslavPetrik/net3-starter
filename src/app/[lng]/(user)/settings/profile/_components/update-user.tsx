"use client";
import { updateUser } from "@/app/actions/";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { type User } from "@/types/user";
import { useTranslation } from "react-i18next";

export function UpdateUser({ user }: { user: User }) {
  const { t } = useTranslation("settings");

  return (
    <Form action={updateUser} initialData="" className="flex flex-col gap-2">
      {({ error, isFailure, isSuccess, isPending }) => (
        <div className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
            >
              {t("editProfile.name")}
            </Label>
            <TextInput
              defaultValue={user.name}
              id="name"
              name="name"
              disabled={isPending}
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
              type="text"
              placeholder={t("editProfile.newName")}
              helperText={isFailure ? error : undefined}
            />
          </div>
          <SubmitButton />
        </div>
      )}
    </Form>
  );
}
