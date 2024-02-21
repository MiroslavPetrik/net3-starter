"use client";

import { NavbarLink } from "flowbite-react";
import Link from "next/link";
import { type LanguageParam } from "@/i18n";
import { useLngPathname } from "@/i18n/client";

export type NavLink = {
  name: string;
  href: string;
};

export const NavbarLinks = ({
  links,
  lng,
}: { links: NavLink[] } & LanguageParam) => {
  const pathname = useLngPathname(lng);

  return (
    <>
      {links.map(({ name, href }) => (
        <NavbarLink
          key={href}
          as={Link}
          href={href}
          active={pathname?.startsWith(href)}
        >
          {name}
        </NavbarLink>
      ))}
    </>
  );
};
