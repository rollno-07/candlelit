import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";

import { SITE_CONFIG } from "@/lib/seoData";
import { JsonLd } from "@/components/seo/JsonLd";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.canonicalUrl),
  title: {
    default: "Candlelit ✨ | Cinematic Digital Surprises for People You Love",
    template: "%s | Candlelit",
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.canonicalUrl }],
  creator: SITE_CONFIG.creator,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.canonicalUrl,
    siteName: SITE_CONFIG.name,
    title: "Candlelit ✨ | Cinematic Digital Surprises for People You Love",
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 1200,
        alt: "Candlelit - Cinematic 4-Act Digital Celebrations with Real Blowable Candle Cakes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candlelit ✨ | Cinematic Digital Surprises for People You Love",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: "@one7app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/cake-icon.svg",
    shortcut: "/cake-icon.svg",
    apple: "/cake-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0714",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} h-full bg-[#0a0714] text-[#fdf8f4] antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden selection:bg-[#e0a96d]/30 selection:text-[#ffbe53]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
