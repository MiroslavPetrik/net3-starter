/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    // TODO(./dbschema/edgeql-js/hydrate.ts:119:15)
    ignoreBuildErrors: true,
  },
};

export default config;
