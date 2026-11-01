"use client";

import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { TemplateGrid } from "@/components/landing/TemplateGrid";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";

export function TemplatesView() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4] pt-16">
      <BackgroundFX />
      <Navbar />

      <div className="relative z-10 flex-1">
        <TemplateGrid />
      </div>

      <Footer />
    </main>
  );
}
