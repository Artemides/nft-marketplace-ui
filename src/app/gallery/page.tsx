import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { alchemy } from "../../../alchemy.config";
import { config } from "../../../config";
import { NFTList } from "./_components/nft-list";
import { AddressStats } from "./_components/address-stats";
import { ListingActivity } from "./_components/listing-activity";

const Gallery = async () => {
  return (
    <main className="py-4 px-24">
      <h1 className="text-5xl text-center font-semibold tracking-tighter">Your NFTs on-chain</h1>
      <div className="py-8">
        <AddressStats />
      </div>
      <div className="grid grid-cols-3 gap-x-8">
        <div className="col-span-1">
          <ListingActivity />
        </div>
        <div className="col-span-2">
          <NFTList />
        </div>
      </div>
    </main>
  );
};

export default Gallery;
