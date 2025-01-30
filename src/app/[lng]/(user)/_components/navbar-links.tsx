"use client";

import { NavbarLink } from "flowbite-react";
import Link from "next/link";
import { type LanguageParam } from "@/i18n";
import { useLngPathname } from "@/i18n/use-lng-pathname";

export type NavLink = {
  name: string;
  href: string;
};

type Props = { links: NavLink[] } & LanguageParam;

export const NavbarLinks = ({ links, lng }: Props) => {
  const pathname = useLngPathname(lng);

  return (
    <>
      {links.map(({ name, href }) => (
        <NavbarLink
          key={href}
          as={Link}
          href={href}
          active={pathname.startsWith(href)}
        >
          {name}
        </NavbarLink>
      ))}
    </>
  );
};
