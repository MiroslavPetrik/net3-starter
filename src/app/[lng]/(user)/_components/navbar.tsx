"use client";
import { User } from "@/types/user";
import {
  Avatar,
  Navbar as FlowbiteNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

export function Navbar({
  user,
  signOutButton,
}: {
  user: User;
  signOutButton: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <FlowbiteNavbar
      fluid
      rounded
      className="sticky start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
    >
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          NET3 Starter
        </span>
      </NavbarBrand>
      <div className="flex space-x-4 md:order-2">
        <div className="flex items-center space-x-4">
          <Avatar rounded />
          <span className="font-semibold text-gray-900 hover:text-gray-900">
            {user.name}
          </span>
        </div>
        {signOutButton}
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        <NavbarLink
          href="/dashboard"
          active={pathname.startsWith("/dashboard")}
        >
          Dashboard
        </NavbarLink>
        <NavbarLink href="/settings" active={pathname.startsWith("/settings")}>
          Settings
        </NavbarLink>
      </NavbarCollapse>
    </FlowbiteNavbar>
  );
}
