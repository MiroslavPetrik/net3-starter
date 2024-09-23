import { Inter } from "next/font/google";
import { type variable } from "./variable";

export const font = Inter({
  subsets: ["latin"],
  // Font loader values must be explicitly written literals
  // so we use type to match exact value
  variable: "--font-sans" satisfies typeof variable,
});
