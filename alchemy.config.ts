import { Alchemy, AlchemySettings, Network } from "alchemy-sdk";
import { config } from "./config";

const settings: AlchemySettings = {
  apiKey: config.alchemyApiKey,
  network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(settings);
