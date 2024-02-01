import { type languages } from "./options";

export type LanguageParam = { lng: string };

export type Languages = (typeof languages)[number];
