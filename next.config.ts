import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com", pathname: "**" },
      { protocol: "https", hostname: "m.media-amazon.com", pathname: "**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "**" },
      { protocol: "https", hostname: "source.unsplash.com", pathname: "**" },
      { protocol: "https", hostname: "img.freepik.com", pathname: "**" },
      { protocol: "https", hostname: "seliga-dev.s3.us-east-1.amazonaws.com", pathname: "**" },
      {
        protocol: "https",
        hostname: "seligadev-site-bk.s3.us-east-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
