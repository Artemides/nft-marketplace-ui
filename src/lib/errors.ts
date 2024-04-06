import { ActionState } from "@/types/actions";
import { parseZodErrors } from "@/utils/utils";
import { ZodError } from "zod";

export const handleActionError = <F>(error: unknown): ActionState<F> => {
  if (error instanceof ZodError) {
    return {
      status: "error",
      formError: parseZodErrors<F>(error),
    };
  }
  if (error instanceof Error) {
    return {
      status: "error",
      errors: error.message,
    };
  }

  return {
    status: "error",
    errors: "Internal Server Error",
  };
};
