import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Candlelit - Digital Craft & Online Surprise Platform",
    short_name: "Candlelit",
    description: "The #1 Digital Craft & Heartcraft Online Surprise Platform",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0714",
    theme_color: "#0a0714",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/cake-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

