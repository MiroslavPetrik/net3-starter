"use server";
import { auth } from "@/edgedb";
import { createFormAction } from "react-form-action";
import { ZodError, z } from "zod";

const actions = auth.createServerActions();

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninDto = (typeof signinSchema)["_output"];

type Error<Dto> = {
  validation: boolean;
  message?: string;
  messages?: {
    [k in keyof Dto]?: string;
  };
};

export const signin = createFormAction<string, Error<SigninDto>>(
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
          // TODO: export?
          const messages = error.errors.reduce((all, { message, path }) => {
            return { ...all, [path[0]!]: message };
          }, {});

          return failure({ validation: true, messages });
        }

        // TODO: parsing of error?
        return failure({ validation: false, message: "Something went wrong" });
      }
    },
);
