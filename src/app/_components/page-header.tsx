import { type PropsWithChildren } from "react";
import { Heading } from "./heading";
import { Separator } from "./separator";

export const PageHeader = ({ children }: PropsWithChildren) => (
  <>
    <Heading>{children}</Heading>
    <Separator />
  </>
);
