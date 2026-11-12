import { Metadata } from "next";
import { TemplatesView } from "@/components/templates/TemplatesView";

export const metadata: Metadata = {
  title: "Digital Craft & Online Surprise Catalog (11 Storylines) | Candlelit",
  description:
    "Explore 11 curated digital crafts and heartcraft online surprises. Featuring the #1 Birthday Digital Surprise with real candle-blowing cake, Anniversary milestones, Proposals, and Valentine journeys.",
  keywords: [
    "digital craft",
    "heartcraft digital surprise",
    "online surprise",
    "birthday digital surprise",
    "birthday digital suprise",
    "anniversary digital surprise",
    "anversry digital surprise",
    "digital love craft",
    "heart craft surprise",
    "online celebration link",
  ],
  alternates: {
    canonical: "https://candleit.one7app.in/templates",
  },
  openGraph: {
    title: "Digital Craft & Online Surprise Catalog | 11 Cinematic Heartcraft Storylines",
    description:
      "Explore 11 curated digital crafts and heartcraft online surprises. Featuring interactive candle-blowing cakes, champagne toasts, and streaming letters.",
    url: "https://candleit.one7app.in/templates",
  },
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
