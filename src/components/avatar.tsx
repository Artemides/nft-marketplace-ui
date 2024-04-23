import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import React from "react";
import { isAddress } from "viem";

const avatarVariants = cva("", {
  variants: {
    variant: {
      default: "",
      outlined: "border-[1px] border-neutral-400/2",
    },
    size: {
      default: "size-14",
      xs: "size-12",
      sm: "size-16",
      md: "size-28",
      lg: "size-24",
      xl: "size-28",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type AvatarProps = VariantProps<typeof avatarVariants> & {
  image?: string;
  name?: string;
  displayName?: boolean;
};

export const Avatar: React.FC<AvatarProps> = ({
  image,
  name,
  displayName = false,
  variant,
  size,
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <div
        className={cn(
          "relative size-1 rounded-full overflow-hidden",
          avatarVariants({ variant, size })
        )}
      >
        {image && (
          <Image
            src={image}
            alt={name || "user avatar"}
            className="w-full h-full object-cover"
            fill
          />
        )}
      </div>
      {name && displayName && (
        <small className="text-xs">
          {name && !isAddress(name) ? name ?? "" : name.slice(0, 8)}...{name.slice(34)}
        </small>
      )}
      {!name && displayName && <small className="text-xs">Unknown</small>}
    </div>
  );
};
