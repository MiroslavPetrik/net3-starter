import { type RouterOutputs } from "@/trpc/shared";

export type PageProps = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};

export type User = Exclude<RouterOutputs["user"]["getCurrent"], null>;
