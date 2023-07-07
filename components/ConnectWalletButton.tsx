import React, { useEffect, useState } from "react";
import { PiPlugsConnectedBold, PiPlugsBold } from "react-icons/pi";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn, useSession } from "next-auth/react";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { IconButton } from "./IconButton";

export const ConnectWalletButton = () => {
  const { connectAsync, isLoading, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { status } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();

  const connectWallet = async () => {
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });
    const { message } = (await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    }))!;

    const signature = await signMessageAsync({ message });
    await signIn("moralis-auth", { message, signature, redirect: false });
  };

  useEffect(() => {
    if (status !== "authenticated") return;

    connect({ connector: new MetaMaskConnector() });
  }, [connect, status]);

  return (
    <>
      {isConnected && address ? (
        <div className="flex items-center justify-between gap-2 px-2 rounded-full text-sm">
          <span>{`${address.slice(0, 10)}...${address.slice(-6)}`}</span>
          <PiPlugsConnectedBold size={24} className="text-green-500" />
        </div>
      ) : (
        <IconButton loading={isLoading} onClick={connectWallet}>
          <PiPlugsBold size={24} className="text-red-500" />
        </IconButton>
      )}
    </>
  );
};
