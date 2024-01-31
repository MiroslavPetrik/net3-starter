import { PageHeader } from "@/app/_components/page-header";
import { UpdateUser } from "./_components/update-user";

import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await api.user.getCurrent.query();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <PageHeader>Edit Profile</PageHeader>
      <div className="w-full max-w-xs">
        <UpdateUser user={user} />
      </div>
    </>
  );
}
