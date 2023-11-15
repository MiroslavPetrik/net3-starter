"use client";
import Link from "next/link";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { signin } from "@/app/actions/auth";
import { Alert } from "flowbite-react";

export function SignInForm() {
  return (
    <Form action={signin} initialData="">
      {({ error, isFailure, isSuccess, isPending }) => (
        <div className="flex flex-col gap-4">
          {isFailure && !error.validation && (
            <div>
              <Alert color="failure">{error.message}</Alert>
            </div>
          )}
          <div>
            <Label>Email</Label>
            <TextInput
              name="email"
              disabled={isPending}
              color={
                isFailure && error.validation && error.messages?.email
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              type="text"
              placeholder="hello@net3.app"
              helperText={error?.messages?.email}
            />
          </div>
          <div>
            <Label>Password</Label>
            <TextInput
              name="password"
              disabled={isPending}
              color={
                isFailure && error.validation && error.messages?.password
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              type="password"
              placeholder="Your password"
              helperText={error?.messages?.password}
            />
          </div>
          <SubmitButton />
          <Label>
            Don&apos;t have an account?&nbsp;
            <Link
              href="/signup"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign up
            </Link>
          </Label>
        </div>
      )}
    </Form>
  );
}
