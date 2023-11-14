"use server";

import { deleteCurrentUser } from "@/edgedb/user";
import { revalidatePath } from "next/cache";
import { createFormAction } from "react-form-action";

export const deleteUser = createFormAction<string>(
  ({ success, failure }) =>
    async () => {
      try {
        await deleteCurrentUser();

        revalidatePath("/");
        return success("Your account has been deleted.");
      } catch {
        return failure("Failed to delete account.");
      }
    },
);
