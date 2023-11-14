import { type ReactNode } from "react";
import { redirect } from "next/navigation";

import { selectCurrentUser } from "@/edgedb/user";

type Props = Record<string, unknown>;

type RSC<P extends Props> = (props: P & WithUserProps) => ReactNode;

type User = Exclude<Awaited<ReturnType<typeof selectCurrentUser>>, null>;

export type WithUserProps = {
  user: User;
};

export function withUser<P extends Props>(page: RSC<P>) {
  return async function (props: P) {
    const user = await selectCurrentUser();

    if (user) {
      return page({ ...props, user }) as JSX.Element;
    } else {
      redirect("/onboarding");
    }
  };
}
