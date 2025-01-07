"use server";

import { authAction, actions } from "@/edgedb";
import { z } from "zod";

import { resetTokenFieldName } from "@/edgedb/shared";

const resetPasswordSchema = z.object({
  password: z.string().min(1),
  [resetTokenFieldName]: z.string(),
});

export const resetPassword = authAction
  .input(resetPasswordSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordResetPassword(input);

    return t("resetPassword.success");
  });
