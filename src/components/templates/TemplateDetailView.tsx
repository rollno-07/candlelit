"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  ChevronDown,
  Star,
  Lock,
  Share2,
  Music,
  Heart,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { TemplateDefinition } from "@/types/candlelit";
import { TEMPLATES } from "@/lib/templatesData";
import { TEMPLATE_SEO_MAP } from "@/lib/templateSeoData";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";
import { useAuth } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";

interface TemplateDetailViewProps {
  template: TemplateDefinition;
}

export function TemplateDetailView({ template }: TemplateDetailViewProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const seo = TEMPLATE_SEO_MAP[template.id] || {
    id: template.id,
    metaTitle: `${template.title} | Candlelit`,
    metaDescription: template.shortDescription,
    targetKeywords: [],
    h1: template.title,
    heroBadge: "4-Act Cinematic Storyline",
    heroTagline: template.shortDescription,
    highlights: [],
    faqs: [],
    ratingValue: 4.96,
    ratingCount: 1100,
  };

  const handleStartCreation = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      router.push(`/create/${template.id}`);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    router.push(`/create/${template.id}`);
  };

  // Other related templates for SEO internal links
  const relatedTemplates = TEMPLATES.filter((t) => t.id !== template.id).slice(0, 3);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      {/* Dynamic Starlight Background */}
      <BackgroundFX />

      {/* Global Navbar */}
      <Navbar />

      <div className="relative z-10 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex-1 w-full">
        {/* Breadcrumb Navigation for SEO & UX */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#a8998d]">
          <Link href="/" className="hover:text-[#ffbe53] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/templates" className="hover:text-[#ffbe53] transition-colors">
            Occasion Catalog
          </Link>
          <span>/</span>
          <span className="text-white font-medium truncate">{template.title}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
          {/* Left Column: Headline, Highlights & Primary CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#e0a96d]/35 text-xs text-[#ffe8d6]">
              <span className="w-2 h-2 rounded-full bg-[#ffbe53] animate-ping" />
              <span className="text-[11px] font-semibold text-[#ffbe53] uppercase tracking-wider">
                {seo.heroBadge}
              </span>
              <span className="text-[#a8998d]">|</span>
              <span className="flex items-center gap-1 text-[#ffbe53]">
                <Star className="w-3 h-3 fill-current" />
                <span className="font-bold text-[11px]">{seo.ratingValue}</span>
                <span className="text-[#a8998d] text-[10px]">({seo.ratingCount} reviews)</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-light text-[#fdf8f4] leading-[1.15] tracking-tight">
              {seo.h1}
            </h1>

            <p className="text-sm sm:text-base text-[#d1c4b9] font-light leading-relaxed max-w-xl">
              {seo.heroTagline}
            </p>

            {/* Pricing Value Callout */}
            <div className="flex items-center gap-3 py-1">
              <span className="font-serif text-2xl font-bold text-gold-gradient">₹250</span>
              <span className="text-xs text-[#a8998d]">One-time lifetime pass • Unlimited views • No app needed</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleStartCreation}
                className="py-3.5 px-7 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.4)] hover:shadow-[0_0_35px_rgba(255,190,83,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Personalize This Experience Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href={`/experience/${template.id}`}
                className="py-3.5 px-6 rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53] text-[#ffe8d6] hover:text-white text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#ffbe53] fill-current" />
                <span>Experience Live Demo</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#a8998d]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
                <span>Instant WhatsApp Shareable Link</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
                <span>Works on all iOS & Android Browsers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
                <span>Built-in Ambient Sound Synthesizer</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#ffbe53]/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#120a20]/90 p-3 group">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-black/60">
                <Image
                  src={template.previewImage}
                  alt={template.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120a20] via-black/30 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#ffe8d6] flex items-center gap-1.5">
                  <span>{template.emoji}</span>
                  <span>{template.tag}</span>
                </div>

                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-[#ffbe53] border border-[#ffbe53]/30">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>Interactive 4-Act Ceremony Preview</span>
                  </span>
                </div>
              </div>

              {/* 4 Acts Quick Pill Summary */}
              <div className="mt-3.5 p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#ffbe53]">
                  4-Act Emotional Flow:
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#d1c4b9]">
                  {template.acts.map((act) => (
                    <div key={act.actNumber} className="truncate">
                      <span className="text-[#ffbe53] font-semibold">Act {act.actNumber}:</span>{" "}
                      <span>{act.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Act Deep Walkthrough Section */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-2xl sm:text-4xl text-gold-gradient font-light">
              The 4-Act Emotional Journey
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#a8998d]">
              Every act is engineered with cinematic timing, sound cues, and tactile interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {template.acts.map((act) => (
              <div
                key={act.actNumber}
                className="p-5 rounded-2xl glass-panel border border-[#e0a96d]/20 bg-[#120c20]/80 hover:border-[#ffbe53]/50 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#ffbe53]/20 border border-[#ffbe53]/40 flex items-center justify-center text-xs font-bold text-[#ffbe53] mb-3">
                    {act.actNumber}
                  </div>
                  <h3 className="font-serif text-lg text-white font-medium mb-1.5">{act.title}</h3>
                  <p className="text-xs text-[#a8998d] leading-relaxed">{act.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] uppercase font-semibold text-[#ffbe53]">
                  Act {act.actNumber} of 4
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Highlights & Interactive Tech */}
        {seo.highlights.length > 0 && (
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-serif text-2xl sm:text-4xl text-gold-gradient font-light">
                Why Candlelit Experiences Feel Real
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#a8998d]">
                State-of-the-art Web Audio physics, 3D typography, and AI vision enhancements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {seo.highlights.map((hl, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#140c24]/70 hover:border-[#ffbe53]/40 transition-all shadow-md"
                >
                  <span className="text-3xl block mb-3">{hl.icon}</span>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{hl.title}</h3>
                  <p className="text-xs text-[#a8998d] leading-relaxed font-light">{hl.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Occasion-Specific FAQs (Matches FAQ JSON-LD) */}
        {seo.faqs.length > 0 && (
          <section className="mb-20 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light">
                Frequently Asked Questions
              </h2>
              <p className="mt-1.5 text-xs text-[#a8998d]">
                Everything you need to know about customizing and sending this celebration.
              </p>
            </div>

            <div className="space-y-3">
              {seo.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl glass-panel border border-white/10 bg-[#120c20]/80 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-medium text-white">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#ffbe53] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 sm:px-5 pb-4 text-xs text-[#d1c4b9] leading-relaxed border-t border-white/5 pt-3 font-light">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Cross-Page SEO Internal Links (Related Occasions) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-white font-medium">
                Explore Other Occasions
              </h2>
              <p className="text-xs text-[#a8998d]">Discover our 11 curated cinematic storylines</p>
            </div>
            <Link
              href="/templates"
              className="text-xs font-semibold text-[#ffbe53] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View All 11</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {relatedTemplates.map((rel) => (
              <Link
                key={rel.id}
                href={`/templates/${rel.id}`}
                className="group p-4 rounded-2xl glass-panel border border-white/10 hover:border-[#ffbe53]/50 bg-[#120c20]/70 transition-all block shadow-md hover:-translate-y-1"
              >
                <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-black">
                  <Image
                    src={rel.previewImage}
                    alt={rel.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-white">
                    <span>{rel.emoji}</span> {rel.tag}
                  </div>
                </div>
                <h3 className="font-serif text-base text-white font-medium group-hover:text-[#ffbe53] transition-colors truncate">
                  {rel.title}
                </h3>
                <p className="text-[11px] text-[#a8998d] line-clamp-2 mt-1">{rel.shortDescription}</p>
                <span className="text-[11px] font-semibold text-[#ffbe53] mt-2 inline-flex items-center gap-1">
                  <span>Explore Storyline</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Banner CTA */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-[#ffbe53]/40 bg-gradient-to-r from-[#201235]/90 via-[#160c26]/90 to-[#281310]/90 text-center shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-xl shadow-[0_0_20px_rgba(255,190,83,0.4)] mb-3">
            <span>🕯️</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
            Ready to craft your surprise for {template.title}?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#d1c4b9] max-w-lg mx-auto">
            Takes less than 3 minutes. Personalize photos, cake messages, and heartfelt streaming wishes.
          </p>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={handleStartCreation}
              className="py-3 px-8 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.4)] hover:shadow-[0_0_35px_rgba(255,190,83,0.6)] active:scale-95 transition-all cursor-pointer"
            >
              Start Personalizing Now (₹250)
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Auth Modal for Creation Flow */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        title={`Sign In to Customize ${template.title}`}
        subtitle="Sign in or create a free account to personalize this template and save your surprise."
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}

