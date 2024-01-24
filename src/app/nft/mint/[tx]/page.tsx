"use client";

import Clipboard from "@/components/Clipboard";
import { MintingContext } from "@/providers/MintingProvider";
import Image from "next/image";
import { useContext } from "react";
import { config } from "../../../../../config";
import Button from "@/components/Button";

const Page = ({ params }: { params: { tx: string } }) => {
  const { tx } = params;

  const mintingContext = useContext(MintingContext);
  if (!mintingContext) return <div>Not Found</div>;

  const { pinataResponse, nftImage } = mintingContext;

  console.log({ pinataResponse, nftImage });
  return (
    <main className="mx-28 h-full">
      <div className="w-1/2 my-8">
        <h1 className="text-5xl font-bold">Astro NFT Created</h1>
        <p>
          Your NFT has been created successfully you can take full control of it
          and even list it on our Marketplace.
        </p>
      </div>
      <section id="nft-details" className="grid grid-cols-2 gap-x-8 px-8">
        <div className="relative aspect-square rounded-md overflow-x-hidden">
          {nftImage && (
            <Image
              src={URL.createObjectURL(nftImage)}
              alt={pinataResponse?.metadata.name ?? "nft"}
              fill
              className="object-cover"
            />
          )}
          {nftImage && pinataResponse && (
            <div className="absolute bottom-0 w-full  bg-black/30  backdrop-blur-[1px] p-4 space-y-2">
              <h2 className="text-2xl font-semibold first-letter:uppercase mt-1 mb-2">
                {pinataResponse.metadata.name}
              </h2>
              <p className="font-thin">{pinataResponse.metadata.description}</p>
              {pinataResponse.metadata.traits &&
                pinataResponse.metadata.traits.length > 0 && (
                  <>
                    <h3 className="font-semibold ">Traits</h3>
                    <div className="grid grid-cols-3 font-thin gap-2">
                      {pinataResponse.metadata.traits.map((trait) => (
                        <span key={trait.type}>
                          {trait.type} : {trait.value}
                        </span>
                      ))}
                    </div>
                  </>
                )}
            </div>
          )}
        </div>
        <div className="space-y-4 w-full justify-self-center">
          <Clipboard copy={tx} className="py-4">
            <p className="break-all">
              Transaction: <b>{tx}</b>
            </p>
          </Clipboard>
          <div>
            <p>
              Contract: <b>Astro NFT</b>
            </p>
            <p>
              at: <b>{config.astroNftAddress}</b>
            </p>
          </div>
          <div>
            <p>
              Stored on: <b>IPFS</b>
            </p>
            <p>
              metadata: <b>{pinataResponse?.cid}</b>
            </p>
            <p>
              file: <b>{pinataResponse?.metadata.image}</b>
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-2">
            <Button
              text="List on Market"
              className="bg-orange-500 text-white"
            />
            <Button text="View on Gallery" />
            <Button text="New Mint" className="bg-green-500 text-white" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
