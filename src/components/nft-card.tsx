import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";

type NFTCardProps = {
  image: string | null;
  imageDescripion: string;
  children?: ReactNode;
  className?: string;
  bgClassName?: string;
};

const NFTCard: React.FC<NFTCardProps> = ({
  children,
  image,
  imageDescripion,
  className,
  bgClassName,
}) => {
  return (
    <div
      className={cn(
        "group relative w-[350px] aspect-w-12 aspect-h-16 rounded-md overflow-x-hidden border border-gray-500/20 overflow-hidden",
        className
      )}
    >
      {image && (
        <Image
          src={image}
          alt={imageDescripion}
          fill
          className="object-cover group-hover:scale-125 transform-gpu transition-transform hover:border-red-50 duration-500"
        />
      )}
      {/* blured-bg anchor */}
      <div>
        <div
          className={cn(
            "absolute bottom-0 w-full  bg-black/40  backdrop-blur-[1px] p-4 space-y-2",
            bgClassName
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
