"use server";

import { authAction } from "@/edgedb";
import { z } from "zod";

import { resetTokenFieldName } from "@/edgedb/shared";

const resetPasswordSchema = z.object({
  password: z.string().min(1),
  [resetTokenFieldName]: z.string(),
});

export const resetPassword = authAction
  .input(resetPasswordSchema)
  .run(async ({ input, ctx: { actions, t } }) => {
    await actions.emailPasswordResetPassword(input);

    return t("auth:resetPassword.success");
  });
