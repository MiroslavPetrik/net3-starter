import { type languages } from "./options";

export type Languages = (typeof languages)[number];

export type LanguageParam = { lng: Languages };
