import { type PropsWithChildren } from "react";

export const Heading = ({ children }: PropsWithChildren) => (
  <h1 className="text-4xl font-extrabold tracking-tight">{children}</h1>
);
