"use client";
import { updateUser } from "@/app/actions/";
import { SubmitButton } from "@/app/_components/submit-button";
import { Label, TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";

export function UpdateUser() {
  return (
    <Form action={updateUser} initialData="" className="flex flex-col gap-2">
      {({ error, isFailure, isSuccess, isPending }) => (
        <div className="flex flex-col gap-4">
          <div>
            <Label>Name</Label>
            <TextInput
              id="name"
              name="name"
              disabled={isPending}
              color={isFailure ? "failure" : isSuccess ? "success" : undefined}
              type="text"
              placeholder="New name"
              helperText={isFailure ? error : undefined}
            />
          </div>
          <SubmitButton />
        </div>
      )}
    </Form>
  );
}
