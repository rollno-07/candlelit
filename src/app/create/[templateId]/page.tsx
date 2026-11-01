import { Metadata } from "next";
import { TEMPLATES } from "@/lib/templatesData";
import { CreateSurpriseClient } from "@/components/builder/CreateSurpriseClient";

interface PageProps {
  params: Promise<{ templateId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { templateId } = await params;
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  return {
    title: `Customize ${template.title}`,
    description: `Personalize photos, music, streaming letters, and rituals for ${template.title} on Candlelit.`,
    alternates: {
      canonical: `https://candleit.one7app.in/create/${template.id}`,
    },
    openGraph: {
      title: `Customize ${template.title} | Candlelit`,
      description: template.shortDescription,
      images: [
        {
          url: `https://candleit.one7app.in${template.previewImage}`,
          width: 1024,
          height: 1024,
          alt: template.title,
        },
      ],
    },
  };
}

export default function CreateSurprisePage() {
  return <CreateSurpriseClient />;
}
