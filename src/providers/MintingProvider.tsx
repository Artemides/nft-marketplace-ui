"use client";

import { NFTPinataResponse } from "@/types/types";
import { ReactNode, createContext, useState } from "react";

type MintingContext = {
  pinataResponse: NFTPinataResponse | null;
  setPinataResponse: (response: NFTPinataResponse) => void;
  nftImage: File | null;
  setNftImage: (image: File | null) => void;
};

export const MintingContext = createContext<MintingContext | null>(null);

export const MintingProvider = ({ children }: { children: ReactNode }) => {
  const [pinataResponse, setPinataResponse] =
    useState<NFTPinataResponse | null>(null);
  const [nftImage, setNftImage] = useState<File | null>(null);
  return (
    <MintingContext.Provider
      value={{ pinataResponse, setPinataResponse, nftImage, setNftImage }}
    >
      {children}
    </MintingContext.Provider>
  );
};
