"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Copy, Check, ArrowRight, Wand2, RefreshCw, Heart } from "lucide-react";
import { InspirationItem } from "@/lib/inspirationData";

interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  recipientName?: string;
  senderName?: string;
  onSelectText?: (text: string) => void;
}

export function InspirationModal({
  isOpen,
  onClose,
  initialCategory = "birthday",
  recipientName = "",
  senderName = "",
  onSelectText,
}: InspirationModalProps) {
  const [category, setCategory] = useState(initialCategory);
  const [recipient, setRecipient] = useState(recipientName);
  const [tone, setTone] = useState("Deep & Romantic");
  const [details, setDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<InspirationItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (recipientName) {
      setRecipient(recipientName);
    }
  }, [recipientName]);

  const categories = [
    { id: "birthday", label: "🎂 Birthday Wishes" },
    { id: "anniversary", label: "🥂 Anniversary Quotes" },
    { id: "proposal", label: "💍 Proposal Confessions" },
    { id: "valentine", label: "🌹 Valentine Messages" },
    { id: "romantic", label: "💌 Romantic Texts" },
    { id: "retirement", label: "🏆 Retirement Tributes" },
    { id: "mothers-day", label: "💐 Mother's Day" },
    { id: "baby-shower", label: "🍼 Baby Shower" },
  ];

  const tones = [
    "Deep & Romantic",
    "Poetic & Cinematic",
    "Warm & Playful",
    "Short & Sweet",
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          recipientName: recipient || "My Love",
          senderName: senderName || "With All My Heart",
          tone,
          details,
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.options)) {
        setOptions(data.options);
        setSource(data.source || "");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate initial batch on open
  useEffect(() => {
    if (isOpen && options.length === 0) {
      handleGenerate();
    }
  }, [isOpen, category]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleUseText = (text: string) => {
    if (onSelectText) {
      onSelectText(text);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl glass-panel border border-[#ffbe53]/35 bg-[#100a1e]/98 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-7 z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-[#1c1208] shadow-[0_0_15px_rgba(255,190,83,0.4)]">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-gold-gradient font-light flex items-center gap-1.5">
                  <span>Candlelit Inspiration Studio</span>
                  <Sparkles className="w-4 h-4 text-[#ffbe53] fill-current" />
                </h3>
                <p className="text-xs text-[#a8998d]">
                  Bespoke emotional wishes & poetic quotes crafted in seconds
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#a8998d] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-[#ffbe53]" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[#a8998d] uppercase tracking-wider mb-2">
              Select Celebration Category
            </label>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setOptions([]);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    category === c.id
                      ? "bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] font-bold shadow-[0_0_15px_rgba(255,190,83,0.35)]"
                      : "bg-white/5 hover:bg-white/10 text-[#d1c4b9] border border-white/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customization Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#a8998d] uppercase tracking-wider mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Sophia, Mom, Alex"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8998d] uppercase tracking-wider mb-1">
                Emotional Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#ffbe53]"
              >
                {tones.map((t) => (
                  <option key={t} value={t} className="bg-[#120c20]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer mb-5"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-[#1c1208]" />
                <span>Crafting Unique Options...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Bespoke Inspiration</span>
              </>
            )}
          </button>

          {/* Generated Results List */}
          <div className="space-y-3 mb-2">
            <div className="flex items-center justify-between text-[11px] text-[#a8998d]">
              <span>Curated Variations</span>
              {source === "groq-ai" && (
                <span className="flex items-center gap-1 text-[#ffbe53]">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Powered by Groq AI Agent</span>
                </span>
              )}
            </div>

            {options.map((opt) => (
              <div
                key={opt.id}
                className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-[#ffbe53]/40 transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className="font-serif text-base text-white font-medium group-hover:text-[#ffbe53] transition-colors">
                    {opt.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffbe53]/15 text-[#ffbe53] border border-[#ffbe53]/25 shrink-0">
                    {opt.tone}
                  </span>
                </div>

                <p className="text-xs text-[#d1c4b9] leading-relaxed mb-3 font-light">
                  &ldquo;{opt.text}&rdquo;
                </p>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleCopy(opt.id, opt.text)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#ffe8d6] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedId === opt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  {onSelectText && (
                    <button
                      onClick={() => handleUseText(opt.text)}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow"
                    >
                      <span>Use in My Surprise</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

