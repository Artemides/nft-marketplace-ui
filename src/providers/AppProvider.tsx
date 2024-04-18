"use client";

import React, { ReactNode } from "react";
import Wagmi from "./Wagmi";
import { SessionProvider } from "next-auth/react";
import ToasterProvider from "./ToasterProvider";
import { AlchemyProvider } from "./AlchemyProvider";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Wagmi>
      <SessionProvider>
        <ToasterProvider />
        <AlchemyProvider>{children}</AlchemyProvider>
      </SessionProvider>
    </Wagmi>
  );
};

export default AppProvider;
