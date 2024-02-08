import type { PropsWithChildren } from "react";

export const Stack = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col gap-4">{children}</div>
);
