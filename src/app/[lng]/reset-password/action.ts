"use server";

import { authAction } from "@/gel";
import { z } from "zod";

import { resetTokenFieldName } from "@/gel/shared";

const resetPasswordSchema = z.object({
  password: z.string().min(1),
  [resetTokenFieldName]: z.string(),
});

export const resetPassword = authAction
  .input(resetPasswordSchema)
  .run(async ({ input, ctx: { actions } }) => {
    await actions.emailPasswordResetPassword(input);
  });
