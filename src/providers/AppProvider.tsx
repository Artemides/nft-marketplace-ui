"use client";

import React, { ReactNode } from "react";
import Wagmi from "./Wagmi";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "./ToasterProvider";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Wagmi>
      <SessionProvider>
        <ToasterProvider />
        {children}
      </SessionProvider>
    </Wagmi>
  );
};

export default AppProvider;
