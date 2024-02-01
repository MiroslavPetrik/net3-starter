"use client";
import type { LanguageParam } from "@/i18n";
import { useLngPathname } from "@/i18n/client";
import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from "flowbite-react";
import { useTranslation } from "react-i18next";

export const SettingsSidebar = ({ lng }: LanguageParam) => {
  const pathname = useLngPathname(lng);
  const { t } = useTranslation("settings");

  return (
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="/settings/profile"
            active={pathname.startsWith("/settings/profile")}
          >
            {t("editProfile.title")}
          </SidebarItem>
          <SidebarItem
            href="/settings/delete-account"
            active={pathname.startsWith("/settings/delete-accoun")}
          >
            {t("deleteAccount.title")}
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
