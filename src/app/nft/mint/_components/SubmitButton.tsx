import { Button } from "@/components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      className="font-semibold"
    >
      Create
    </Button>
  );
};

export default SubmitButton;
