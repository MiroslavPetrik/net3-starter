"use client";
import { deleteUser } from "@/app/actions";
import { Button } from "flowbite-react";
import { Form } from "react-form-action/client";

export function DeleteUser() {
  return (
    <Form action={deleteUser} initialData="">
      {({ data, isSuccess, isPending }) => (
        <>
          {isSuccess && <label>{data}</label>}
          <Button color="failure" type="submit" disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </>
      )}
    </Form>
  );
}
