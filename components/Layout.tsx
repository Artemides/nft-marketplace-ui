import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { twMerge } from "tailwind-merge";

type LayoutProps = PropsWithChildren & {
  className?: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={twMerge(
        "bg-gradient-to-b from-black to-[#090618] text-white",
        className
      )}
    >
      <Navbar />
      <main className="min-h-[calc(100vh-72px)] ">{children}</main>
    </div>
  );
};
