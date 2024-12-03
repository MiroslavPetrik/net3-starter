import { createTRPCClient, loggerLink, TRPCClientError } from "@trpc/client";
import { cookies } from "next/headers";
import { cache } from "react";
import { observable } from "@trpc/server/observable";
import { type AppRouter, appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { callTRPCProcedure } from "@trpc/server";
import { type TRPCErrorResponse } from "@trpc/server/rpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const cookie = await cookies();

  return createTRPCContext({
    headers: new Headers({
      cookie: cookie.toString(),
      "x-trpc-source": "rsc",
    }),
  });
});

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callTRPCProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                getRawInput: async () => op.input,
                ctx,
                type: op.type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
