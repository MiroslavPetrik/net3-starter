"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authorizedAction } from "@/gel";
import { updateCurrentUserQuery } from "@/gel/queries";

import { updateUserSchema } from "./schema";

export const updateUser = authorizedAction
  .input(updateUserSchema)
  .run(async ({ input, ctx: { session } }) => {
    const user = await updateCurrentUserQuery.run(session.client, input);

    if (!user) {
      redirect("/onboarding");
    }

    revalidatePath("/settings/profile");
  });
