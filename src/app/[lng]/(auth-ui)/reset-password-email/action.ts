"use server";

import { authAction } from "@/edgedb";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { actions, t } }) => {
    await actions.emailPasswordSendPasswordResetEmail(input);

    return t("resetPasswordEmail.success");
  });
