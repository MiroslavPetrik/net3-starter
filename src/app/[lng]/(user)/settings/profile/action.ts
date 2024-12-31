"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { protectedAction } from "../../../../actions/protected";
import { updateCurrentUserQuery } from "@/edgedb/queries";

const updateUserSchema = z.object({
  name: z.string().min(3),
});

export const updateUser = protectedAction
  .input(updateUserSchema)
  .run(async ({ input, ctx: { session } }) => {
    const user = await updateCurrentUserQuery.run(session.client, input);

    if (!user) {
      redirect("/onboarding");
    }

    revalidatePath("/settings/profile");

    return "Your profile has been updated.";
  });
