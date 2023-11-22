"use server";
import { ZodError, z } from "zod";
import { updateCurrentUser } from "@/edgedb/user";
import { createFormAction } from "react-form-action";
import { revalidatePath } from "next/cache";

const updateUserSchema = z.object({
  name: z.string().min(3),
});

export const updateUser = createFormAction<string>(
  ({ success, failure }) =>
    async (_, formData) => {
      try {
        const { name } = updateUserSchema.parse({
          name: formData.get("name"),
        });

        const user = await updateCurrentUser(name);

        if (user) {
          revalidatePath("/settings/profile");
          return success(`Your profile has been updated.`);
        } else {
          return failure(`no user`);
        }
      } catch (err) {
        if (err instanceof ZodError) {
          return failure(err.issues[0]?.message ?? "Validation error");
        }

        return failure("Failed to update user");
      }
    },
);
