"use client";
import { createUser } from "@/app/actions";
import { SubmitButton } from "../../_components/submit-button";
import { Label } from "flowbite-react";
import { TextInput } from "flowbite-react";
import { Form } from "react-form-action/client";

const initialState = {
  message: "Please insert your name.",
};
export function CreateUser() {
  return (
    <Form
      action={createUser}
      initialData={initialState}
      className="flex flex-col gap-2"
    >
      {({ error, isFailure }) => (
        <div className="flex flex-col gap-4">
          <div>
            <Label
              htmlFor="name"
              value="Your name"
              color={isFailure ? "failure" : undefined}
            />
            <TextInput
              id="name"
              required
              color={isFailure ? "failure" : undefined}
              name="name"
              type="text"
              placeholder="Patrick"
              helperText={error?.message}
            />
          </div>

          <SubmitButton />
        </div>
      )}
    </Form>
  );
}
