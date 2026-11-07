"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, Check } from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";

interface BalloonData {
  id: number;
  colorGradient: string;
  stringColor: string;
  photoUrl: string;
  title: string;
  subtitle: string;
  note: string;
  xOffset: number; // percentage
  floatDelay: number;
  floatDuration: number;
}

const BALLOONS: BalloonData[] = [
  {
    id: 1,
    colorGradient: "linear-gradient(135deg, #f7c59f 0%, #e0a96d 60%, #9e5b2d 100%)",
    stringColor: "#e0a96d",
    photoUrl: "/images/polaroids/photo_rooftop.jpg",
    title: "That Radiant Smile",
    subtitle: "Rooftop Celebrations",
    note: "Your laughter has this magical way of melting away every worry. Being beside you as you smile is my absolute favorite place in the world.",
    xOffset: 12,
    floatDelay: 0,
    floatDuration: 4.8,
  },
  {
    id: 2,
    colorGradient: "linear-gradient(135deg, #ffe599 0%, #ffbe53 60%, #b87b1c 100%)",
    stringColor: "#ffbe53",
    photoUrl: "/images/polaroids/photo_beach.jpg",
    title: "Golden Hour Together",
    subtitle: "Endless Horizons",
    note: "Walking hand in hand with you along the shore, with the sea breeze and golden sunlight, I realized forever with you will never be long enough.",
    xOffset: 32,
    floatDelay: 0.6,
    floatDuration: 5.4,
  },
  {
    id: 3,
    colorGradient: "linear-gradient(135deg, #ffa8b6 0%, #ff7b90 60%, #a82e44 100%)",
    stringColor: "#ff7b90",
    photoUrl: "/images/polaroids/photo_festive.jpg",
    title: "Sparklers & Starlight",
    subtitle: "Festive Magic",
    note: "In a room full of lights and celebrations, my eyes will always search for you. You bring genuine sparkle and warmth to every single festival.",
    xOffset: 52,
    floatDelay: 1.2,
    floatDuration: 5.0,
  },
  {
    id: 4,
    colorGradient: "linear-gradient(135deg, #ffd3b6 0%, #f4a261 60%, #b35422 100%)",
    stringColor: "#f4a261",
    photoUrl: "/images/polaroids/photo_roses.jpg",
    title: "Surprise Roses For You",
    subtitle: "A Little Token of Love",
    note: "A million flowers could never match your grace. Seeing your eyes light up with surprise is the greatest gift you could ever give me.",
    xOffset: 72,
    floatDelay: 0.4,
    floatDuration: 4.6,
  },
  {
    id: 5,
    colorGradient: "linear-gradient(135deg, #d8b4e2 0%, #b5838d 60%, #6d3b47 100%)",
    stringColor: "#b5838d",
    photoUrl: "/images/polaroids/photo_mountains.jpg",
    title: "Mountain Mist & Us",
    subtitle: "Adventures Side-by-Side",
    note: "Through cloudy heights, windy roads, and every season of life, you are my steadfast adventure partner, my peace, and my greatest blessing.",
    xOffset: 90,
    floatDelay: 0.9,
    floatDuration: 5.2,
  },
];

interface Scene2BalloonsProps {
  onComplete: () => void;
  photos?: { url: string; caption: string }[];
  templateId?: string;
}

interface Act2Meta {
  badge: string;
  emoji: string;
  heading: string;
  nextCta: string;
}

const TEMPLATE_ACT2_METAS: Record<string, Act2Meta> = {
  "birthday-surprise": {
    badge: "Act II: Celebration Memories",
    emoji: "🎂",
    heading: "Pop each balloon to reveal a memory ✨",
    nextCta: "All Memories Unlocked! Slice The Cake 🎂",
  },
  "anniversary": {
    badge: "Act II: Our Journey Together",
    emoji: "🥂",
    heading: "Tap each milestone sphere to unlock a memory 🥂",
    nextCta: "All Memories Unlocked! The Champagne Toast 🥂",
  },
  "propose": {
    badge: "Act II: Reasons I Fell For You",
    emoji: "💍",
    heading: "Tap each love crystal to reveal a moment 💎",
    nextCta: "All Memories Unlocked! The Big Question 💍",
  },
  "valentine": {
    badge: "Act II: Velvet Love & Romance",
    emoji: "🌹",
    heading: "Tap each floating rose to unlock a memory 🌹",
    nextCta: "All Memories Unlocked! Unlock My Heart 🌹",
  },
  "karwa-chauth": {
    badge: "Act II: Sacred Memories & Vows",
    emoji: "🌙",
    heading: "Tap each glowing diya to illuminate a memory 🌙",
    nextCta: "All Memories Unlocked! Behold The Moon 🌙",
  },
  "pregnancy-reveal": {
    badge: "Act II: The Journey to Our Miracle",
    emoji: "🍼",
    heading: "Tap each soft cloud to unlock a memory 🍼",
    nextCta: "All Memories Unlocked! Reveal Our Secret 🍼",
  },
  "baby-shower": {
    badge: "Act II: Wonderland of Wishes",
    emoji: "👶",
    heading: "Tap each floating star to reveal a sweet wish 👶",
    nextCta: "All Memories Unlocked! Shower of Blessings 👶",
  },
  "retirement": {
    badge: "Act II: Career Milestones & Honors",
    emoji: "🏆",
    heading: "Tap each honor badge to celebrate a milestone 🏆",
    nextCta: "All Memories Unlocked! Award The Trophy 🏆",
  },
  "mothers-day": {
    badge: "Act II: Moments of Pure Gratitude",
    emoji: "💐",
    heading: "Tap each blooming peony to reveal a moment with Mom 💐",
    nextCta: "All Memories Unlocked! Bloom Mom's Bouquet 💐",
  },
  "fathers-day": {
    badge: "Act II: Dad's Hall of Fame",
    emoji: "🕶️",
    heading: "Tap each champion badge to unlock a moment with Dad 🕶️",
    nextCta: "All Memories Unlocked! Award Dad's Medal 🕶️",
  },
  "womens-day": {
    badge: "Act II: Shining Moments of Brilliance",
    emoji: "👑",
    heading: "Tap each crystal gem to celebrate her brilliance 👑",
    nextCta: "All Memories Unlocked! Crown The Queen 👑",
  },
};

export function Scene2Balloons({ onComplete, photos, templateId = "birthday-surprise" }: Scene2BalloonsProps) {
  const [poppedIds, setPoppedIds] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<BalloonData | null>(null);
  const actMeta = TEMPLATE_ACT2_METAS[templateId] || TEMPLATE_ACT2_METAS["birthday-surprise"];

  const balloonsList = React.useMemo(() => {
    const rawList =
      photos && photos.length > 0
        ? BALLOONS.slice(0, Math.min(BALLOONS.length, photos.length)).map((b, i) => ({
            ...b,
            photoUrl: photos[i].url,
            title: photos[i].caption || b.title,
            note: photos[i].caption || b.note,
          }))
        : BALLOONS;

    const total = rawList.length;

    return rawList.map((b, i) => {
      // Calculate balanced, symmetrical horizontal position across the full stage
      let xOffset = 50;
      if (total === 1) {
        xOffset = 50;
      } else if (total === 2) {
        xOffset = i === 0 ? 34 : 66;
      } else if (total === 3) {
        const positions = [22, 50, 78];
        xOffset = positions[i] ?? 50;
      } else if (total === 4) {
        const positions = [18, 38, 62, 82];
        xOffset = positions[i] ?? 50;
      } else {
        const step = 76 / Math.max(1, total - 1);
        xOffset = 12 + i * step;
      }

      // Elegant vertical float heights in the center visual band of the sky
      const yOffsets = [20, 34, 18, 32, 22];
      const yOffset = yOffsets[i % yOffsets.length];

      return {
        ...b,
        xOffset,
        yOffset,
      };
    });
  }, [photos]);

  const handlePop = (balloon: BalloonData & { yOffset?: number }) => {
    if (poppedIds.includes(balloon.id)) return;

    soundManager.playPopSound();
    setPoppedIds((prev) => [...prev, balloon.id]);
    setActiveMemory(balloon);
  };

  const allPopped = poppedIds.length === balloonsList.length;

  return (
    <div className="relative z-10 w-full h-full min-h-[500px] flex flex-col items-center justify-between px-4 py-3 sm:py-6 overflow-hidden">
      {/* Top Banner / Progress */}
      <div className="w-full max-w-md mx-auto text-center shrink-0 pt-1 pb-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 mb-2 shadow-sm"
        >
          <span className="text-sm">{actMeta.emoji}</span>
          <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
            {actMeta.badge}
          </span>
          <span className="text-sm">{actMeta.emoji}</span>
        </motion.div>

        <h2 className="font-serif text-2xl md:text-3xl text-gold-gradient font-light">
          {actMeta.heading}
        </h2>

        {/* Counter */}
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-[#d1c4b9]">
          <span>Memories Revealed:</span>
          <span className="text-[#ffbe53] font-semibold">{poppedIds.length}</span>
          <span>/</span>
          <span>{balloonsList.length}</span>
          <div className="flex items-center gap-1 ml-2">
            {balloonsList.map((b) => (
              <span
                key={b.id}
                className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${
                  poppedIds.includes(b.id)
                    ? "bg-[#ffbe53] shadow-[0_0_8px_#ffbe53]"
                    : "bg-[#ffffff]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Balloon Sky Area */}
      <div className="relative w-full max-w-4xl flex-1 min-h-[300px] sm:min-h-[380px] my-auto">
        {balloonsList.map((balloon) => {
          const isPopped = poppedIds.includes(balloon.id);

          return (
            <AnimatePresence key={balloon.id}>
              {!isPopped ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 80 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -18, 0],
                    rotate: [-2, 2, -2],
                  }}
                  exit={{
                    scale: [1, 1.4, 0],
                    opacity: [1, 0.8, 0],
                    filter: "brightness(2)",
                    transition: { duration: 0.25 },
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      duration: balloon.floatDuration,
                      ease: "easeInOut",
                      delay: balloon.floatDelay,
                    },
                    rotate: {
                      repeat: Infinity,
                      duration: balloon.floatDuration * 1.2,
                      ease: "easeInOut",
                      delay: balloon.floatDelay,
                    },
                  }}
                  onClick={() => handlePop(balloon)}
                  style={{
                    left: `calc(${balloon.xOffset}% - 38px)`,
                    top: `${balloon.yOffset ?? 25}%`,
                  }}
                  className="absolute cursor-pointer select-none group flex flex-col items-center touch-manipulation"
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Balloon Body */}
                  <div
                    className="relative w-16 h-20 md:w-20 md:h-24 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-xl flex items-center justify-center transition-transform group-hover:brightness-110"
                    style={{
                      background: balloon.colorGradient,
                      boxShadow: `0 10px 25px -4px rgba(0,0,0,0.5), inset -4px -6px 12px rgba(0,0,0,0.35), inset 6px 8px 12px rgba(255,255,255,0.45)`,
                    }}
                  >
                    {/* Gloss shine */}
                    <div className="absolute top-2 left-3 w-4 h-7 rounded-full bg-white/40 blur-[1px] transform -rotate-25 pointer-events-none" />

                    {/* Pop hint icon */}
                    <Sparkles className="w-4 h-4 text-white/90 drop-shadow group-hover:scale-125 transition-transform" />

                    {/* Balloon knot */}
                    <div
                      className="absolute -bottom-1.5 w-3 h-2 rounded-[2px] shadow"
                      style={{ background: balloon.stringColor }}
                    />
                  </div>

                  {/* S-curved string */}
                  <svg
                    width="20"
                    height="45"
                    viewBox="0 0 20 45"
                    className="pointer-events-none overflow-visible opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <path
                      d="M 10 0 Q 3 15, 12 28 T 10 45"
                      fill="none"
                      stroke={balloon.stringColor}
                      strokeWidth="1.2"
                      strokeDasharray="2 1"
                    />
                  </svg>
                </motion.div>
              ) : null}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Bottom CTA when all popped */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm mx-auto pb-4"
        >
          <button
            onClick={() => {
              soundManager.playCheerSound();
              onComplete();
            }}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-medium text-sm tracking-wide shadow-[0_0_30px_rgba(255,190,83,0.5)] hover:shadow-[0_0_45px_rgba(255,190,83,0.8)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>{actMeta.nextCta}</span>
          </button>
        </motion.div>
      )}

      {/* Memory Polaroid Modal */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm max-h-[88vh] overflow-y-auto no-scrollbar bg-[#faf6f0] text-[#2c1d11] rounded-2xl p-3.5 sm:p-5 shadow-2xl border-4 border-white/90"
              style={{
                boxShadow: "0 25px 60px -10px rgba(0,0,0,0.8), 0 0 30px rgba(224,169,109,0.3)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMemory(null)}
                className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center shadow transition-colors cursor-pointer"
                aria-label="Close memory modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shadow-inner bg-[#1a110a] mb-3 sm:mb-4">
                <Image
                  src={activeMemory.photoUrl}
                  alt={activeMemory.title}
                  fill
                  sizes="(max-width: 640px) 90vw, 360px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Memory Text / Handwritten Note */}
              <div className="px-1 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#9c6a38] uppercase tracking-wider font-semibold mb-1">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{activeMemory.subtitle}</span>
                  <Heart className="w-3 h-3 fill-current" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2a1b12] mb-1.5 sm:mb-2 leading-tight">
                  {activeMemory.title}
                </h3>

                <p className="font-serif text-xs sm:text-sm text-[#4a3b30] italic leading-relaxed mb-3.5 sm:mb-4">
                  &ldquo;{activeMemory.note}&rdquo;
                </p>

                <button
                  onClick={() => setActiveMemory(null)}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-[#2a1b12] hover:bg-[#3d2719] text-[#fdf8f4] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
                >
                  <Check className="w-3.5 h-3.5 text-[#ffbe53]" />
                  <span>Cherish This &amp; Continue</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
