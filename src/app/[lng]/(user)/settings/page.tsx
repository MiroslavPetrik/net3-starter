"use server";

import { redirect } from "next/navigation";

export default async function SettingsDefaultRoute() {
  redirect("/settings/profile");
}
