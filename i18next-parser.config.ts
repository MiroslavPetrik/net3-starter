import { type UserConfig } from "i18next-parser";
import { languages } from "@/i18n/options";

export default {
  locales: [...languages], // type fix readonly => mutable
  input: ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}"],
  output: "src/i18n/$LOCALE/$NAMESPACE.json",
  sort: true,
  verbose: true,
  lexers: {
    tsx: [
      {
        lexer: "JsxLexer",
        // See file /src/i18n/castString.ts
        transIdentityFunctionsToIgnore: ["castString"],
      },
    ],
  },
} satisfies UserConfig;
