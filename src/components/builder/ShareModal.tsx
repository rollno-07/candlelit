"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check, Copy, Share2, ExternalLink, Sparkles, X, Heart } from "lucide-react";
import { formatSurpriseShareUrl, formatSurpriseWebUrl } from "@/lib/surprisesStore";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  slug: string;
  recipientName: string;
}

export function ShareModal({ isOpen, onClose, slug, recipientName }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const displayShareUrl = formatSurpriseShareUrl(slug);
  const actualWebUrl = formatSurpriseWebUrl(slug);

  useEffect(() => {
    if (isOpen) {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffbe53", "#e0a96d", "#ff7b90", "#ffd700", "#ffffff"],
      });
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(actualWebUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hey ${recipientName}! ❤️ I created a special digital surprise just for you. Open it here: ${actualWebUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl glass-panel border border-[#e0a96d]/40 bg-[#120c20]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden z-10 text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#a8998d] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Celebration Header */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_25px_rgba(255,190,83,0.5)] mb-4 animate-bounce">
            <span className="text-2xl">🎉</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light">
            Your Surprise is Ready!
          </h3>
          <p className="text-xs sm:text-sm text-[#d1c4b9] mt-1.5 max-w-sm mx-auto">
            A bespoke cinematic world created for <strong className="text-[#ffbe53]">{recipientName}</strong>. Send it to make their day unforgettable.
          </p>

          {/* Share Link Box */}
          <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-[#e0a96d]/30 text-left">
            <span className="text-[10px] uppercase tracking-wider text-[#a8998d] font-semibold block mb-1">
              Custom Surprise Link:
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs sm:text-sm text-[#ffbe53] truncate select-all">
                {displayShareUrl}
              </span>
              <button
                onClick={handleCopy}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 text-xs font-medium text-[#ffbe53] border border-[#ffbe53]/40 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleWhatsAppShare}
              className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#0d2a15] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            <Link
              href={`/experience/${slug}`}
              target="_blank"
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] transition-all active:scale-95 cursor-pointer"
            >
              <span>Open Live Experience</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Bottom hint */}
          <p className="mt-5 text-[11px] text-[#a8998d] flex items-center justify-center gap-1">
            <Heart className="w-3 h-3 text-[#ff7b90] fill-current" />
            <span>Works seamlessly on mobile, desktop, and tablets with audio support</span>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
