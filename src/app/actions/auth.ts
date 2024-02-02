"use server";

import { auth } from "@/edgedb";
import { resetTokenFieldName } from "@/edgedb/resetToken";

import { createFormAction } from "react-form-action";
import { ZodError, z } from "zod";
import { useTranslation, getLngCookie, t } from "@/i18n";

const actions = auth.createServerActions();

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninDto = z.infer<typeof signinSchema>;

type FormError<Dto> = {
  validation: boolean;
  message?: string;
  messages?: {
    [k in keyof Dto]?: string;
  };
};

export const signin = createFormAction<string, FormError<SigninDto>>(
  ({ success, failure }) =>
    async (_, formData) => {
      const { t } = await useTranslation("auth", getLngCookie());

      try {
        // this is only to display precise validation error
        // better would be client side with form-atoms
        // the auth library validates existence of fields, but provides unspecific error message
        const data = signinSchema.parse({
          email: formData.get("email"),
          password: formData.get("password"),
        });

        /**
         * This sets auth cookie, and toggles the session.isLoggedIn().
         * So the AuthLayout will redirect the user to dashboard.
         */
        await actions.emailPasswordSignIn(data);

        /**
         * The AuthLayout redirect effectivelly makes this message useless,
         * as there is no time to render it.
         * Such message can be rendered, by shifting the routing responsibility to the client.
         */
        return success(t("signIn.success"));
      } catch (error) {
        if (error instanceof ZodError) {
          return failure({
            validation: true,
            messages: getZodErrorMessages(error),
          });
        } else if (error instanceof Error) {
          const dbError = readDbError(error, t);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error, t),
          });
        } else {
          return failure({
            validation: false,
            message: t("unexpectedError"),
          });
        }
      }
    },
);

const singupSchema = z
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

type SignUpDto = z.infer<typeof singupSchema>;

export const signup = createFormAction<string, FormError<SignUpDto>>(
  ({ success, failure }) =>
    async (_, formData) => {
      const { t } = await useTranslation("auth", getLngCookie());

      try {
        const { email, password } = singupSchema.parse({
          email: formData.get("email"),
          password: formData.get("password"),
          passwordRepeat: formData.get("passwordRepeat"),
          tos: formData.get("tos"),
        });

        const tokenData = await actions.emailPasswordSignUp({
          email,
          password,
        });

        if (!tokenData) {
          return success(t("signUp.emailVerificationRequired"));
        }

        /**
         * Similarly the success has no effect as in the signIn action.
         */
        return success(t("signUp.success"));
      } catch (error) {
        if (error instanceof ZodError) {
          return failure({
            validation: true,
            messages: getZodErrorMessages(error),
          });
        } else if (error instanceof Error) {
          const dbError = readDbError(error, t);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error, t),
          });
        } else {
          return failure({
            validation: false,
            message: t("unexpectedError"),
          });
        }
      }
    },
);

const resetPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordEmail = createFormAction<
  string,
  FormError<SigninDto>
>(({ success, failure }) => async (_, formData) => {
  const { t } = await useTranslation("auth", getLngCookie());

  try {
    const data = resetPasswordEmailSchema.parse({
      email: formData.get("email"),
    });

    await actions.emailPasswordSendPasswordResetEmail(data);

    return success(t("resetPasswordEmail.success"));
  } catch (error) {
    if (error instanceof ZodError) {
      return failure({
        validation: true,
        messages: getZodErrorMessages(error),
      });
    } else if (error instanceof Error) {
      const dbError = readDbError(error, t);

      return failure({
        validation: false,
        message: dbError?.message ?? getErrorMessage(error, t),
      });
    } else {
      return failure({
        validation: false,
        message: t("unexpectedError"),
      });
    }
  }
});

const resetPasswordSchema = z.object({
  password: z.string().min(1),
  reset_token: z.string(),
});

export const resetPassword = createFormAction<string, FormError<SigninDto>>(
  ({ success, failure }) =>
    async (_, formData) => {
      const { t } = await useTranslation("auth", getLngCookie());

      try {
        const data = resetPasswordSchema.parse({
          password: formData.get("password"),
          [resetTokenFieldName]: formData.get(resetTokenFieldName),
        });

        console.log(data);

        await actions.emailPasswordResetPassword(data);

        return success(t("resetPassword.success"));
      } catch (error) {
        if (error instanceof ZodError) {
          return failure({
            validation: true,
            messages: getZodErrorMessages(error),
          });
        } else if (error instanceof Error) {
          const dbError = readDbError(error, t);

          console.log(dbError);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error, t),
          });
        } else {
          return failure({
            validation: false,
            message: t("unexpectedError"),
          });
        }
      }
    },
);

const getZodErrorMessages = (error: ZodError) =>
  error.errors.reduce((all, { message, path }) => {
    return { ...all, [path[0]!]: message };
  }, {});

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
      return { ...error, message: t("auth:emailVerificationRequired") };
    }

    // https://github.com/edgedb/edgedb/blob/639c91e9207275c114828556a1b00c4a3029d8c1/edb/server/protocol/auth_ext/http.py#L169
    if (error.message === "No identity found") {
      return { ...error, message: t("auth:noIdentityFound") };
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
