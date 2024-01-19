"use client";

import { MintingContext } from "@/providers/MintingProvider";
import { useContext } from "react";

const Page = ({ params }: { params: { tx: string } }) => {
  const { tx } = params;

  const mintingContext = useContext(MintingContext);
  if (!mintingContext) return <div>Not Found</div>;

  const { pinataResponse } = mintingContext;

  console.log({ pinataResponse });
  return (
    <div>
      <h1>{tx}</h1>
    </div>
  );
};

export default Page;
