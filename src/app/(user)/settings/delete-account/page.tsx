"use server";

import { PageHeader } from "@/app/_components/page-header";
import { DeleteUser } from "./_components/delete-user";

export default async function DeleteAccount() {
  return (
    <>
      <PageHeader>Delete Account</PageHeader>
      <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
        Your user data will be removed. This cannot be undone.
      </p>
      <DeleteUser />
    </>
  );
}
