"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TEMPLATES } from "@/lib/templatesData";
import { TemplateCategory } from "@/types/candlelit";
import { Sparkles, ArrowRight, Heart, Calendar } from "lucide-react";

export function TemplateGrid() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("all");

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: "all", label: "All Templates (11)" },
    { id: "romance", label: "Romance & Love" },
    { id: "milestones", label: "Milestones & Life" },
    { id: "celebrations", label: "Celebrations & Special Days" },
  ];

  const filteredTemplates =
    activeCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <section id="templates" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span className="uppercase tracking-widest text-[11px] font-medium">
            Curated Occasion Catalog
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-gradient font-light">
          Choose Your Storyline
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#d1c4b9] font-light">
          Every template is crafted with cinematic pacing, custom music, and rich emotional interactions.
        </p>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === c.id
                  ? "bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] font-semibold shadow-[0_0_15px_rgba(255,190,83,0.4)]"
                  : "glass-panel border border-white/10 text-[#d1c4b9] hover:text-white hover:border-[#ffbe53]/40"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative rounded-2xl glass-panel border border-[#e0a96d]/20 hover:border-[#ffbe53]/60 bg-[#120c20]/80 backdrop-blur-xl overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_10px_35px_rgba(255,190,83,0.15)] transition-all duration-300 hover:-translate-y-1"
          >
            {/* Template Thumbnail & Header */}
            <div>
              <div className="relative h-48 w-full overflow-hidden bg-black/40">
                <Image
                  src={template.previewImage}
                  alt={template.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c20] via-black/40 to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-[#ffe8d6] flex items-center gap-1.5 shadow">
                  <span>{template.emoji}</span>
                  <span>{template.tag}</span>
                </div>
              </div>

              {/* Content Info */}
              <div className="p-6">
                <h3 className="font-serif text-2xl text-white font-medium group-hover:text-[#ffbe53] transition-colors">
                  {template.title}
                </h3>
                <p className="mt-2 text-xs text-[#a8998d] leading-relaxed line-clamp-2">
                  {template.shortDescription}
                </p>

                {/* 4-Act preview summary */}
                <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#ffbe53] font-semibold block">
                    4-Act Journey:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#d1c4b9]">
                    {template.acts.map((act) => (
                      <span key={act.actNumber} className="truncate flex items-center gap-1">
                        <span className="text-[#ffbe53] font-bold">Act {act.actNumber}:</span>
                        <span>{act.title}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex items-center gap-3">
              <Link
                href={`/create/${template.id}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(255,190,83,0.25)] hover:shadow-[0_0_25px_rgba(255,190,83,0.45)] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Customize Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/experience/${template.id}`}
                title={`Preview ${template.title}`}
                className="p-2.5 rounded-xl glass-panel border border-white/10 hover:border-[#ffbe53] text-[#d1c4b9] hover:text-[#ffbe53] transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
