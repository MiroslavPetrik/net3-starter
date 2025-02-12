"use server";

import { revalidatePath } from "next/cache";
import { authorizedAction } from "@/edgedb";
import { deleteCurrentUserQuery } from "@/edgedb/queries";

export const deleteUser = authorizedAction
  .error(async () => "Failed to delete account.")
  .run(async ({ ctx: { session } }) => {
    await deleteCurrentUserQuery.run(session.client);

    revalidatePath("/");

    return "Your account has been deleted.";
  });
