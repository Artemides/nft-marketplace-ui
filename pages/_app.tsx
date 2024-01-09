import { SessionProvider } from "next-auth/react";
import { Titillium_Web } from "@next/font/google";
import type { AppProps } from "next/app";

import { WagmiProvider, createConfig, http } from "wagmi";
import { hardhat, sepolia, mainnet } from "wagmi/chains";

import { Layout } from "../components/Layout";
import "../styles/globals.css";
import ToasterProvider from "../providers/ToasterProvider";
import AlchemyProvider from "../providers/AlchemyProvider";
import { metaMask } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const titillium_Web = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const config = createConfig({
  chains: [sepolia, mainnet, hardhat],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
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
