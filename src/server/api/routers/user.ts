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
      .select(e.global.current_user, (user) => ({
        ...e.User["*"],
        email: e.assert_single(
          e.select(
            e.ext.auth.EmailFactor,
            ({ email, verified_at, identity }) => ({
              address: email,
              verifiedAt: verified_at,
              filter: e.op(identity, "=", user.identity),
            }),
          ),
        ),
      }))
      .run(session.client);
  }),
});
