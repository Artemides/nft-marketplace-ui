import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";

type LayoutProps = PropsWithChildren & {
  className: string;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
