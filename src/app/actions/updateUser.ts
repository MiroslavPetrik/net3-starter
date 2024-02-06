"use server";

import { z } from "zod";
import { updateCurrentUser } from "@/edgedb/user";
import { formAction } from "react-form-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updateUserSchema = z.object({
  name: z.string().min(3),
});

export const updateUser = formAction
  .input(updateUserSchema)
  .run(async ({ input: { name } }) => {
    const user = await updateCurrentUser(name);

    if (!user) {
      redirect("/onboarding");
    }

    revalidatePath("/settings/profile");

    return "Your profile has been updated.";
  });
