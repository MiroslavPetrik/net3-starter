"use server";
import { auth } from "@/edgedb";
import { redirect } from "next/navigation";
import { createFormAction } from "react-form-action";
import { ZodError, z } from "zod";

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
      try {
        // this is only to display precise validation error
        // better would be client side with form-atoms
        // the auth library validates existence of fields, but provides unspecific error message
        const data = signinSchema.parse({
          email: formData.get("email"),
          password: formData.get("password"),
        });

        await actions.emailPasswordSignIn(data);

        return success("");
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

        if (tokenData) {
          return redirect("/");
        }

        return success("Please check you email for a verification link.");
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
