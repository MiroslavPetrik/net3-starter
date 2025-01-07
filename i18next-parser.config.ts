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
        /**
         * We use custom translate (import { translate } from "@/i18n") function.
         * The "useTranslation" (as async function) cannot be used in server components,
         * because Next.js will complain that hooks are allowed only in client components.
         */
        namespaceFunctions: ["useTranslation", "translate"],
      },
    ],
  },
} satisfies UserConfig;
