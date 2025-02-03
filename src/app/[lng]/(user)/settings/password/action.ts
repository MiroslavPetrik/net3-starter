"use server";

import { authAction } from "@/edgedb";
import { z } from "zod";

export const sendPasswordResetEmail = authAction
  .args([z.string().email()])
  .run(async ({ args: [email], ctx: { actions } }) => {
    await actions.emailPasswordSendPasswordResetEmail({ email });
  });
