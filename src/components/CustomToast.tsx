import { cn } from "@/utils/utils";
import Image from "next/image";
import React from "react";
import { Toast } from "react-hot-toast";

type CustomToastProps = {
  description: string;
  t: Toast;
  image?: string;
  type?: "error" | "success";
};

const CustomToast: React.FC<CustomToastProps> = ({
  description,
  image,
  t,
  type = "success",
}) => {
  return (
    <div
      className={cn(
        "max-w-md w-full min-h-[75px] flex gap-x-4 items-center bg-[#070512]/50 shadow-lg rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm  text-white font-semibold border-[1px] border-neutral-400/10",
        {
          "animate-enter": t.visible,
          "animate-leave": !t.visible,
          "text-red-500": type === "error",
        }
      )}
    >
      {image && (
        <div className="relative w-[64px] h-[64px]">
          <Image src={image} alt={description} fill className="object-cover" />
        </div>
      )}
      <p className="flex-1 pr-2 text-center">{description}</p>
    </div>
  );
};

export default CustomToast;
