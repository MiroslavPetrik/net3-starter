import { auth } from ".";

import { selectCurrentUserQuery, deleteCurrentUserQuery } from "./queries/user";

export const selectCurrentUser = () =>
  selectCurrentUserQuery.run(auth.getSession().client);

export const deleteCurrentUser = () =>
  deleteCurrentUserQuery.run(auth.getSession().client);
