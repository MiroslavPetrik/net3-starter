import type { LanguageParam } from "@/i18n/types";

export type Params<T extends Record<string, unknown> = Record<string, never>> =
  {
    params: Promise<LanguageParam & T>;
  };
