import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-07-21",
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
