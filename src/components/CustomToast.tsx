import Image from "next/image";
import React from "react";
import { Toast } from "react-hot-toast";

type CustomToastProps = {
  description: string;
  t: Toast;
  image?: string;
};

const CustomToast: React.FC<CustomToastProps> = ({ description, image, t }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full flex gap-x-4 items-center bg-[#070512]/50 shadow-lg rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm`}
    >
      {image && (
        <div className="relative w-[64px] h-[64px]">
          <Image src={image} alt={description} fill className="object-cover" />
        </div>
      )}
      <p className="flex-1 text-white font-semibold pr-2 text-center">
        {description}
      </p>
    </div>
  );
};

export default CustomToast;
