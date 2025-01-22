import type { LanguageParam } from "@/i18n/types";

export type Params<T extends Record<string, unknown> = Record<string, never>> =
  {
    params: Promise<LanguageParam & T>;
  };

export type SearchParams<T extends string> = {
  searchParams: Promise<{ [key in T]: string | string[] | undefined }>;
};

export type AwaitedSearchParams<T extends SearchParams<string>> = Awaited<
  T["searchParams"]
>;

/**
 * Reads the first value of a search param
 * @param searchParams as returned from (await searchParams)
 * @param key the key of the search param
 * @returns
 */
export function getSearchParam<
  TKey extends string,
  TParams extends SearchParams<TKey>,
>(searchParams: AwaitedSearchParams<TParams>, key: TKey) {
  const value = searchParams[key];

  return {
    [key]:
      typeof value === "object"
        ? value[0]
        : typeof value === "string"
          ? value
          : undefined,
  };
}
