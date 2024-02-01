import { makeZodI18nMap, type ZodI18nMapOption } from "zod-i18n-map";
import { z } from "zod";

// custom namespace
export const zodErrorNameSpace = "zodError" as const;

// fake t, so i18n parser will extract the keys
export function t(key: `${typeof zodErrorNameSpace}:${string}`) {
  return key;
}

export function setZodErrorMap({ t }: ZodI18nMapOption) {
  z.setErrorMap(makeZodI18nMap({ t, ns: ["zod", zodErrorNameSpace] }));
}
