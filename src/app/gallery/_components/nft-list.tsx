"use client";
import NFTCard from "@/components/nft-card";
import { Button } from "@/components/ui/button";
import { useAlchemy } from "@/hooks/use-alchemy";
import { OwnedNft, OwnedNftsResponse } from "alchemy-sdk";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const mockNft: Partial<OwnedNft> = {
  mint: { transactionHash: "hash" },
  name: "nft-name",
  description: "nft-description",
  image: { originalUrl: "https://ipfs.io/ipfs/QmV2RBKGJ2YvuBQ8dhEfku5Lcsr889EhWciu3CAhFVPzxf" },
};

export const NFTList = () => {
  const { address } = useAccount();
  const { nft } = useAlchemy();
  const [ownedNfts, setOwnedNfts] = useState<Partial<OwnedNft>[]>([
    mockNft,
    mockNft,
    mockNft,
    mockNft,
    mockNft,
    mockNft,
    mockNft,
    mockNft,
  ]);

  // useEffect(() => {
  //   if (!address) return;

  //   const fetchNfts = async () => {
  //     const _nfts = await nft.getNftsForOwner(address);
  //     console.log({_nfts})
  //     setOwnedNfts(_nfts.ownedNfts);
  //   };
  //   fetchNfts();
  // }, [address, nft]);

  return (
    <ul className="grid grid-cols-6 gap-2">
      {ownedNfts.map((nft) => (
        <li key={nft.mint?.transactionHash}>
          <NFTCard
            image={nft.image?.originalUrl!}
            imageDescripion={nft.description || "owned nft"}
            className="w-full aspect-w-5 aspect-h-6 border-gray-500/50"
            bgClassName="p-2"
          >
            <div className="">
              <p className="text-lg font-semibold">{nft.name}</p>
              <p className="text-sm">{nft.description}</p>
            </div>
            <Button variant={"ghost"} className="w-full font-semibold">
              List
            </Button>
          </NFTCard>
        </li>
      ))}
    </ul>
  );
};
