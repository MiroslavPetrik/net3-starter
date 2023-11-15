import { useFormStatus } from "react-dom";
import { Button } from "flowbite-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isProcessing={pending} disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
