import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const setups = await prisma.setup.findMany();
  const setupMetadata: MetadataRoute.Sitemap = setups.map((setup) => {
    return {
      url: `${baseUrl}/setup/${setup.slug}`,
      lastModified: new Date(setup.createdAt),
      changeFrequency: "monthly",
      priority: 1,
    };
  });

  const posts = await prisma.post.findMany();
  const postMetadata: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    };
  });

  return [
    {
      url: `${baseUrl}`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hostinger`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/setup`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shorts`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sponsors`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...setupMetadata,
    ...postMetadata,
  ];
}
