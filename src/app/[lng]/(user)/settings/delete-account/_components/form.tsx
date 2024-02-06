"use client";

import { deleteUser } from "@/app/actions";
import { Form } from "react-form-action/client";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";

export function DeleteUserForm() {
  const { t } = useTranslation("settings");

  return (
    <Form action={deleteUser} initialData="">
      {({ data, isSuccess, isPending }) => (
        <>
          {isSuccess && <label>{data}</label>}
          <SubmitButton color="failure">
            {isPending
              ? t("deleteAccount.submitting")
              : t("deleteAccount.submit")}
          </SubmitButton>
        </>
      )}
    </Form>
  );
}
