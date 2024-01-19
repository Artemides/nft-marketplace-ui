"use client";

import { NFTPinataResponse } from "@/types/types";
import { ReactNode, createContext, useState } from "react";

type MintingContext = {
  pinataResponse: NFTPinataResponse | null;
  setPinataResponse: (response: NFTPinataResponse) => void;
};

export const MintingContext = createContext<MintingContext | null>(null);

export const MintingProvider = ({ children }: { children: ReactNode }) => {
  const [pinataResponse, setPinataResponse] =
    useState<NFTPinataResponse | null>(null);

  return (
    <MintingContext.Provider value={{ pinataResponse, setPinataResponse }}>
      {children}
    </MintingContext.Provider>
  );
};
