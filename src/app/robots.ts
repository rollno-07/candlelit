import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seoData";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/api/"],
      },
      // Allow AI & LLM Search Crawlers for AEO / GEO
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "Claude-Web",
          "anthropic-ai",
          "CCBot",
        ],
        allow: ["/", "/templates", "/llms.txt", "/llms-full.txt"],
        disallow: ["/dashboard"],
      },
    ],
    sitemap: `${SITE_CONFIG.canonicalUrl}/sitemap.xml`,
    host: SITE_CONFIG.canonicalUrl,
  };
}
