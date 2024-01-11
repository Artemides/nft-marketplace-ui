import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { twMerge } from "tailwind-merge";

type HeaderProps = PropsWithChildren & {
  className?: string;
};

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <div
      className={twMerge(
        "bg-gradient-to-b from-black to-[#090618] text-white",
        className
      )}
    >
      <Navbar />
      {children}
    </div>
  );
};
