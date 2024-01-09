import React, { useEffect } from "react";
import { PiPlugsConnectedBold, PiPlugsBold } from "react-icons/pi";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useReconnect,
  useSignMessage,
} from "wagmi";
import { signIn, useSession } from "next-auth/react";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { IconButton } from "./IconButton";
import Image from "next/image";
import { metaMask } from "wagmi/connectors";

export const ConnectWalletButton = () => {
  const { isLoading, connect } = useConnect();
  const { reconnect } = useReconnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId } = useAccount();
  const { status } = useSession();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { signMessageAsync } = useSignMessage();
  const { data: ensAvatar } = useEnsAvatar();

  const connectWallet = async () => {
    connect({ connector: metaMask() });
  };

  useEffect(() => {
    console.log({ chainId, address });
    if (!chainId || !address) return;
    console.log("resigning");
    const signSession = async () => {
      const { message } = (await requestChallengeAsync({
        address,
        chainId,
      }))!;

      const signature = await signMessageAsync({ message });
      await signIn("moralis-auth", { message, signature, redirect: false });
    };

    signSession();
  }, [chainId, address, requestChallengeAsync, signMessageAsync]);

  useEffect(() => {
    if (status !== "authenticated") return;

    reconnect();
  }, [reconnect, status]);

  return (
    <>
      {isConnected && address ? (
        <div className="flex items-center justify-between gap-2 rounded-full text-sm py-1 px-6">
          {ensAvatar && <Image src={ensAvatar} alt={`${address}`} />}
          <span>{`${address.slice(0, 10)}...${address.slice(-6)}`}</span>
          <IconButton loading={isLoading} onClick={() => disconnect()}>
            <PiPlugsConnectedBold size={24} className="text-green-500" />
          </IconButton>
        </div>
      ) : (
        <IconButton loading={isLoading} onClick={connectWallet}>
          <PiPlugsBold size={24} className="text-red-500" />
        </IconButton>
      )}
    </>
  );
};
