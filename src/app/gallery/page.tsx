import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { alchemy } from "../../../alchemy.config";
import { config } from "../../../config";
import { NFTList } from "./_components/nft-list";

const Gallery = async () => {
  return (
    <main className="p-4">
      <NFTList />
    </main>
  );
};

export default Gallery;
