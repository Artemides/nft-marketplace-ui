import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { config } from "../../config";
import { ReactNode, createContext } from "react";
import { alchemy } from "../../alchemy.config";
export const AlchemyContext = createContext<Alchemy | undefined>(undefined);

export const AlchemyProvider = ({ children }: { children: ReactNode }) => {
  return <AlchemyContext.Provider value={alchemy}>{children}</AlchemyContext.Provider>;
};
