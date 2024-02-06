import e from "@/edgeql-js";

export const selectCurrentUserQuery = e.select(
  e.global.current_user,
  (user) => ({
    ...e.User["*"],
    email: e.assert_single(
      e.select(e.ext.auth.EmailFactor, ({ email, verified_at, identity }) => ({
        address: email,
        verifiedAt: verified_at,
        filter: e.op(identity, "=", user.identity),
      })),
    ),
  }),
);

export const insertUserQuery = e.params({ name: e.str }, ({ name }) =>
  e.insert(e.User, { name, identity: e.global.identity }),
);

export const updateCurrentUserQuery = e.params({ name: e.str }, ({ name }) =>
  e.assert_single(
    e.update(e.User, (user) => ({
      filter: e.op(user.id, "=", e.global.current_user.id),
      set: { name },
    })),
  ),
);

export const deleteCurrentUserQuery = e.delete(e.User, (user) => ({
  filter: e.op(user.id, "=", e.global.current_user.id),
}));
