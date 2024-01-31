"use server";
import Link from "next/link";
import { auth } from "@/edgedb/edge";
import { Button } from "flowbite-react";

export const SignOutButton = () => (
  <Link href={auth.getSignoutUrl()}>
    <Button>Sign Out</Button>
  </Link>
);
