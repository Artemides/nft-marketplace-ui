import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { alchemy } from "../../../alchemy.config";
import { config } from "../../../config";
import { NFTList } from "./_components/nft-list";
import { AddressStats } from "./_components/address-stats";

const Gallery = async () => {
  return (
    <main className="py-4 px-24">
      <h1 className="text-5xl text-center font-semibold tracking-tighter">Your NFTs on-chain</h1>
      <div className="py-8">
        <AddressStats />
      </div>
      <NFTList />
    </main>
  );
};

export default Gallery;
