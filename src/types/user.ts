import { type RouterOutputs } from "@/trpc/shared";

export type User = Exclude<RouterOutputs["user"]["getCurrent"], null>;
