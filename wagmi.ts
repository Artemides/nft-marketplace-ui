import { http, createConfig } from "wagmi";
import { hardhat, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { config } from "./config";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, hardhat],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(config.sepoliaRpcUrl),
    [hardhat.id]: http("http://127.0.0.1:8545/"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
