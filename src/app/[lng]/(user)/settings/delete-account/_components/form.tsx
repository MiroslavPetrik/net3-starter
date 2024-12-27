"use client";

import { Form, useActionContext } from "react-form-action/client";
import { deleteUser } from "@/app/actions";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "@/app/_components/submit-button";

export function DeleteUserForm() {
  const { t } = useTranslation("settings");

  const { isPending, isSuccess, data } = useActionContext(deleteUser);

  return (
    <Form>
      {isSuccess && <label>{data}</label>}
      <SubmitButton color="failure">
        {isPending ? t("deleteAccount.submitting") : t("deleteAccount.submit")}
      </SubmitButton>
    </Form>
  );
}
