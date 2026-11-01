import { Metadata } from "next";
import { getSurpriseBySlug } from "@/lib/surprisesStore";
import { TEMPLATES } from "@/lib/templatesData";
import ExperiencePage from "../experience/[slug]/page";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const surprise = await getSurpriseBySlug(slug);

  const recipientName = surprise?.recipientName || "Someone Special";
  const template = TEMPLATES.find((t) => t.id === surprise?.templateId) || TEMPLATES[0];
  const image = surprise?.photos?.[0]?.url || template.previewImage;
  const fullImageUrl = image.startsWith("http") ? image : `https://candleit.one7app.in${image}`;

  return {
    title: `A Special Surprise for ${recipientName} ✨`,
    description: `A cinematic 4-act digital celebration created especially for ${recipientName}. Open to experience candles, music, and love letters.`,
    alternates: {
      canonical: `https://candleit.one7app.in/${slug}`,
    },
    openGraph: {
      title: `A Special Surprise for ${recipientName} ✨`,
      description: `A cinematic 4-act digital celebration created especially for ${recipientName}. Open to experience candles, music, and love letters.`,
      url: `https://candleit.one7app.in/${slug}`,
      images: [
        {
          url: fullImageUrl,
          width: 1024,
          height: 1024,
          alt: `Digital Surprise for ${recipientName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `A Special Surprise for ${recipientName} ✨`,
      description: `A cinematic 4-act digital celebration created especially for ${recipientName}.`,
      images: [fullImageUrl],
    },
  };
}

export default function DirectSlugPage() {
  return <ExperiencePage />;
}
