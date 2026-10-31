"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TemplateGrid } from "@/components/landing/TemplateGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If user opened root with ?act= parameter directly, redirect to the flagship experience
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("act")) {
        router.push(`/experience/birthday-surprise?${params.toString()}`);
      }
    }
  }, [router]);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      {/* Dynamic Starlight Background */}
      <BackgroundFX />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Landing Hero Section */}
      <div className="relative z-10">
        <HeroSection />
        <TemplateGrid />
        <HowItWorks />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
