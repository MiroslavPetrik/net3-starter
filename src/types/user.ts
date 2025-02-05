import { type RouterOutputs } from "@/trpc/shared";

export type User = Exclude<RouterOutputs["user"]["getCurrentUser"], null>;

export type UserEmail = Exclude<User["email"], null>;
