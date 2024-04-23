import Image from "next/image";
import React from "react";
import { isAddress } from "viem";

type AvatarProps = {
  image?: string;
  name?: string;
};

export const Avatar = ({ image, name }: AvatarProps) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="relative size-28 rounded-full border-[1px] border-neutral-400/25 bg-neutral-600 overflow-hidden">
        {image && <Image src={image} alt={name || "user avatar"} className="w-full h-full" fill />}
      </div>
      {name && (
        <small className="text-xs">
          {name && !isAddress(name) ? name ?? "" : name.slice(0, 8)}...{name.slice(34)}
        </small>
      )}
      {!name && <small className="text-xs">Unknown</small>}
    </div>
  );
};
