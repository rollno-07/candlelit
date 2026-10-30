"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";

interface Scene1IntroProps {
  onComplete: () => void;
}

export function Scene1Intro({ onComplete }: Scene1IntroProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    soundManager.unlockAudio();
    soundManager.playSwooshSound();
    setIsOpen(true);

    setTimeout(() => {
      onComplete();
    }, 1400);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[92vh] px-4 py-8 max-w-lg mx-auto text-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Ambient decorative badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#e0a96d]/40 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#ffe8d6]/90 font-medium">
                A Birthday Surprise
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
            </motion.div>

            {/* Glassmorphic Luxury Letter Envelope Card */}
            <div className="relative w-full rounded-2xl glass-card p-8 md:p-10 border border-[#e0a96d]/30 shadow-2xl overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#e0a96d]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#ff7b90]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Envelope Flap Simulation / Wax Seal */}
              <div className="flex justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-lg border-2 border-[#ffe8cc]/60 relative"
                >
                  <Heart className="w-7 h-7 text-[#2c1308] fill-[#2c1308]" />
                  <span className="absolute -bottom-1 text-[9px] font-serif font-bold text-[#ffe8cc] tracking-widest uppercase">
                    N &amp; V
                  </span>
                </motion.div>
              </div>

              {/* Salutation */}
              <h2 className="font-serif text-3xl md:text-4xl text-gold-gradient font-normal tracking-wide mb-3">
                For My Dearest Nidhi
              </h2>

              <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#e0a96d] to-transparent mb-4" />

              <p className="text-sm md:text-base text-[#d1c4b9] font-light leading-relaxed mb-8 max-w-sm mx-auto">
                A little world crafted just for you, celebrating the warmth, magic, and joy you bring into my life every single day.
              </p>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenGift}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-medium text-sm tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.35)] hover:shadow-[0_0_35px_rgba(255,190,83,0.55)] transition-all duration-300 flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <span>Open My Gift</span>
                <Sparkles className="w-4 h-4 fill-current" />
              </motion.button>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-[#a39487] mt-5 flex items-center gap-1.5"
            >
              <span>🎧</span> Best experienced with sound on
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="unfolding"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-t-[#ffbe53] border-r-transparent border-b-[#e0a96d] border-l-transparent mb-4"
            />
            <h3 className="font-serif text-2xl text-gold-gradient font-light">
              Unfolding your surprise...
            </h3>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
