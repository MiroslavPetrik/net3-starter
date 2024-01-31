"use server";
import type { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/sidebar";

export default async function Profile({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1">
      <div className="w-auto flex-none">
        <SettingsSidebar />
      </div>
      <div className="flex-1 p-16">{children}</div>
    </div>
  );
}
