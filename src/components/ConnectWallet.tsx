"use client";

import React, { useCallback, useEffect } from "react";
import Image from "next/image";

import {
  Connector,
  CreateConnectorFn,
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useSignMessage,
  useAccountEffect,
} from "wagmi";
import { IconButton } from "./IconButton";
import toast from "react-hot-toast";
import { SiweMessage } from "siwe";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import CustomToast from "./CustomToast";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { config } from "../../wagmi";
import { watchAccount } from "@wagmi/core";

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
        <CustomToast description="Please sign to get a session" t={t} type="error" />
      ));
    }
  }, [address, chainId, signMessageAsync]);

  const handleLogout = () => {
    disconnect();
    signOut();
  };

  useEffect(() => {
    if (isConnected && sessionStatus === "unauthenticated") {
      handleLogin();
    }

    const unwatch = watchAccount(config, {
      onChange(data) {
        if (!data.address && isConnected) {
          signOut();
          return;
        }
      },
    });

    return () => {
      unwatch();
    };
  }, [handleLogin, isConnected, sessionStatus]);

  return (
    <>
      {isConnected && session && (
        <div className="flex items-center justify-between gap-2 text-sm py-1 ">
          {ensAvatar && <Image src={ensAvatar} alt={`${address}`} />}
          {address && (
            <span className="font-semibold text-green-500">{`${address.slice(
              0,
              10
            )}...${address.slice(-6)}`}</span>
          )}
          <IconButton
            loading={isPending}
            onClick={handleLogout}
            className="bg-white text-black rounded-md flex"
          >
            <BiLogOut size={21} />
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
            {cnn.icon && <Image src={cnn.icon} alt={cnn.name} width={24} height={24} />}
            <span className="font-normal text-black"> {cnn.name}</span>
          </IconButton>
        ))}
    </>
  );
};
