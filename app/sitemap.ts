import type { MetadataRoute } from "next";
import { BASE_URL, SERVICIOS } from "./lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SERVICIOS.map((s) => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
