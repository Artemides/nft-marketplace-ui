import { SessionProvider } from "next-auth/react";
import { Titillium_Web } from "@next/font/google";
import type { AppProps } from "next/app";

import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, sepolia, mainnet } from "wagmi/chains";

import { Layout } from "../components/Layout";
import "../styles/globals.css";
import ToasterProvider from "../../providers/ToasterProvider";
import AlchemyProvider from "../../providers/AlchemyProvider";
import { injected, metaMask } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "../../config";
import { id } from "alchemy-sdk/dist/src/api/utils";
import { createClient } from "viem";
import { useState } from "react";

const titillium_Web = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const wagmiConfig = createConfig({
  chains: [sepolia, mainnet, hardhat],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(config.sepoliaRpcUrl, { key: "alchemy" }),
    [hardhat.id]: http(),
  },
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [client] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={client}>
        <SessionProvider>
          <Layout className={titillium_Web.className}>
            <ToasterProvider />
            <AlchemyProvider>
              <Component {...pageProps} />
            </AlchemyProvider>
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
