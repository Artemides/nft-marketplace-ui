import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { config } from "../../config";
import { ReactNode, createContext } from "react";
export const AlchemyContext = createContext<Alchemy | undefined>(undefined);

const settings: AlchemySettings = {
  apiKey: config.alchemyApiKey,
  network: Network.ETH_SEPOLIA,
};
export const AlchemyProvider = ({ children }: { children: ReactNode }) => {
  const alchemy = new Alchemy(settings);
  return <AlchemyContext.Provider value={alchemy}>{children}</AlchemyContext.Provider>;
};
