"use server";

import { authAction } from "@/gel";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { actions, t } }) => {
    await actions.emailPasswordSendPasswordResetEmail(input);

    return t("auth:resetPasswordEmail.success");
  });
