import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com", pathname: "**" },
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "**" },
    ],
  },
};

export default nextConfig;
