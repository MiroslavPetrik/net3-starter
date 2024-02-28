import createAuth from "@edgedb/auth-nextjs/app";
import { client } from "./client";
import { getBaseUrl } from "@/server/baseUrl";

export const auth = createAuth(client, {
  baseUrl: getBaseUrl(),
  passwordResetPath: "/reset-password",
});
