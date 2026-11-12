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
    default: "Candlelit ✨ | #1 Digital Craft & Online Surprise Platform (Birthday & Anniversary Heartcraft)",
    template: "%s | Candlelit Digital Craft & Online Surprise",
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
    title: "Candlelit ✨ | #1 Digital Craft & Heartcraft Online Surprise Platform",
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 1200,
        alt: "Candlelit - #1 Digital Craft & Heartcraft Online Surprise Platform for Birthdays & Anniversaries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candlelit ✨ | #1 Digital Craft & Heartcraft Online Surprise Platform",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/cake-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
