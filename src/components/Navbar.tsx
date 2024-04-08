import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWallet";

type NFTRoute = {
  name: string;
  href: string;
};

const routes: NFTRoute[] = [
  { name: "Mint", href: "/nft/mint" },
  { name: "Gallery", href: "/nft/mint" },
  { name: "List", href: "/nft/mint" },
  { name: "Swap", href: "/nft/mint" },
];
export const Navbar = () => {
  return (
    <nav className="sticky top-0  h-[72px] w-full bg-neutral-600/20  backdrop-blur-sm  z-10 border-b-[1px] border-neutral-700/35">
      <div className="h-full px-10 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-x-10">
          <Link href={"/"} className="text-2xl font-semibold ">
            NFT.<small className="font-light">Market</small>
          </Link>
          <ul className="flex gap-4 text-neutral-300">
            {routes.map((route) => (
              <li key={route.name} className="">
                <Link href={route.href} className="text-base hover:text-orange-400   ">
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};
