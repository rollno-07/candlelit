import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Happy Birthday Nidhi ✨ | A Little World For You",
  description: "An interactive, romantic birthday experience designed just for Nidhi by Vishal.",
  keywords: ["birthday", "surprise", "romantic", "love letter"],
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
      <body className="min-h-full flex flex-col relative overflow-x-hidden selection:bg-[#e0a96d]/30 selection:text-[#ffbe53]">
        {children}
      </body>
    </html>
  );
}
