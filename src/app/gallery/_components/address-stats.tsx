"use client";

import React from "react";
import { useAccount } from "wagmi";
import { blo } from "blo";
import { Stat } from "./stat";
import { Button } from "@/components/ui/button";
import { MdWallet } from "react-icons/md";
import { Avatar } from "@/components/avatar";

const stats = [
  {
    value: 5.32,
    description: "balance Eth",
  },
  {
    value: 19,
    description: "token sales",
  },
  {
    value: 4.32,
    description: "Avg price",
  },
  {
    value: 12,
    description: "listed",
  },
];

export const AddressStats = () => {
  const { address } = useAccount();
  return (
    <div className="flex items-center gap-x-12">
      <Avatar image={address && blo(address)} name={address} size={"xl"} displayName />
      <div className="space-y-2">
        <ul className="grid grid-cols-4 items-center gap-x-4  divide-x-[1px] divide-neutral-500/50 [&>li]:pl-4">
          {stats.map((stat) => (
            <li key={stat.description} className="first-of-type:pl-0">
              <Stat value={stat.value} description={stat.description} />
            </li>
          ))}
        </ul>
        <Button>
          Withdraw <MdWallet />
        </Button>
      </div>
    </div>
  );
};
