import { auth } from ".";

import { selectCurrentUserQuery } from "./queries/user";

export const selectCurrentUser = () =>
  selectCurrentUserQuery.run(auth.getSession().client);
