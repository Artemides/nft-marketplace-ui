import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { createContext } from "react";

export const AlchemyContext = createContext<Alchemy | null>(null);
