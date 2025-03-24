import type { PropsWithChildren } from "react";
import { authorizedSession } from "@/gel";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: PropsWithChildren) {
  if (await authorizedSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 justify-center bg-gray-200">
      <main className="my-auto h-min w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        {children}
      </main>
    </div>
  );
}
