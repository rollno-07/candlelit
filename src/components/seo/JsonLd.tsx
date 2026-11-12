import React from "react";
import { SITE_CONFIG, FAQS } from "@/lib/seoData";
import { TEMPLATES } from "@/lib/templatesData";

export function JsonLd() {
  // 1. WebSite & SoftwareApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Candlelit - Digital Craft & Online Surprise Platform",
    alternateName: [
      "Heartcraft Digital Surprise",
      "Digital Craft",
      "Heartcraft",
      "Heart Craft Surprise",
      "Online Surprise Portal",
      "Birthday Digital Surprise",
      "Anniversary Digital Surprise",
      "Candlelit",
    ],
    url: SITE_CONFIG.canonicalUrl,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All (Web Browser, iOS, Android, macOS, Windows)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    description: SITE_CONFIG.description,
    image: SITE_CONFIG.ogImage,
    creator: {
      "@type": "Organization",
      name: SITE_CONFIG.creator,
      url: "https://one7app.in",
    },
    featureList: [
      "Digital craft & heartcraft interactive celebration engine",
      "Birthday digital surprise with real microphone candle blowing and cake slicing",
      "Anniversary digital surprise with crystal champagne toast and relationship timeline",
      "Instant WhatsApp online surprise link generator (candleit.one7app.in/{template}-{name})",
      "Upload real cake photo with automatic candle and knife slice mapping",
      "Smart AI Inspiration Writer generating personalized celebration wishes",
      "AI Computer Vision photo beautifier with adaptive tone mapping",
      "Floating polaroid photo balloons with pop reveals and confetti",
      "Line-by-line auto-scrolling love letters with ambient piano music",
      "11 Curated Occasion Storylines (Birthday, Proposal, Anniversary, Karwa Chauth, etc.)",
    ],
  };

  // 2. Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    alternateName: [
      "Candlelit Digital Craft",
      "Heartcraft Digital",
      "one7app",
      "Candlelit Studios",
    ],
    url: SITE_CONFIG.canonicalUrl,
    logo: `${SITE_CONFIG.canonicalUrl}/cake-icon.svg`,
    sameAs: ["https://one7app.in"],
  };

  // 3. FAQPage Schema (AEO Engine Direct Answers)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // 4. ItemList Schema for the 11 Occasion Templates
  const templateListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Candlelit 11 Cinematic Occasion Templates",
    description: "Curated interactive templates for milestones, romances, and celebrations.",
    numberOfItems: TEMPLATES.length,
    itemListElement: TEMPLATES.map((tmpl, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: tmpl.title,
      description: tmpl.shortDescription,
      url: `${SITE_CONFIG.canonicalUrl}/${tmpl.id}`,
      image: `${SITE_CONFIG.canonicalUrl}${tmpl.previewImage}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templateListSchema) }}
      />
    </>
  );
}
