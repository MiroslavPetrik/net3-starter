import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { selectCurrentUserQuery } from "@/edgedb/queries";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getCurrent: protectedProcedure.query(({ ctx: { e, session } }) => {
    return selectCurrentUserQuery.run(session.client);
  }),
});
