"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { BackgroundFX } from "@/components/BackgroundFX";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      <BackgroundFX />
      <Navbar />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-24 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_25px_rgba(255,190,83,0.4)] mb-4">
          <span className="text-2xl">🕯️</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-gold-gradient font-light mb-2">
          Page Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#d1c4b9] font-light max-w-sm mb-8 leading-relaxed">
          The surprise or page you are looking for may have moved or doesn&apos;t exist yet. Explore all occasion templates to create your own digital surprise.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/templates"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Browse All 11 Templates</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full glass-panel border border-white/10 hover:border-[#ffbe53] text-[#ffe8d6] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
