"use client";

import React, { ReactNode } from "react";
import Wagmi from "./Wagmi";
import ToasterProvider from "../../old/providers/ToasterProvider";
import { SessionProvider } from "next-auth/react";

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
