import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  features: {
    // https://storybook.js.org/blog/storybook-react-server-components/#getting-async-with-it
    experimentalRSC: true,
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
  },
};

export default config;
