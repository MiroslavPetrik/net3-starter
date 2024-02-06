import { auth } from ".";

import {
  selectCurrentUserQuery,
  updateCurrentUserQuery,
  deleteCurrentUserQuery,
} from "./queries/user";

export const selectCurrentUser = () =>
  selectCurrentUserQuery.run(auth.getSession().client);

export const updateCurrentUser = (name: string) =>
  updateCurrentUserQuery.run(auth.getSession().client, { name });

export const deleteCurrentUser = () =>
  deleteCurrentUserQuery.run(auth.getSession().client);
