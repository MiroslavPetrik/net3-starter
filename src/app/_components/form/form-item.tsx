import type { PropsWithChildren } from "react";

export const FormItem = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={className}>{children}</div>
);
