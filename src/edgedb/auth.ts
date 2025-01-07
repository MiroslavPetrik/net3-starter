import createAuth from "@edgedb/auth-nextjs/app";
import { client } from "./client";
import { getBaseUrl } from "@/server/baseUrl";
import { formAction } from "react-form-action";
import { z } from "zod";
import { translate, getLngCookie } from "@/i18n";

export const auth = createAuth(client, {
  baseUrl: getBaseUrl(),
  passwordResetPath: "/reset-password",
});

export const actions = auth.createServerActions();

export const authAction = formAction
  .use(async () => {
    const { t } = await translate("auth", await getLngCookie());
    return { t };
  })
  .error(async ({ error, ctx: { t } }) => {
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
