"use server";

import { ZodError, z } from "zod";
import { insertUser } from "@/edgedb/user";
import { createFormAction } from "react-form-action";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  name: z.string().min(3),
});

type State = {
  message: string;
};

export const createUser = createFormAction<State>(
  ({ success, failure }) =>
    async (_, formData) => {
      try {
        const { name } = createUserSchema.parse({
          name: formData.get("name"),
        });

        const user = await insertUser(name);

        revalidatePath("/onboarding");
        return success({ message: `Created user with id: ${user.id}` });
      } catch (error) {
        if (error instanceof ZodError) {
          return failure({
            message: error.issues[0]?.message ?? "Validation error",
          });
        }

        return failure({ message: "Failed to create user" });
      }
    },
);
