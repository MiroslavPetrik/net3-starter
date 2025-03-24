"use server";

import { revalidatePath } from "next/cache";
import { authorizedAction } from "@/gel";
import { deleteCurrentUserQuery } from "@/gel/queries";

export const deleteUser = authorizedAction
  .error(async () => "Failed to delete account.")
  .run(async ({ ctx: { session } }) => {
    await deleteCurrentUserQuery.run(session.client);

    revalidatePath("/");

    return "Your account has been deleted.";
  });
