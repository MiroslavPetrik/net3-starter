"use server";

import { z } from "zod";
import { insertUser } from "@/edgedb/user";
import { formAction } from "react-form-action";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  name: z.string().min(3),
});

export const createUser = formAction
  .input(createUserSchema)
  .error(() => ({ message: "Failed to create user" }))
  .run(async ({ input: { name } }) => {
    await insertUser(name);

    revalidatePath("/onboarding");
  });
