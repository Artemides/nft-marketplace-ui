import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wagmi from "@/providers/Wagmi";
import ToasterProvider from "../../old/providers/ToasterProvider";
import { Navbar } from "@/components/Navbar";
import { Header } from "@/components/Header";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "NFTMarket",
  description: "create your astro NFT and publish to be sold",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new QueryClient();
  return (
    <html lang="en">
      <body className={titillium.className}>
        <Wagmi>
          <Header>
            <ToasterProvider />
            {children}
          </Header>
        </Wagmi>
      </body>
    </html>
  );
}
