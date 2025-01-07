"use server";

import { authAction, actions } from "@/edgedb";
import { z } from "zod";

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordSendPasswordResetEmail(input);

    return t("resetPasswordEmail.success");
  });
