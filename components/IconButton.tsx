import React, { ButtonHTMLAttributes } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const IconButton = ({ children, loading, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className=" 
        relative p-2 grid place-items-center rounded-full hover:bg-gray-500/30 transition-colors duration-200 ease-in-out
        disabled:cursor-not-allowed 
        "
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
