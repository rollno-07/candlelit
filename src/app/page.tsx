"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { TemplateGrid } from "@/components/landing/TemplateGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      {/* Dynamic Starlight Background */}
      <BackgroundFX />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Landing Hero Section */}
      <div className="relative z-10 flex-1">
        <HeroSection />
        <TemplateGrid />
        <HowItWorks />
        <FaqSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
