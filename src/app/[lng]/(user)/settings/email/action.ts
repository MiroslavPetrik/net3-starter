"use server";

import { actions, authAction } from "@/edgedb";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resendVerificationEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordResendVerificationEmail(input);

    return t("resendVerificationEmail.success");
  });
