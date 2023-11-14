import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Navbar = () => {
  return (
    <nav className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#7474747b] px-4 py-4 w-10/12 rounded-xl backdrop-blur-sm  z-10">
      <div className=" flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-semibold ">
          NFTMarket
        </Link>
        <ul className="flex gap-4">
          <li>
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
