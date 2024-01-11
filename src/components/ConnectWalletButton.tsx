"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { PiPlugsConnectedBold, PiPlugsBold } from "react-icons/pi";
import {
  Connector,
  CreateConnectorFn,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useReconnect,
  useSignMessage,
} from "wagmi";
import { IconButton } from "./IconButton";
import { injected, metaMask } from "wagmi/connectors";
import toast from "react-hot-toast";
import MetamaskSVG from "../../public/images/icons/metamask-icon.svg";

export const ConnectWalletButton = () => {
  const { isPending, connect, connectors } = useConnect();
  const { reconnect } = useReconnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync, signMessage } = useSignMessage();
  const { data: ensAvatar } = useEnsAvatar();
  const connectWallet = async (connector: CreateConnectorFn | Connector) => {
    console.log({ connector });
    connect({ connector });
  };

  useEffect(() => {
    console.log({ chainId, address });
    if (!chainId || !address) return;
    console.log("resigning");
    const signSession = async () => {
      try {
        // const { message } = (await requestChallengeAsync({
        //   address,
        //   chainId,
        // }))!;
        // const signature = await signMessageAsync({ message });
        // const ss = signMessage({ message: "" });
        // await signIn("moralis-auth", { message, signature, redirect: false });
      } catch (error: any) {
        toast.error("Signature required for session", {
          icon: (
            <Image src={MetamaskSVG} alt="metamask" width={24} height={24} />
          ),
          style: { color: "#ff6952" },
        });
        if (isConnected) disconnect();
        console.error(error);
      }
    };

    signSession();
  }, [address, chainId, disconnect, isConnected]);

  // useEffect(() => {
  //   if (status !== "authenticated") return;

  //   reconnect();
  // }, [reconnect]);

  return (
    <>
      {isConnected && address && (
        <div className="flex items-center justify-between gap-2 rounded-full text-sm py-1 px-6 ">
          {ensAvatar && <Image src={ensAvatar} alt={`${address}`} />}
          <span className="font-bold">{`${address.slice(
            0,
            10
          )}...${address.slice(-6)}`}</span>
          <IconButton loading={isPending} onClick={() => disconnect()}>
            <PiPlugsConnectedBold size={24} className="text-green-500" />
          </IconButton>
        </div>
      )}
      {!isConnected &&
        connectors.map((cnn) => (
          <IconButton
            key={cnn.id}
            loading={isPending}
            onClick={() => connectWallet(cnn)}
            className="flex space-x-2 px-4"
          >
            {cnn.icon && (
              <Image src={cnn.icon} alt={cnn.name} width={24} height={24} />
            )}
            <span className="font-light"> {cnn.name}</span>
          </IconButton>
        ))}
    </>
  );
};
