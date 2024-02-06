"use server";

import { revalidatePath } from "next/cache";
import { protectedAction } from "./protected";
import { deleteCurrentUserQuery } from "@/edgedb/queries";

export const deleteUser = protectedAction
  .error(() => "Failed to delete account.")
  .run(async ({ ctx: { session } }) => {
    await deleteCurrentUserQuery.run(session.client);

    revalidatePath("/");

    return "Your account has been deleted.";
  });
