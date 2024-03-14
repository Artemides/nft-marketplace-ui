"use client";

import React, { useCallback, useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import MetamaskSVG from "../../public/images/icons/metamask-icon.svg";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import CustomToast from "./CustomToast";
import { BiLogIn, BiUserCircle } from "react-icons/bi";
import { MdLogin } from "react-icons/md";
export const ConnectWalletButton = () => {
  const { isPending, connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: ensAvatar } = useEnsAvatar();
  const connectWallet = async (connector: CreateConnectorFn | Connector) => {
    console.log({ connector });
    connect({ connector });
  };
  const { data: session, status: sessionStatus } = useSession();

  const handleLogin = useCallback(async () => {
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with ethereum on NFT.Market",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: await getCsrfToken(),
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      await signIn("credentials", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
      });
    } catch (error) {
      toast.custom((t) => (
        <CustomToast
          description="Please sign to get a session"
          t={t}
          type="error"
        />
      ));
    }
  }, [address, chainId, signMessageAsync]);

  // useEffect(() => {
  //   if (isConnected && !session) {
  //     handleLogin();
  //   }
  // }, [handleLogin, isConnected, session]);

  return (
    <>
      {isConnected && session && address && (
        <div className="flex items-center justify-between gap-2 rounded-full text-sm py-1 px-6 ">
          {ensAvatar && <Image src={ensAvatar} alt={`${address}`} />}
          <span className="font-medium">{`${address.slice(
            0,
            10
          )}...${address.slice(-6)}`}</span>
          <IconButton loading={isPending} onClick={() => disconnect()}>
            <PiPlugsConnectedBold size={24} className="text-green-500" />
          </IconButton>
        </div>
      )}

      {isConnected && !session && (
        <IconButton
          loading={sessionStatus === "loading"}
          onClick={handleLogin}
          className="flex gap-x-1 items-center px-4 bg-white text-black"
        >
          Log in
          <BiLogIn />
        </IconButton>
      )}

      {!isConnected &&
        connectors.map((cnn) => (
          <IconButton
            key={cnn.id}
            loading={isPending}
            onClick={async () => connectWallet(cnn)}
            className="flex space-x-2 px-4 bg-white"
          >
            {cnn.icon && (
              <Image src={cnn.icon} alt={cnn.name} width={24} height={24} />
            )}
            <span className="font-normal text-black"> {cnn.name}</span>
          </IconButton>
        ))}
    </>
  );
};
