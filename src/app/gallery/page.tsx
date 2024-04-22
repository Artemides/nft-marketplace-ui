import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import { alchemy } from "../../../alchemy.config";

const Gallery = async () => {
  const { user } = await auth();
  if (!user) redirect("/");

  console.log({ address: user.address });
  //   const nfts = await alchemy.nft.getNftsForOwner(user.address);

  //   console.log({ nfts: nfts.ownedNfts });
  return <main>Gallery</main>;
};

export default Gallery;
