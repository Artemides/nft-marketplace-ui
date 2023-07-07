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

const { publicClient, webSocketPublicClient } = configureChains(
  [sepolia, mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
