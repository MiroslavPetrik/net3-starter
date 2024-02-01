"use client";
import { LanguageParam } from "@/i18n";
import { useLngPathname } from "@/i18n/client";
import type { User } from "@/types";
import {
  Avatar,
  Navbar as BaseNavbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

export function Navbar({
  lng,
  user,
  signOutButton,
}: {
  user: User;
  signOutButton: ReactNode;
} & LanguageParam) {
  const pathname = useLngPathname(lng);
  const { t } = useTranslation("global");

  return (
    <BaseNavbar
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
          {t("dashboard")}
        </NavbarLink>
        <NavbarLink href="/settings" active={pathname.startsWith("/settings")}>
          {t("settings")}
        </NavbarLink>
      </NavbarCollapse>
    </BaseNavbar>
  );
}
