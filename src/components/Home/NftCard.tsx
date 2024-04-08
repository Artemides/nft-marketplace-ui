import React from "react";
import nftImage from "../../public/images/nft_img.webp";
import Image from "next/image";
type NftCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
};

export const NftCard = ({ title, description, image, price }: NftCardProps) => {
  return (
    <article className=" bg-stone-800 rounded-lg">
      <Image src={nftImage} alt="image" className="rounded-t-lg" />
      <div className="p-2 flex-col">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="">
          <small>Price:</small>{" "}
          <span className="font-bold text-xl">{price} ETH</span>
        </p>
      </div>
    </article>
  );
};
