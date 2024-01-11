import Link from "next/link";
import React from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";

type NFTRoute = {
  name: string;
  href: string;
};

const routes: NFTRoute[] = [{ name: "Mint", href: "/nft/mint" }];
export const Navbar = () => {
  return (
    <nav className="sticky top-0  h-[72px] w-full bg-neutral-600/20  backdrop-blur-sm  z-10 border-b-[1px] border-neutral-700/35">
      <div className="h-full px-10 flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-bold ">
          NFT.<small className="font-light">Market</small>
        </Link>
        <ul className="flex gap-4 ">
          {routes.map((route) => (
            <li key={route.name} className="">
              <Link href={route.href} className="text-lg hover:text-orange-500">
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
        <ConnectWalletButton />
      </div>
    </nav>
  );
};
