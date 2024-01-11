"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../../wagmi";

type WagmiProps = {
  children: ReactNode;
};
const Wagmi: React.FC<WagmiProps> = ({ children }) => {
  const [client] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Wagmi;
