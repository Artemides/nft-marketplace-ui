import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { ZodError } from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const parseZodErrors = <T>(error: ZodError): Record<keyof T, string> => {
  const flatten = error.flatten().fieldErrors;
  let formatedErrors: Record<keyof T, string> = {} as Record<keyof T, string>;
  Object.keys(flatten).forEach((key) => {
    if (flatten[key]) {
      formatedErrors[key as keyof T] = flatten[key]!.join(", ");
    }
  });

  return formatedErrors;
};
