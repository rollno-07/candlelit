import { Metadata } from "next";
import { TemplatesView } from "@/components/templates/TemplatesView";

export const metadata: Metadata = {
  title: "Occasion Templates Catalog (11 Storylines)",
  description:
    "Explore 11 curated interactive celebration storylines with candle-blowing cakes, diamond ring reveals, and streaming love letters.",
  alternates: {
    canonical: "https://candleit.one7app.in/templates",
  },
  openGraph: {
    title: "Candlelit Templates Catalog | 11 Cinematic Digital Celebrations",
    description:
      "Explore 11 curated interactive celebration storylines with candle-blowing cakes, diamond ring reveals, and streaming love letters.",
    url: "https://candleit.one7app.in/templates",
  },
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
