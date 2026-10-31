"use client";

import React from "react";
import { Sparkles, Palette, Share2, Heart } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Palette,
      title: "Pick Your Occasion",
      desc: "Select from 11 cinematic templates—Birthdays, Anniversaries, Proposals, Valentine's week, Karwa Chauth, and more.",
    },
    {
      step: "02",
      icon: Heart,
      title: "Personalize Moments",
      desc: "Upload your photos, write your streaming love letter, customize rituals (like cake messages or ring boxes), and choose your song.",
    },
    {
      step: "03",
      icon: Share2,
      title: "Share The Magic Link",
      desc: "Generate your unique link (e.g. candleit.one7app.in/birthday-surprise-sophia), share directly on WhatsApp, or send via a QR code.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span className="uppercase tracking-widest text-[11px] font-medium">Simple 3-Step Process</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
          How Candlelit Works
        </h2>
        <p className="mt-2 text-sm text-[#d1c4b9] font-light">
          No coding, no design skills needed. Just pure emotion crafted into interactive art.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="relative rounded-2xl glass-panel border border-[#e0a96d]/20 bg-[#120c20]/60 p-8 flex flex-col items-center text-center group hover:border-[#ffbe53]/50 transition-all duration-300"
            >
              <span className="text-4xl font-serif font-bold text-[#ffbe53]/20 group-hover:text-[#ffbe53]/40 transition-colors mb-4">
                {item.step}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8a4b2a]/40 to-[#ffbe53]/30 border border-[#ffbe53]/40 flex items-center justify-center text-[#ffbe53] mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-2">{item.title}</h3>
              <p className="text-xs text-[#a8998d] leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
