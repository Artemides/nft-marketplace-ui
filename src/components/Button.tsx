import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
};

const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        "px-6 py-3 rounded-md font-medium bg-white text-black hover:opacity-90 transition ",
        className
      )}
    >
      {text}
    </button>
  );
};

export default Button;
