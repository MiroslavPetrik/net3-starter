import { type CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { type PropsWithChildren } from "react";

// Set custom styles for flowbite components
const theme: CustomFlowbiteTheme = {};

export function FlowbiteTheme({ children }: PropsWithChildren) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
}
