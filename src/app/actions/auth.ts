/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use server";

import { auth } from "@/edgedb";
import { resetTokenFieldName } from "@/edgedb/resetToken";

import { formAction } from "react-form-action";
import { z } from "zod";
import { useTranslation, getLngCookie, t } from "@/i18n";

const actions = auth.createServerActions();

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const authAction = formAction
  .use(async () => {
    const { t } = await useTranslation("auth", getLngCookie());
    return { t };
  })
  .error(({ error, ctx: { t } }) => {
    if (error instanceof Error) {
      const dbError = readDbError(error, t);

      return {
        message: dbError?.message ?? getErrorMessage(error, t),
      };
    } else {
      return {
        message: t("unexpectedError"),
      };
    }
  });

export const signin = authAction
  .input(signinSchema)
  .run(async ({ input, ctx: { t } }) => {
    /**
     * This sets auth cookie, and toggles the session.isSignedIn().
     * So the AuthLayout will redirect the user to dashboard.
     */
    await actions.emailPasswordSignIn(input);

    /**
     * The AuthLayout redirect effectivelly makes this message useless,
     * as there is no time to render it.
     * Such message can be rendered, by shifting the routing responsibility to the client.
     */
    return t("signIn.success");
  });

const singupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  passwordRepeat: z.string().min(1),
  tos: z.coerce.boolean().pipe(z.literal(true)),
});
// .refine(
//   ({ password, passwordRepeat }) => {
//     return password === passwordRepeat;
//   },
//   {
//     params: { i18n: t("zodError:passwordsMustMatch") },
//     path: ["passwordRepeat"],
//   },
// );

export const signup = authAction
  .input(singupSchema)
  .run(async ({ input: { email, password }, ctx: { t } }) => {
    const tokenData = await actions.emailPasswordSignUp({
      email,
      password,
    });

    if (!tokenData) {
      return t("signUp.emailVerificationRequired");
    }

    /**
     * Similarly the success has no effect as in the signIn action.
     */
    return t("signUp.success");
  });

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordSendPasswordResetEmail(input);

    return t("resetPasswordEmail.success");
  });

const resetPasswordSchema = z.object({
  password: z.string().min(1),
  reset_token: z.string(),
});

export const resetPassword = authAction
  .input(resetPasswordSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordResetPassword(input);

    return t("resetPassword.success");
  });

export const resendVerificationEmail = authAction
  .input(resetPasswordEmailSchema)
  .run(async ({ input, ctx: { t } }) => {
    await actions.emailPasswordResendVerificationEmail(input);

    return t("resendVerificationEmail.success");
  });

const getErrorMessage = (error: Error, t: (key: string) => string) => {
  if (typeof error.cause === "string") {
    return error.cause;
  }

  return error.message ?? t("auth:unexpectedError");
};

const readDbError = (originalError: Error, t: (key: string) => string) => {
  try {
    const { error } = stringToDBError.parse(originalError.message);

    // https://github.com/edgedb/edgedb/blob/6b29802935d71545e242e07db7a4a2074753287c/edb/server/protocol/auth_ext/errors.py#L179
    if (error.message === "Email verification is required") {
      return { ...error, message: t("auth:edgedb.emailVerificationRequired") };
    }

    // https://github.com/edgedb/edgedb/blob/639c91e9207275c114828556a1b00c4a3029d8c1/edb/server/protocol/auth_ext/http.py#L169
    if (error.message === "No identity found") {
      return { ...error, message: t("auth:edgedb.noIdentityFound") };
    }

    // https://github.com/edgedb/edgedb/blob/6b29802935d71545e242e07db7a4a2074753287c/edb/server/protocol/auth_ext/errors.py#L123
    if (error.message === "This user has already been registered") {
      return { ...error, message: t("auth:edgedb.userAlreadyRegistered") };
    }

    return error;
  } catch {
    return null;
  }
};

const dbAuthError = z.object({
  error: z.object({
    type: z.string(),
    message: z.string(),
    code: z.number(),
  }),
});

const stringToDBError = z
  .string()
  .transform((str, ctx): z.infer<typeof dbAuthError> => {
    try {
      const err: unknown = JSON.parse(str);

      return dbAuthError.parse(err);
    } catch {
      ctx.addIssue({
        code: "custom",
        message: "The string does not contain DB auth error",
      });
      return z.NEVER;
    }
  });
