export const config = {
  NFTAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "",
  MarketAddress: process.env.NFT_MARKET_ADDRESS || "",
  alchemyApiKey: process.env.ALCHEMY_API_KEY || "",
  erc721UriAddress: process.env.ERC721_URI_ADDRESS || "",
  nftMarketAddress: process.env.NFT_MARKETPLACE_ADDRESS || "",
};
