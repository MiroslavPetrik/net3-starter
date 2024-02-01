"use server";
import { auth } from "@/edgedb";
import { redirect } from "next/navigation";
import { createFormAction } from "react-form-action";
import { ZodError, z } from "zod";
import { useTranslation, getLngCookie } from "@/i18n";
import { cookies } from "next/headers";
import { cookieName } from "@/i18n/options";

const actions = auth.createServerActions();

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninDto = (typeof signinSchema)["_output"];

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
          const dbError = readDbError(error);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error),
          });
        } else {
          return failure({
            validation: false,
            message: "Something went wrong.",
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
      message: "Passwords must match.",
      path: ["passwordRepeat"],
    },
  );

type SignUpDto = (typeof singupSchema)["_output"];

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
          const dbError = readDbError(error);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error),
          });
        } else {
          return failure({
            validation: false,
            message: "Something went wrong.",
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

    await actions.emailPasswordSendPasswordResetEmail({
      ...data,
      resetUrl: "TODO: never-used",
    });

    return success(t("resetPasswordEmail.success"));
  } catch (error) {
    if (error instanceof ZodError) {
      return failure({
        validation: true,
        messages: getZodErrorMessages(error),
      });
    } else if (error instanceof Error) {
      const dbError = readDbError(error);

      return failure({
        validation: false,
        message: dbError?.message ?? getErrorMessage(error),
      });
    } else {
      return failure({
        validation: false,
        message: "Something went wrong.",
      });
    }
  }
});

const resetPasswordSchema = z.object({
  password: z.string().min(1),
});

export const resetPassword = createFormAction<string, FormError<SigninDto>>(
  ({ success, failure }) =>
    async (_, formData) => {
      const { t } = await useTranslation("auth", getLngCookie());

      try {
        const data = resetPasswordSchema.parse({
          password: formData.get("password"),
        });

        await actions.emailPasswordResetPassword({
          resetToken: "???",
          ...data,
        });

        return success(t("resetPassword.success"));
      } catch (error) {
        if (error instanceof ZodError) {
          return failure({
            validation: true,
            messages: getZodErrorMessages(error),
          });
        } else if (error instanceof Error) {
          const dbError = readDbError(error);

          return failure({
            validation: false,
            message: dbError?.message ?? getErrorMessage(error),
          });
        } else {
          return failure({
            validation: false,
            message: "Something went wrong.",
          });
        }
      }
    },
);

const getZodErrorMessages = (error: ZodError) =>
  error.errors.reduce((all, { message, path }) => {
    return { ...all, [path[0]!]: message };
  }, {});

const getErrorMessage = (error: Error) => {
  if (typeof error.cause === "string") {
    return error.cause;
  }

  return `${error.message ?? "Unknown error"}`;
};

const readDbError = (originalError: Error) => {
  try {
    const { error } = stringToDBError.parse(originalError.message);
    console.log(error);
    return error;
  } catch {
    return null;
  }
};

const dbAuthError = z.object({
  error: z.object({
    type: z.string(),
    message: z.string(),
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
