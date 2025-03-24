import { redirect } from "next/navigation";
import { auth } from "@/gel";

const { GET, POST } = auth.createAuthRouteHandlers({
  onEmailVerify({ error }) {
    if (error) {
      // TODO: handle error
      redirect("/");
    } else {
      redirect("/settings/email");
    }
  },
  onSignout() {
    redirect("/");
  },
});

export { GET, POST };
