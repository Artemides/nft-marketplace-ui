import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
type Item = {
  image: string;
  name: string;
  price: number;
  likes: number;
};
const item: Item = {
  image: "https://ipfs.io/ipfs/QmV2RBKGJ2YvuBQ8dhEfku5Lcsr889EhWciu3CAhFVPzxf",
  name: "Cancer",
  likes: 39,
  price: 4.87,
};

export const ActivityItem = () => {
  return (
    <div className="flex flex-1 items-center justify-between gap-x-2 hover:bg-white/10 p-2 rounded-md transition duration-300">
      <Avatar image={item.image} name={item.name} size={"sm"} />
      <div className="flex flex-col justify-between">
        <p>
          <strong>{item.name}</strong>
        </p>
        <span className="text-neutral-300">
          Price: <strong className="text-secondary font-semibold">{item.price}</strong> ETH
        </span>
      </div>
      <div className="flex flex-1 justify-end gap-x-2">
        <div className="flex flex-col justify-center">
          <MdFavoriteBorder />
          <span>{item.likes}</span>
        </div>
        <Button variant={"ghost"} className="size-12 rounded-full">
          <BsThreeDots />
        </Button>
      </div>
    </div>
  );
};
