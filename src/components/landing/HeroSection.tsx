"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, ArrowRight, Play, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#e0a96d]/20 via-[#ffbe53]/15 to-[#ff7b90]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top pill badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] mb-6 shadow-lg"
      >
        <span className="w-2 h-2 rounded-full bg-[#ffbe53] animate-ping" />
        <span className="font-medium tracking-wide uppercase text-[11px] text-[#ffbe53]">
          11 Interactive Cinematic Templates
        </span>
        <span className="text-[#a8998d]">|</span>
        <span className="text-[#d1c4b9]">Ready to Personalize</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#fdf8f4] leading-[1.15] max-w-4xl tracking-tight"
      >
        Turn Your Feelings Into An{" "}
        <span className="text-gold-gradient font-normal italic">
          Unforgettable Digital Surprise
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 text-base sm:text-lg md:text-xl text-[#d1c4b9] font-light max-w-2xl leading-relaxed"
      >
        Craft a breathtaking 4-act experience with interactive candle-blowing cakes, floating polaroid memories, romantic music, and streaming love letters in under 3 minutes.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <Link
          href="/templates"
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(255,190,83,0.4)] hover:shadow-[0_0_45px_rgba(255,190,83,0.6)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Choose a Template to Start</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/experience/birthday-surprise"
          className="w-full sm:w-auto px-7 py-4 rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53] text-[#ffe8d6] text-sm font-medium transition-all flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 cursor-pointer"
        >
          <Play className="w-4 h-4 text-[#ffbe53] fill-current" />
          <span>Experience Live Demo</span>
        </Link>
      </motion.div>

      {/* Trust points */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#a8998d]"
      >
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span>Real Microphone Candle Blowing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span>Curated Romantic BGM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span>Instant Shareable Link</span>
        </div>
      </motion.div>

      {/* Interactive Visual Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="mt-14 w-full max-w-4xl relative rounded-3xl p-1 bg-gradient-to-b from-[#e0a96d]/40 via-white/10 to-transparent shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
      >
        <div className="relative rounded-[22px] overflow-hidden bg-[#120c20]/90 backdrop-blur-xl border border-white/10 p-4 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Visual preview of Cake & Candles */}
            <div className="relative w-full md:w-1/2 aspect-square max-w-sm rounded-2xl overflow-hidden border border-[#e0a96d]/30 shadow-2xl group">
              <Image
                src="/images/real_birthday_cake.jpg"
                alt="Photorealistic Cake Preview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4 text-left">
                <span className="text-[11px] font-semibold text-[#ffbe53] tracking-widest uppercase">
                  Act III: Interactive Real Cake
                </span>
                <p className="text-xs text-[#d1c4b9] mt-0.5">
                  5 real candles you can blow out with breath, rising smoke & golden cake cutting.
                </p>
              </div>
            </div>

            {/* Feature highlights & Storyline breakdown */}
            <div className="w-full md:w-1/2 text-left flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#ffbe53] font-medium uppercase tracking-wider">
                <Heart className="w-3.5 h-3.5 fill-current text-[#ff7b90]" />
                <span>The 4-Act Emotional Arc</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] flex items-center justify-center text-xs font-bold shrink-0">
                    I
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">The Royal Invitation</h4>
                    <p className="text-[11px] text-[#a8998d]">
                      An elegant wax seal letter sealed with custom initials.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] flex items-center justify-center text-xs font-bold shrink-0">
                    II
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Starlight Balloons & Memories</h4>
                    <p className="text-[11px] text-[#a8998d]">
                      Interactive popping balloons that reveal your cherished photo polaroids.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] flex items-center justify-center text-xs font-bold shrink-0">
                    III
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">The Cake & Candle Ceremony</h4>
                    <p className="text-[11px] text-[#a8998d]">
                      Make a wish, blow out the candles, and slice the cake with confetti.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] flex items-center justify-center text-xs font-bold shrink-0">
                    IV
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Streaming Love Letter</h4>
                    <p className="text-[11px] text-[#a8998d]">
                      Words stream line by line with auto-scroll over your special photo card.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/create/birthday-surprise"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#ffbe53] hover:text-white transition-colors pt-2"
              >
                <span>Customize this template now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
