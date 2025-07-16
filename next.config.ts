import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
