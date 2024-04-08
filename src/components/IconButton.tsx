import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const IconButton = ({
  children,
  loading,
  onClick,
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={twMerge(
        `
      relative p-2 grid place-items-center rounded-md transition duration-200 ease-in-out hover:opacity-80
      disabled:cursor-not-allowed`,
        className
      )}
    >
      {loading && (
        <div
          id="spinner-loader"
          className="absolute z-10 bottom-0 right-0 w-4 h-4 animate-spin border-x-green-500 border-green-500/50 rounded-full border-[4px] border-solid"
        ></div>
      )}
      {children}
    </button>
  );
};
