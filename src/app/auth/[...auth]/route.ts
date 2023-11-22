import { redirect } from "next/navigation";
import { auth } from "@/edgedb";

const { GET, POST } = auth.createAuthRouteHandlers({
  onBuiltinUICallback({ error, tokenData, isSignUp }) {
    console.info("builin callback");
    if (!error) {
      if (isSignUp) {
        if (!tokenData) {
          redirect("/verify-your-email");
        }
        redirect("/onboarding"); // signup with email verification turned off
      } else {
        console.info("builin signin ");
        redirect("/"); // sign in
      }
    }

    console.log("builin callback error", error);
    // TODO: create 404 page
    redirect("/404");
  },
  onSignout() {
    redirect("/");
  },
});

export { GET, POST };
