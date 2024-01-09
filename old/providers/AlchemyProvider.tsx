import React, { ReactNode } from "react";
import { AlchemyContext } from "../contexts/AlchemyContext";
import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { config } from "../config";

const settings: AlchemySettings = {
  apiKey: config.alchemyApiKey,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);
const AlchemyProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AlchemyContext.Provider value={alchemy}>
      {children}
    </AlchemyContext.Provider>
  );
};

export default AlchemyProvider;
