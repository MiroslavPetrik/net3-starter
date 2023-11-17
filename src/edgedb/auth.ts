import createAuth from "@edgedb/auth-nextjs";
import { client } from "./client";

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3000",
  passwordResetUrl: "/reset-password",
});
