import {
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
  sepolia,
} from "wagmi";
import { Layout } from "../components/Layout";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Titillium_Web } from "next/font/google";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { hardhat } from "wagmi/chains";

const { publicClient, webSocketPublicClient, chains } = configureChains(
  [sepolia, mainnet, hardhat],
  [publicProvider()]
);

const titillium_Web = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider>
        <Layout className={titillium_Web.className}>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
