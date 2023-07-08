import { NextApiRequest, NextApiResponse } from "next";
import Moralis from "moralis";
import { type } from "os";
import { error } from "console";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY!;

type ContractNftRequest = {
  contractAddress: string;
  chain: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    res.status(405).json({ error: "Only Get Method supported" });

  const { contractAddress, chain } = req.query as ContractNftRequest;
  //   await Moralis.start({ apiKey: MORALIS_API_KEY });

  const response = await Moralis.EvmApi.nft
    .getContractNFTs({
      chain,
      format: "decimal",

      address: contractAddress,
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });

  res.status(200).json({ response });
}
