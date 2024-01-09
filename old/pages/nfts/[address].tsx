import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { NftCard } from "../../components/Home/NftCard";

const NFT: NextPage = () => {
  const { query } = useRouter();
  const { address } = query;
  return (
    <div className="w-full flex gap-4 px-4 py-2">
      {Array(5)
        .fill(0)
        .map((_, idx) => (
          <NftCard
            key={idx}
            description="ss"
            price={100}
            image="url"
            title="myNfts"
          />
        ))}
    </div>
  );
};
export default NFT;
