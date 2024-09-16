import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { variable } from "./src/styles/font/variable";
import * as flowbite from "flowbite-react/tailwind";

export default {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  content: ["./src/**/*.tsx", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(${variable})`, ...fontFamily.sans],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  plugins: [flowbite.plugin()],
} satisfies Config;
