import type { Meta, StoryObj } from "@storybook/react";

import { Navbar } from "./navbar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    lng: "en",
    user: {
      id: "1",
      name: "Demo",
      email: {
        address: "demo@net3-app.com",
        verifiedAt: null,
      },
    },
  },
};
