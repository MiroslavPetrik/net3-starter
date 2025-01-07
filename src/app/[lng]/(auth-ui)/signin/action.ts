"use server";

import { authAction, actions } from "@/edgedb";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const signIn = authAction
  .input(signInSchema)
  .run(async ({ input, ctx: { t } }) => {
    /**
     * This sets auth cookie, and toggles the session.isSignedIn().
     * So the AuthLayout will redirect the user to dashboard.
     */
    await actions.emailPasswordSignIn(input);

    /**
     * The AuthLayout redirect effectivelly makes this message useless,
     * as there is no time to render it.
     * Such message can be rendered, by shifting the routing responsibility to the client.
     */
    return t("signIn.success");
  });
