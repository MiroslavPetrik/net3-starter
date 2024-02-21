import React from "react";
import type { Preview } from "@storybook/react";
import { FlowbiteTheme } from "../src/app/_components/flowbite-theme";
import "../src/styles/globals.css";

// TODO: Using next/font/google is broken
// TODO: remove preview-head.html once this works
// import {font} from "../src/styles/font"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      // https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/#nextnavigation
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="inter-temp-font">
        <Story />
      </div>
    ),
    (Story) => (
      <FlowbiteTheme>
        <Story />
      </FlowbiteTheme>
    ),
  ],
};

export default preview;
