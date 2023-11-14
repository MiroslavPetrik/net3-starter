"use server";
import { PageHeader } from "@/app/_components/page-header";
import { UpdateUser } from "./_components/update-user";

export default async function Profile() {
  return (
    <>
      <PageHeader>Edit Profile</PageHeader>
      <div className="w-full max-w-xs">
        <UpdateUser />
      </div>
    </>
  );
}
