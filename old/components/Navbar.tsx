import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Navbar = () => {
  return (
    <nav className="sticky top-0  h-[72px] w-full bg-neutral-600/20  backdrop-blur-sm  z-10">
      <div className="h-full px-10 flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-bold ">
          NFT.Market
        </Link>
        <ul className="flex gap-4 ">
          <li className="">
            <Link href={"/nfts/mint"} className="text-lg hover:text-orange-500">
              Mint
            </Link>
          </li>
        </ul>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};
