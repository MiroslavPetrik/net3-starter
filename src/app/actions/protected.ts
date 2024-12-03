import { formAction } from "react-form-action";
import { auth } from "@/edgedb";

export const protectedAction = formAction.use(async () => {
  const session = await auth.getSession();
  const isSignedIn = await session.isSignedIn();

  if (!isSignedIn) {
    throw new Error("Unauthorized");
  }

  return { session };
});
