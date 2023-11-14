import { CreateUser } from "@/app/onboarding/_components/create-user";

import { redirect } from "next/navigation";
import { selectCurrentUser } from "@/edgedb/user";

export default async function Onboarding() {
  const user = await selectCurrentUser();
  
  if (user) redirect("/");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <h1 className="mb-4 text-6xl font-extrabold tracking-tight">
        Onboarding
      </h1>
      <h2 className="mb-6 text-xl">
        Please enter your details so we can create your account.
      </h2>
      <div className="w-full max-w-xs">
        <CreateUser />
      </div>
    </main>
  );
}
