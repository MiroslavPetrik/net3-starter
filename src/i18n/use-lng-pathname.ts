import { usePathname } from "next/navigation";
import type { Languages } from "./types";

export function useLngPathname(lng: Languages) {
  const pathname = usePathname();

  if (!pathname) {
    throw new Error(
      "The useLngPathname() hook must be used within the Next.js App Router.",
    );
  }

  const prefix = getPathnamePrefix(pathname, lng);

  if (!prefix) {
    return pathname;
  }

  return pathname.slice(prefix.length) || "/";
}

function getPathnamePrefix(pathname: string, lng: Languages) {
  const prefix = `/${lng}` as const;

  if (pathname.startsWith(`${prefix}/`) || pathname === prefix) {
    return prefix;
  } else {
    return null;
  }
}
