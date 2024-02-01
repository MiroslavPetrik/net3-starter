"use client";
import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export const SettingsSidebar = () => {
  const pathname = usePathname();
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
