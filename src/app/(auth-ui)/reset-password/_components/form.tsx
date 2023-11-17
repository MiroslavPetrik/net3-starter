"use client";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { resetPassword } from "@/app/actions/auth";
import { Alert } from "flowbite-react";
import Link from "next/link";

export function ResetPasswordForm() {
  return (
    <Form action={resetPassword} initialData="">
      {({ error, data, isFailure, isSuccess, isPending }) => (
        <div className="flex flex-col gap-4">
          {isSuccess && (
            <div>
              <Alert color="success">{data}</Alert>
            </div>
          )}
          {isFailure && !error.validation && (
            <div>
              <Alert color="failure">{error.message}</Alert>
            </div>
          )}
          <div>
            <Label
              htmlFor="password"
              color={
                isFailure && error.validation && error.messages?.password
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
            >
              New Password
            </Label>
            <TextInput
              id="password"
              name="password"
              type="password"
              disabled={isPending}
              color={
                isFailure && error.validation && error.messages?.password
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              helperText={error?.messages?.password}
            />
          </div>
          <SubmitButton />
          <Label>
            Link expired?&nbsp;
            <Link
              href="/reset-password-email"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Get another.
            </Link>
          </Label>
        </div>
      )}
    </Form>
  );
}
