import Link from "next/link";
import React from "react";
import { LoadButton } from "./LoadButton";
import { config } from "../../config";
import Image from "next/image";
import NftArt from "../public/images/nft-art.jpeg";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";
import NftContract from "../../deployments/localhost/Nft.json";

const NFTMinter = () => {
  const { chain } = useNetwork();
  const { config: contractConfig } = usePrepareContractWrite({
    address: NftContract.address as `0x${string}`,
    abi: NftContract.abi,
    functionName: "mint",
    chainId: chain?.id,
  });

  const { write } = useContractWrite(contractConfig);

  const handleMintNft = () => {
    if (!write) return;

    write();
  };

  return (
    <div className="h-screen grid place-items-center ">
      <div className="w-2/3 h-2/3 grid grid-cols-3 ring-1 ring-stone-600 rounded-lg">
        <div className="w-full h-full col-span-2 p-8 bg-stone-900  rounded-l-lg text-center">
          <h2 className="font-semibold ">Mint an NFT</h2>
          <p>
            At{" "}
            <Link className="text-orange-500" href={"/"}>
              {config.NFTAddress}
            </Link>
          </p>
          <div className="h-full grid place-items-center">
            <LoadButton
              className=" px-32 py-4 bg-orange-500 rounded-lg shadow-xl hover:bg-orange-600 disabled:bg-stone-500"
              disabled={!write}
              onClick={handleMintNft}
            >
              Mint
            </LoadButton>
          </div>
        </div>
        <div className="col-span-1 relative ">
          <Image
            src={NftArt}
            alt="nft-art"
            objectFit="cover"
            fill
            style={{ borderRadius: "0px 8px 8px 0px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NFTMinter;
