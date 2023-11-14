import { type PropsWithChildren } from "react";

export const PageHeader = ({ children }: PropsWithChildren) => (
  <>
    <h1 className="text-4xl font-extrabold tracking-tight">{children}</h1>
    <hr className="mt-4 pb-4" />
  </>
);
