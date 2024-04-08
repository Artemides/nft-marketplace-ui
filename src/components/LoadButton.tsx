import React, { ButtonHTMLAttributes } from "react";

type LoadButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const LoadButton = ({
  children,
  loading,
  onClick,
  className,
}: LoadButtonProps) => {
  return (
    <button onClick={onClick} disabled={loading} className={className}>
      {loading && (
        <div className=" z-10 bottom-1/2 right-1/2 w-6 h-6 animate-spin border-x-stone-500 border-stone-500/50 rounded-full border-[4px] border-solid"></div>
      )}
      {!loading && children}
    </button>
  );
};
