"use server";

import { authAction } from "@/gel";
import { z } from "zod";
import { t } from "@/i18n";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
    passwordRepeat: z.string().min(1),
    tos: z.coerce.boolean().pipe(z.literal(true)),
  })
  .refine(
    ({ password, passwordRepeat }) => {
      return password === passwordRepeat;
    },
    {
      params: { i18n: t("zodError:passwordsMustMatch") },
      path: ["passwordRepeat"],
    },
  );

export const signUp = authAction
  .input(signUpSchema)
  .run(async ({ input: { email, password }, ctx: { actions, t } }) => {
    const tokenData = await actions.emailPasswordSignUp({
      email,
      password,
    });

    if (!tokenData) {
      return t("auth:signUp.emailVerificationRequired");
    }

    /**
     * Similarly the success has no effect as in the signIn action.
     */
    return t("auth:signUp.success");
  });
