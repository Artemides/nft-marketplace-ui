import Image from "next/image";
import React, { ReactNode } from "react";

type AstroCardProps = {
  image: string;
  imageDescripion: string;
  children?: ReactNode;
};

const AstroCard: React.FC<AstroCardProps> = ({
  children,
  image,
  imageDescripion,
}) => {
  return (
    <div className="relative w-[350px] aspect-w-12 aspect-h-16 rounded-md overflow-x-hidden border border-gray-500/20">
      <Image src={image} alt={imageDescripion} fill className="object-cover" />
      <div>
        <div className="absolute bottom-0 top- w-full  bg-black/40  backdrop-blur-[1px] p-4 space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AstroCard;
