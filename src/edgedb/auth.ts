import createAuth from "@edgedb/auth-nextjs/app";
import { client } from "./client";

export const auth = createAuth(client, {
  baseUrl: "http://localhost:3000",
  passwordResetPath: "/reset-password",
});
