import { withUser } from "@/guards/withUser";

export default withUser(async function Dashboard({ user }) {
  return (
    <div className="pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight">
        Welcome {user.name}
      </h1>
    </div>
  );
});
