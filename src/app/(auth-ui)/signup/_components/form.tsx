"use client";

import { signup } from "@/app/actions/auth";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { Form } from "react-form-action/client";

export function SignUpForm() {
  return (
    <Form action={signup} initialData="">
      {({ isPending, error, data, isFailure, isSuccess }) => (
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
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="name@net3.com"
              required
              shadow
              color={
                isFailure && error.validation && error.messages?.email
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              helperText={error?.messages?.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              required
              shadow
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="passwordRepeat" value="Repeat password" />
            </div>
            <TextInput
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              required
              shadow
              color={
                isFailure && error.validation && error.messages?.passwordRepeat
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
              helperText={error?.messages?.passwordRepeat}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="tos"
              name="tos"
              color={
                isFailure && error.validation && error.messages?.tos
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
            />
            <Label
              htmlFor="tos"
              className="flex"
              color={
                isFailure && error.validation && error.messages?.tos
                  ? "failure"
                  : isSuccess
                  ? "success"
                  : undefined
              }
            >
              I agree with the&nbsp;
              <Link
                href="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit" disabled={isPending} isProcessing={isPending}>
            Register new account
          </Button>
        </div>
      )}
    </Form>
  );
}
