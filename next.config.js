/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ipfs.io",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
