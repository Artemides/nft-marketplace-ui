import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Navbar = () => {
  return (
    <nav className="sticky top-0   w-full bg-[#7474747b] px-4 py-4   backdrop-blur-sm  z-10">
      <div className=" flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-semibold ">
          NFTMarket
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
