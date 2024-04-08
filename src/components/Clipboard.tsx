import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";
import { BiSolidCopyAlt } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type ClipboardProps = {
  copy: string;
  children?: ReactNode;
  className?: string;
  btnClassName?: string;
};

const Clipboard = ({ className, children, copy, btnClassName }: ClipboardProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copy);
    toast.success("Copied", {
      icon: <BiSolidCopyAlt size={21} className="text-green-400" />,
    });
  };
  return (
    <div className={cn(`flex justify-between gap-x-2 rounded-lg p-1 break-all `, className)}>
      {children}
      <button className={twMerge(`text-green-400`, btnClassName)} onClick={handleCopyToClipboard}>
        <BiSolidCopyAlt size={21} className="text-green-400 hover:text-green-300" />
      </button>
    </div>
  );
};

export default Clipboard;
