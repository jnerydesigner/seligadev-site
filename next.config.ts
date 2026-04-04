import type { NextConfig } from "next";

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const directusPattern = directusUrl
  ? (() => {
    const url = new URL(directusUrl);

    return {
      protocol: url.protocol.replace(":", "") as "http" | "https",
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/assets/**",
    };
  })()
  : null;

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
      { protocol: "https", hostname: "cms.seligadev.com.br", pathname: "**" },
      ...(directusPattern ? [directusPattern] : []),
    ],
  },
};

export default nextConfig;
