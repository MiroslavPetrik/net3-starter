import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getCurrent: protectedProcedure.query(({ ctx: { e, session } }) => {
    return e
      .select(e.global.current_user, () => ({
        ...e.User["*"],
      }))
      .run(session.client);
  }),
});
