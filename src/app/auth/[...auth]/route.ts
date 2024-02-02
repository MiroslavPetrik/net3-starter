import { redirect } from "next/navigation";
import { auth } from "@/edgedb";

const { GET, POST } = auth.createAuthRouteHandlers({
  onEmailVerify({ error, verificationToken, tokenData }) {
    if (error) {
      console.log({ error });
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
