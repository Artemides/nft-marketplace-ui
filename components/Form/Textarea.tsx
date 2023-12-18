import { useField } from "formik";
import React from "react";
import { twMerge } from "tailwind-merge";

type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
};

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  const [field] = useField(props.name || "textarea");
  return (
    <div className="space-y-2">
      <label htmlFor={props.id || props.name} className="font-semibold">
        {label}
      </label>
      <textarea
        {...field}
        {...props}
        className={twMerge(
          `w-full px-2 py-2 rounded-md bg-transparent ring-1 ring-[#424242] focus:outline-none`,
          props.className
        )}
      />
    </div>
  );
};

export default Textarea;
