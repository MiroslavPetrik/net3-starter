import { createNextEdgeAuth } from "@/auth/next/edge";
import { env } from "@/env.mjs";
import { createHttpClient } from "edgedb";

export const client = createHttpClient({
  dsn: env.EDGEDB_DSN,
  // Note: when developing locally you will need to set tls  security to insecure,
  // because the development server uses  self-signed certificates which will cause api calls with  the fetch api to fail.
  tlsSecurity: "insecure",
});

export const auth = createNextEdgeAuth(client, {
  baseUrl: "http://localhost:3000",
});
