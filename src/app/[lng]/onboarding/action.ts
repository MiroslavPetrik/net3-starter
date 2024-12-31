"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { insertUserQuery } from "@/edgedb/queries";
import { protectedAction } from "../../actions/protected";

const createUserSchema = z.object({
  name: z.string().min(3),
});

export const createUser = protectedAction
  .input(createUserSchema)
  .error(async () => ({ message: "Failed to create user" }))
  .run(async ({ input, ctx: { session } }) => {
    await insertUserQuery.run(session.client, input);

    revalidatePath("/onboarding");
  });
