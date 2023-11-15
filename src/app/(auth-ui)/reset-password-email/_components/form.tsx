"use client";
import Link from "next/link";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";
import { resetPasswordEmail } from "@/app/actions/auth";
import { Alert } from "flowbite-react";

export function ResetPasswordEmailForm() {
  return (
    <Form action={resetPasswordEmail} initialData="">
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
              htmlFor="email"
              color={
                isFailure && error.validation && error.messages?.email
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
            >
              Email
            </Label>
            <TextInput
              id="email"
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
          <SubmitButton />
          <Label>
            Go back to&nbsp;
            <Link
              href="/signin"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign in
            </Link>
          </Label>
        </div>
      )}
    </Form>
  );
}
