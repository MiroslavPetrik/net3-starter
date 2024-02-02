import type { PropsWithChildren } from "react";
import { auth } from "@/edgedb";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = auth.getSession();
  const isSignedIn = await session.isSignedIn();

  if (isSignedIn) redirect("/dashboard");

  return (
    <div className="flex flex-1 justify-center bg-gray-200">
      <main className="my-auto h-min w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        {children}
      </main>
    </div>
  );
}
