import { defineConfig } from "@wagmi/cli";
import { hardhat, react } from "@wagmi/cli/plugins";
export default defineConfig({
  out: "src/nftMarketHooks.ts",
  plugins: [
    hardhat({
      project: "../nft-marketplace",
      include: ["AstroNFT.json", "NFTMarket.json"],
      exclude: ["built-info/**", "*.dbg.json", "@openzeppelin"],
      commands: {
        clean: "hh clean",
        build: "hh compile",
      },
    }),
    react(),
  ],
  contracts: [],
});
