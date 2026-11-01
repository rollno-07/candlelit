import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seoData";
import { TEMPLATES } from "@/lib/templatesData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.canonicalUrl;
  const now = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/auth`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // All 11 Template Creation / Customizer URLs
  const createPages: MetadataRoute.Sitemap = TEMPLATES.map((tmpl) => ({
    url: `${baseUrl}/create/${tmpl.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // All 11 Template Direct Experience Previews
  const previewPages: MetadataRoute.Sitemap = TEMPLATES.map((tmpl) => ({
    url: `${baseUrl}/${tmpl.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...createPages, ...previewPages];
}
