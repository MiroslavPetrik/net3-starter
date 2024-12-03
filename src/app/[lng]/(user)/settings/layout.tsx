"use server";
import type { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/sidebar";
import { type Params } from "@/types";

export default async function Profile({
  children,
  params,
}: PropsWithChildren<Params>) {
  const { lng } = await params;
  return (
    <div className="flex flex-1">
      <div className="w-auto flex-none">
        <SettingsSidebar lng={lng} />
      </div>
      <div className="flex-1 p-16">{children}</div>
    </div>
  );
}
