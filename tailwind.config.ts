import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { variable } from "./src/styles/font/variable";

export default {
  content: ["./src/**/*.tsx", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: [`var(${variable})`, ...fontFamily.sans],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
