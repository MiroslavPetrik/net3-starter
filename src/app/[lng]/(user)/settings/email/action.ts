"use server";

import { authAction } from "@/gel";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resendVerificationEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { actions, t } }) => {
    await actions.emailPasswordResendVerificationEmail(input);

    return t("auth:resendVerificationEmail.success");
  });
