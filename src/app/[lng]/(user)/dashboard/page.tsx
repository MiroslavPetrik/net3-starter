import { selectCurrentUser } from "@/edgedb/user";
import { type Params } from "@/types";
import { redirect } from "next/navigation";

export default async function Dashboard({ params: { lng } }: Params) {
  const user = await selectCurrentUser();

  if (!user) {
    redirect("/onboarding");
  }

  return (
    <div className="pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Welcome {user.name}
      </h1>
    </div>
  );
}
