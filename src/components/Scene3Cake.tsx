"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mic, Sparkles, Heart, Wind, Flame } from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";
import { useMicrophoneBlow } from "@/hooks/useMicrophoneBlow";
import { useSliceGesture } from "@/hooks/useSliceGesture";

interface Scene3CakeProps {
  onComplete: () => void;
}

// Flame coordinates on the real cake image (percentages)
const CANDLE_FLAMES = [
  { id: 1, left: "33.8%", top: "14%" },
  { id: 2, left: "41.8%", top: "12%" },
  { id: 3, left: "51.4%", top: "11%" },
  { id: 4, left: "61.8%", top: "12.5%" },
  { id: 5, left: "69.8%", top: "14.5%" },
];

export function Scene3Cake({ onComplete }: Scene3CakeProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const cakeContainerRef = useRef<HTMLDivElement | null>(null);

  // Trigger candle blowout
  const handleExtinguish = () => {
    if (candlesBlown) return;
    soundManager.playPopSound();
    setCandlesBlown(true);
  };

  // Microphone Blow Detection
  const { isListening, micPermissionState, volume, startListening } = useMicrophoneBlow({
    onBlowDetected: handleExtinguish,
    threshold: 0.2,
    enabled: !candlesBlown,
  });

  // Cake Slicing Gesture
  const triggerConfettiCelebration = () => {
    soundManager.playCheerSound();
    setIsSliced(true);

    // Multistage Confetti Blast
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
      colors: ["#ffbe53", "#e0a96d", "#ff7b90", "#ffffff", "#ffd700"],
    };

    confetti({
      ...defaults,
      particleCount: count * 0.45,
      spread: 70,
      startVelocity: 48,
    });

    confetti({
      ...defaults,
      particleCount: count * 0.35,
      spread: 110,
      decay: 0.91,
      scalar: 1.25,
    });

    confetti({
      ...defaults,
      particleCount: count * 0.25,
      spread: 140,
      startVelocity: 28,
      decay: 0.92,
      scalar: 0.85,
    });
  };

  const { isDragging, trail, handlers } = useSliceGesture({
    onSliceComplete: triggerConfettiCelebration,
    minDistance: 130,
    enabled: candlesBlown && !isSliced,
  });

  return (
    <div className="relative z-10 w-full min-h-[92vh] flex flex-col items-center justify-between px-4 py-6 overflow-hidden">
      {/* Header Info */}
      <div className="w-full max-w-md mx-auto text-center pt-2">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 mb-2"
        >
          <Image src="/cake-icon.svg" alt="Cake" width={16} height={16} className="drop-shadow" />
          <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
            Act III: The Cake Ceremony
          </span>
          <Image src="/cake-icon.svg" alt="Cake" width={16} height={16} className="drop-shadow" />
        </motion.div>

        <h2 className="font-serif text-2xl md:text-3xl text-gold-gradient font-light">
          {!candlesBlown
            ? "Make a wish & blow out the 5 candles 🎂"
            : !isSliced
            ? "Draw a line to slice your cake 🍰"
            : "Happy Birthday, My Queen Nidhi! 🎉"}
        </h2>

        <p className="text-xs text-[#d1c4b9] mt-1 max-w-xs mx-auto">
          {!candlesBlown
            ? "Blow into your microphone or tap the candles to extinguish"
            : !isSliced
            ? "Swipe your finger or pointer across the cake"
            : "May all your dreams and wishes come true"}
        </p>
      </div>

      {/* Interactive Cake Stage */}
      <div
        ref={cakeContainerRef}
        {...handlers}
        style={{ touchAction: "none" }}
        className="relative w-full max-w-sm h-84 md:h-92 my-auto flex flex-col items-center justify-center select-none cursor-crosshair"
      >
        {/* Glow halo behind cake */}
        <div
          className={`absolute w-80 h-80 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${
            !candlesBlown ? "bg-[#ffbe53]/30 opacity-100" : "bg-[#ff7b90]/20 opacity-70"
          }`}
        />

        {/* Cake Slicing Interactive Canvas Trail */}
        {isDragging && trail.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 overflow-visible">
            <polyline
              points={trail.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#ffbe53"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_15px_#ffbe53]"
            />
            {trail.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={i === trail.length - 1 ? 6 : 3}
                fill="#ffffff"
                className="animate-ping"
              />
            ))}
          </svg>
        )}

        {/* Slicing Split Animation Container (Real Cake Image) */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
          {/* LEFT HALF OF CAKE */}
          <motion.div
            animate={
              isSliced
                ? { x: -40, rotate: -4, opacity: 0.95 }
                : { x: 0, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="w-1/2 h-full overflow-hidden flex justify-end relative shadow-2xl rounded-l-2xl border-l border-y border-[#e0a96d]/30"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 relative shrink-0 -mr-36 md:-mr-40">
              <RealCakeVisual candlesBlown={candlesBlown} onExtinguish={handleExtinguish} />
            </div>
          </motion.div>

          {/* RIGHT HALF OF CAKE */}
          <motion.div
            animate={
              isSliced
                ? { x: 40, rotate: 4, opacity: 0.95 }
                : { x: 0, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
            className="w-1/2 h-full overflow-hidden flex justify-start relative shadow-2xl rounded-r-2xl border-r border-y border-[#e0a96d]/30"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 relative shrink-0 -ml-36 md:-ml-40">
              <RealCakeVisual candlesBlown={candlesBlown} onExtinguish={handleExtinguish} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Control Actions & Fallback */}
      <div className="w-full max-w-sm mx-auto pb-4 flex flex-col items-center gap-3">
        {!candlesBlown ? (
          <div className="flex flex-col items-center gap-2 w-full">
            {!isListening && micPermissionState !== "denied" && micPermissionState !== "unsupported" ? (
              <button
                onClick={startListening}
                className="px-5 py-2.5 rounded-full glass-panel border border-[#ffbe53]/40 hover:border-[#ffbe53] text-xs font-medium text-[#ffe8d6] flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <Mic className="w-4 h-4 text-[#ffbe53]" />
                <span>Enable Microphone to Blow 5 Candles</span>
              </button>
            ) : isListening ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-[#ffbe53]/50 shadow-lg">
                <Wind className="w-4 h-4 text-[#ffbe53] animate-pulse" />
                <span className="text-xs text-[#ffe8d6]">Listening for blow...</span>
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ffbe53] to-[#ff7b90] transition-all duration-75"
                    style={{ width: `${Math.min(100, volume * 380)}%` }}
                  />
                </div>
              </div>
            ) : null}

            <button
              onClick={handleExtinguish}
              className="text-xs text-[#d1c4b9]/80 hover:text-[#ffbe53] underline transition-colors flex items-center gap-1 cursor-pointer pt-1"
            >
              <Flame className="w-3.5 h-3.5 text-[#ff7b90]" />
              <span>Tap here to blow out all 5 candles</span>
            </button>
          </div>
        ) : !isSliced ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffbe53]/20 border border-[#ffbe53]/50 text-xs font-medium text-[#ffbe53] shadow-[0_0_20px_rgba(255,190,83,0.3)] animate-pulse"
          >
            <span>👉 Swipe or drag across the cake to cut</span>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-medium text-sm tracking-wide shadow-[0_0_35px_rgba(255,190,83,0.5)] hover:shadow-[0_0_50px_rgba(255,190,83,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current text-[#b32d4a]" />
            <span>Read My Love Letter (Act IV)</span>
            <Sparkles className="w-4 h-4 fill-current" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

/**
 * Visual Real Birthday Cake with 5 Animated Candle Flames & Smoke
 */
function RealCakeVisual({
  candlesBlown,
  onExtinguish,
}: {
  candlesBlown: boolean;
  onExtinguish: () => void;
}) {
  return (
    <div
      onClick={onExtinguish}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Real Cake Image */}
      <Image
        src="/images/real_birthday_cake.jpg"
        alt="Real birthday cake with Happy Birthday Nidhi and 5 candles"
        fill
        sizes="(max-width: 640px) 320px, 400px"
        className="object-cover"
        priority
      />

      {/* Warm Ambient Cake Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* 5 Candle Flames / Smoke Overlays */}
      {CANDLE_FLAMES.map((candle) => (
        <div
          key={candle.id}
          style={{ left: candle.left, top: candle.top }}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
        >
          <AnimatePresence>
            {!candlesBlown ? (
              <motion.div
                key="flame"
                exit={{ opacity: 0, y: -20, scale: 0.4, filter: "blur(4px)" }}
                className="relative flex items-center justify-center"
              >
                {/* Glowing Candle Flame Aura */}
                <div className="candle-flame w-4 h-7 rounded-[50%_50%_20%_20%_/_60%_60%_40%_40%] bg-gradient-to-t from-[#ff4500] via-[#ffa500] to-[#ffffff] drop-shadow-[0_0_12px_#ffbe53]" />
                <div className="absolute w-10 h-10 rounded-full bg-[#ffaa00]/35 blur-md" />
              </motion.div>
            ) : (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.9, y: 0, scale: 0.7 }}
                animate={{
                  opacity: [0.9, 0],
                  y: [-5, -35],
                  x: [0, (candle.id % 2 === 0 ? 6 : -6)],
                  scale: [0.7, 1.8],
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-xs"
              >
                💨
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* If candles are blown, dim the candle tops slightly with a soft realistic smoke haze */}
      {candlesBlown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          className="absolute inset-0 bg-black/25 pointer-events-none transition-opacity duration-1000"
        />
      )}
    </div>
  );
}
