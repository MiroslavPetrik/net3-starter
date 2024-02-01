"use server";
import Link from "next/link";
import { auth } from "@/edgedb/edge";
import { Button } from "flowbite-react";
import { type PropsWithChildren } from "react";

export const SignOutButton = ({ children = "Sign Out" }: PropsWithChildren) => (
  <Link href={auth.getSignoutUrl()}>
    <Button>{children}</Button>
  </Link>
);
