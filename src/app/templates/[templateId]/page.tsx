import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEMPLATES } from "@/lib/templatesData";
import { TEMPLATE_SEO_MAP } from "@/lib/templateSeoData";
import { TemplateDetailView } from "@/components/templates/TemplateDetailView";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export function generateStaticParams() {
  return TEMPLATES.map((tmpl) => ({
    templateId: tmpl.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    return {
      title: "Template Not Found | Candlelit",
      description: "The requested celebration template could not be found.",
    };
  }

  const seo = TEMPLATE_SEO_MAP[template.id] || {
    id: template.id,
    metaTitle: `${template.title} | Candlelit`,
    metaDescription: template.shortDescription,
    targetKeywords: [template.title, "digital surprise", "candlelit"],
    h1: template.title,
    heroBadge: "4-Act Storyline",
    heroTagline: template.shortDescription,
    highlights: [],
    faqs: [],
    ratingValue: 4.96,
    ratingCount: 1100,
  };

  const fullImageUrl = `https://candlelit.one7app.in${template.previewImage}`;

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.targetKeywords,
    alternates: {
      canonical: `https://candlelit.one7app.in/templates/${template.id}`,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: `https://candlelit.one7app.in/templates/${template.id}`,
      siteName: "Candlelit",
      images: [
        {
          url: fullImageUrl,
          width: 1024,
          height: 1024,
          alt: `${template.title} - Candlelit Digital Celebration`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [fullImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) {
    notFound();
  }

  const seo = TEMPLATE_SEO_MAP[template.id] || {
    id: template.id,
    metaTitle: `${template.title} | Candlelit`,
    metaDescription: template.shortDescription,
    targetKeywords: [],
    h1: template.title,
    heroBadge: "4-Act Storyline",
    heroTagline: template.shortDescription,
    highlights: [],
    faqs: [],
    ratingValue: 4.96,
    ratingCount: 1100,
  };

  const fullImageUrl = `https://candlelit.one7app.in${template.previewImage}`;

  // Structured Data 1: Product / Digital Application Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.h1,
    description: seo.metaDescription,
    image: fullImageUrl,
    brand: {
      "@type": "Brand",
      name: "Candlelit",
    },
    offers: {
      "@type": "Offer",
      url: `https://candlelit.one7app.in/templates/${template.id}`,
      priceCurrency: "INR",
      price: "250",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Candlelit by one7app",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: seo.ratingValue.toString(),
      reviewCount: seo.ratingCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Structured Data 2: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://candlelit.one7app.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Occasion Templates",
        item: "https://candlelit.one7app.in/templates",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: template.title,
        item: `https://candlelit.one7app.in/templates/${template.id}`,
      },
    ],
  };

  // Structured Data 3: FAQPage Schema
  const faqSchema =
    seo.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: seo.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Render Template Detail Client View */}
      <TemplateDetailView template={template} />
    </>
  );
}

