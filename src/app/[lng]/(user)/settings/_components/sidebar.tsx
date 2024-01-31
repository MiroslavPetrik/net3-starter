"use client";
import {
  Sidebar,
  SidebarItem,
  SidebarItems,
  SidebarItemGroup,
} from "@/app/_components/sidebar";
import { usePathname } from "next/navigation";

export const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarItems>
        <SidebarItemGroup>
          <SidebarItem
            href="/settings/profile"
            active={pathname.startsWith("/settings/profile")}
          >
            User Profile
          </SidebarItem>
          <SidebarItem
            href="/settings/delete-account"
            active={pathname.startsWith("/settings/delete-accoun")}
          >
            Delete Account
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
};
