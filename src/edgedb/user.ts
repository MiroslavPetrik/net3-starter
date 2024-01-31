import { auth } from ".";

import {
  selectCurrentUserQuery,
  insertUserQuery,
  updateCurrentUserQuery,
  deleteCurrentUserQuery,
} from "./queries/user";

export const selectCurrentUser = () =>
  selectCurrentUserQuery.run(auth.getSession().client);

export const insertUser = (name: string) =>
  insertUserQuery.run(auth.getSession().client, { name });

export const updateCurrentUser = (name: string) =>
  updateCurrentUserQuery.run(auth.getSession().client, { name });

export const deleteCurrentUser = () =>
  deleteCurrentUserQuery.run(auth.getSession().client);
