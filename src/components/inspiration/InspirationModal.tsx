"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Copy,
  Check,
  ArrowRight,
  Wand2,
  RefreshCw,
  Heart,
  Clock,
  ShieldAlert,
  Flame,
  BookmarkCheck,
  Search,
} from "lucide-react";
import { InspirationItem } from "@/lib/inspirationData";

interface InspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  recipientName?: string;
  senderName?: string;
  onSelectText?: (text: string) => void;
}

const COOLDOWN_DURATION_MS = 5 * 60 * 1000; // 5 minutes in milliseconds
const COOLDOWN_STORAGE_KEY = "candlelit_ai_inspiration_cooldown_until";

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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [source, setSource] = useState<string>("");

  // Slots & Batches: Slot 1 (initial 10), Slot 2 (regeneration 10)
  const [currentSlot, setCurrentSlot] = useState<number>(1);
  const [slot1Options, setSlot1Options] = useState<InspirationItem[]>([]);
  const [slot2Options, setSlot2Options] = useState<InspirationItem[]>([]);
  const [activeBatchView, setActiveBatchView] = useState<1 | 2>(1);

  // 5-Minute Token Guard Cooldown
  const [cooldownRemainingMs, setCooldownRemainingMs] = useState<number>(0);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync category & recipient name
  useEffect(() => {
    if (initialCategory) setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (recipientName) setRecipient(recipientName);
  }, [recipientName]);

  // Check existing cooldown on mount and when modal opens
  useEffect(() => {
    const checkCooldown = () => {
      try {
        const stored = localStorage.getItem(COOLDOWN_STORAGE_KEY);
        if (stored) {
          const expiry = parseInt(stored, 10);
          const diff = expiry - Date.now();
          if (diff > 0) {
            setCooldownRemainingMs(diff);
            return diff;
          } else {
            localStorage.removeItem(COOLDOWN_STORAGE_KEY);
            setCooldownRemainingMs(0);
          }
        }
      } catch {}
      return 0;
    };

    const remaining = checkCooldown();
    if (remaining > 0) {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
      cooldownTimerRef.current = setInterval(() => {
        const rem = checkCooldown();
        if (rem <= 0 && cooldownTimerRef.current) {
          clearInterval(cooldownTimerRef.current);
          cooldownTimerRef.current = null;
        }
      }, 1000);
    }

    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, [isOpen]);

  const categories = [
    { id: "birthday", label: "🎂 Birthday Wishes" },
    { id: "anniversary", label: "🥂 Anniversary Quotes" },
    { id: "proposal", label: "💍 Proposal Confessions" },
    { id: "valentine", label: "🌹 Valentine Messages" },
    { id: "romantic", label: "💌 Romantic Texts" },
    { id: "retirement", label: "🏆 Retirement Tributes" },
    { id: "mothers-day", label: "💐 Mother's Day" },
    { id: "fathers-day", label: "🕶️ Father's Day" },
    { id: "baby-shower", label: "🍼 Baby Shower" },
  ];

  const tones = [
    "Deep & Romantic",
    "Poetic & Cinematic",
    "Warm & Playful",
    "Short & Sweet",
    "Tearjerker & Vulnerable",
    "Grand & Celebratory",
  ];

  // Helper to trigger 5-minute cooldown
  const startCooldown = () => {
    const expiry = Date.now() + COOLDOWN_DURATION_MS;
    try {
      localStorage.setItem(COOLDOWN_STORAGE_KEY, expiry.toString());
    } catch {}
    setCooldownRemainingMs(COOLDOWN_DURATION_MS);

    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      const diff = expiry - Date.now();
      if (diff <= 0) {
        try {
          localStorage.removeItem(COOLDOWN_STORAGE_KEY);
        } catch {}
        setCooldownRemainingMs(0);
        setCurrentSlot(1);
        if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
      } else {
        setCooldownRemainingMs(diff);
      }
    }, 1000);
  };

  // Main generation handler
  const handleGenerate = async (slotToFetch: number = 1) => {
    // If cooldown is active, prevent fetch
    if (cooldownRemainingMs > 0 && slotToFetch !== 1) return;

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
          slot: slotToFetch,
        }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.options)) {
        if (slotToFetch === 1) {
          setSlot1Options(data.options);
          setActiveBatchView(1);
          setCurrentSlot(2); // Next action will be regeneration slot 2
        } else {
          setSlot2Options(data.options);
          setActiveBatchView(2);
          setCurrentSlot(2);
          // Slot 2 completed! Trigger 5-minute cooldown to protect tokens
          startCooldown();
        }
        setSource(data.source || "");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate initial batch of 10 on first open
  useEffect(() => {
    if (isOpen && slot1Options.length === 0) {
      handleGenerate(1);
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

  // Format seconds to mm:ss
  const formatCooldown = (ms: number) => {
    const totalSec = Math.ceil(ms / 1000);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const activeOptions = activeBatchView === 1 ? slot1Options : slot2Options;
  const isCooldownActive = cooldownRemainingMs > 0;

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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto no-scrollbar rounded-3xl glass-panel border border-[#ffbe53]/35 bg-[#100a1e]/98 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] p-4 sm:p-7 z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-[#1c1208] shadow-[0_0_20px_rgba(255,190,83,0.4)] shrink-0">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-gold-gradient font-light flex items-center gap-1.5">
                  <span>Candlelit Inspiration Studio</span>
                  <Sparkles className="w-4 h-4 text-[#ffbe53] fill-current" />
                </h3>
                <p className="text-xs text-[#a8998d]">
                  AI Literary Ghostwriter • 10 Bespoke Emotional Inspirations Per Generation
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
              Occasion & Ceremony Category
            </label>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setCategory(c.id);
                    setSlot1Options([]);
                    setSlot2Options([]);
                    setCurrentSlot(1);
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

          {/* Action Area: Generate / Regenerate & 5-Min Cooldown Notice */}
          <div className="mb-5 space-y-2.5">
            {isCooldownActive ? (
              /* Cooldown active: User holds for 5 min to save LLM tokens */
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#ffbe53]/15 to-amber-500/10 border border-[#ffbe53]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#ffbe53]/20 border border-[#ffbe53]/40 flex items-center justify-center text-[#ffbe53] shrink-0">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Token Guard Active • 20 Inspirations Ready Above</span>
                    </span>
                    <p className="text-[11px] text-[#d1c4b9] mt-0.5">
                      To preserve high-speed AI tokens, next slot unlocks in:{" "}
                      <strong className="text-[#ffbe53] font-mono font-bold text-xs">
                        {formatCooldown(cooldownRemainingMs)}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-black/60 border border-[#ffbe53]/30 font-mono text-xs font-bold text-[#ffbe53] flex items-center gap-1.5 shrink-0">
                  <span>⏱️</span>
                  <span>{formatCooldown(cooldownRemainingMs)}</span>
                </div>
              </div>
            ) : (
              /* Button: Generate Slot 1 or Regenerate Slot 2 */
              <button
                onClick={() => handleGenerate(currentSlot)}
                disabled={isLoading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#1c1208]" />
                    <span>
                      Crafting 10 {currentSlot === 2 ? "Fresh Regeneration" : "Bespoke"} Inspirations...
                    </span>
                  </>
                ) : currentSlot === 2 ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#1c1208]" />
                    <span>Regenerate 10 Other Fresh Inspirations (Slot 2 of 2)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Generate 10 Bespoke Inspirations</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Batch Selector Tabs (If user generated both slot 1 and slot 2) */}
          {(slot1Options.length > 0 || slot2Options.length > 0) && (
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">Generated Library:</span>
                <button
                  type="button"
                  onClick={() => setActiveBatchView(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeBatchView === 1
                      ? "bg-[#ffbe53]/25 text-[#ffbe53] border border-[#ffbe53]/40 font-bold"
                      : "bg-white/5 text-[#a8998d] hover:text-white"
                  }`}
                >
                  Batch 1 ({slot1Options.length})
                </button>

                {slot2Options.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveBatchView(2)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      activeBatchView === 2
                        ? "bg-[#ffbe53]/25 text-[#ffbe53] border border-[#ffbe53]/40 font-bold"
                        : "bg-white/5 text-[#a8998d] hover:text-white"
                    }`}
                  >
                    Batch 2 ({slot2Options.length})
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-[#ffbe53]">
                <Sparkles className="w-3 h-3 fill-current" />
                <span>
                  {source === "groq-ai" ? "Groq LLaMA 3.3 (70B) AI Agent" : "Curated Master Library"}
                </span>
              </div>
            </div>
          )}

          {/* Generated Results List (Displays 10 rich options) */}
          <div className="space-y-3 mb-2 max-h-[460px] overflow-y-auto no-scrollbar pr-0.5">
            {activeOptions.map((opt, idx) => (
              <div
                key={opt.id || idx}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-[#ffbe53]/40 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base text-white font-medium group-hover:text-[#ffbe53] transition-colors">
                      {opt.title}
                    </h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffbe53]/15 text-[#ffbe53] border border-[#ffbe53]/25 shrink-0">
                    {opt.tone}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#d1c4b9] leading-relaxed mb-3 font-light pl-7">
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
                        <span>Copy Text</span>
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

            {activeOptions.length === 0 && !isLoading && (
              <div className="text-center py-12 text-xs text-[#a8998d]">
                <Wand2 className="w-8 h-8 text-[#ffbe53]/40 mx-auto mb-2" />
                <span>Click generate above to craft 10 bespoke personalized options.</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
