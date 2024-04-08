export const config = {
  NFTAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || "",
  MarketAddress: process.env.NFT_MARKET_ADDRESS || "",
  alchemyApiKey: process.env.ALCHEMY_API_KEY || "",
  erc721UriAddress: process.env.ERC721_URI_ADDRESS || "",
  nftMarketAddress: process.env.NFT_MARKETPLACE_ADDRESS || "",
  pubNftMarketAddress: process.env.NEXT_PUBLIC_ASTRO_NFT_ADDRESS || "",
  astroNftAddress: process.env.ASTRO_NFT_ADDRESS || "",
  sepoliaRpcUrl: process.env.ALCHEMY_SEPOLIA_RPC_URL || "",
};
