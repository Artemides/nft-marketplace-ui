import { useField } from "formik";
import React from "react";
import { twMerge } from "tailwind-merge";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
};

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  const [field] = useField(props.name || "input");
  return (
    <div className={label ? "space-y-2" : ""}>
      <label htmlFor={props.id || props.name} className="font-semibold">
        {label}
      </label>
      <input
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

export default Input;
