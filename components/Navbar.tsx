import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Navbar = () => {
  return (
    <nav className="sticky flex items-center justify-between bg-stone-950 px-32 p-4">
      <Link href={"/"} className="text-2xl font-semibold">
        NFTMarket
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link href={"/"}>Sell</Link>
        </li>
      </ul>
      <ConnectWalletButton />
    </nav>
  );
};
