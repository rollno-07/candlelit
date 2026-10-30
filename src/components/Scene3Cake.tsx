"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mic, Sparkles, Heart, Wind, Flame, UtensilsCrossed } from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";
import { useMicrophoneBlow } from "@/hooks/useMicrophoneBlow";
import { useSliceGesture } from "@/hooks/useSliceGesture";

interface Scene3CakeProps {
  onComplete: () => void;
}

// Flame & Ember coordinates on the cake image (percentages)
const CANDLE_COORDINATES = [
  { id: 1, flameLeft: "33.8%", flameTop: "15.2%", wickTop: "18.5%" },
  { id: 2, flameLeft: "41.8%", flameTop: "12.8%", wickTop: "16.0%" },
  { id: 3, flameLeft: "51.4%", flameTop: "11.2%", wickTop: "14.5%" },
  { id: 4, flameLeft: "61.4%", flameTop: "13.2%", wickTop: "16.2%" },
  { id: 5, flameLeft: "69.8%", flameTop: "15.8%", wickTop: "18.8%" },
];

export function Scene3Cake({ onComplete }: Scene3CakeProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowingAnim, setIsBlowingAnim] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const cakeContainerRef = useRef<HTMLDivElement | null>(null);

  // Trigger realistic candle blowout
  const handleExtinguish = () => {
    if (candlesBlown || isBlowingAnim) return;

    // Start blow effect
    setIsBlowingAnim(true);
    soundManager.playBlowSound();

    setTimeout(() => {
      setCandlesBlown(true);
      setIsBlowingAnim(false);

      // Play soft celebratory chime
      setTimeout(() => {
        soundManager.playCheerSound();
      }, 300);
    }, 280);
  };

  // Microphone Blow Detection
  const { isListening, micPermissionState, volume, startListening } = useMicrophoneBlow({
    onBlowDetected: handleExtinguish,
    threshold: 0.16,
    enabled: !candlesBlown,
  });

  // Cake Slicing Celebration
  const triggerConfettiCelebration = () => {
    if (isSliced) return;
    soundManager.playSliceSound();
    setIsSliced(true);

    setTimeout(() => {
      soundManager.playCheerSound();
      // Multistage Confetti Blast
      const count = 220;
      const defaults = {
        origin: { y: 0.62 },
        colors: ["#ffbe53", "#e0a96d", "#ff7b90", "#ffffff", "#ffd700", "#ff4d6d"],
      };

      confetti({
        ...defaults,
        particleCount: count * 0.45,
        spread: 75,
        startVelocity: 50,
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
        startVelocity: 30,
        decay: 0.92,
        scalar: 0.85,
      });
    }, 250);
  };

  const { isDragging, trail, handlers } = useSliceGesture({
    onSliceComplete: triggerConfettiCelebration,
    minDistance: 95,
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
            ? "Make a wish & blow out the candles 🎂"
            : !isSliced
            ? "Slice your birthday cake, Nidhi 🍰"
            : "Happy Birthday, My Queen Nidhi! 🎉"}
        </h2>

        <p className="text-xs text-[#d1c4b9] mt-1 max-w-xs mx-auto">
          {!candlesBlown
            ? "Blow into your microphone or tap the candles to extinguish"
            : !isSliced
            ? "Swipe your finger or mouse across the cake to cut"
            : "May your life be as sweet and beautiful as you are"}
        </p>
      </div>

      {/* Interactive Cake Stage */}
      <div
        ref={cakeContainerRef}
        {...handlers}
        style={{ touchAction: "none" }}
        className="relative w-full max-w-sm h-84 md:h-96 my-auto flex flex-col items-center justify-center select-none"
      >
        {/* Warm Ambient Cake Glow (changes softly when blown out) */}
        <div
          className={`absolute w-84 h-84 md:w-96 md:h-96 rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${
            !candlesBlown
              ? "bg-[#ffbe53]/25 opacity-100 scale-100"
              : !isSliced
              ? "bg-[#ff7b90]/15 opacity-60 scale-95"
              : "bg-[#ffbe53]/35 opacity-90 scale-105"
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
                r={i === trail.length - 1 ? 7 : 3}
                fill="#ffffff"
                className="animate-ping"
              />
            ))}
          </svg>
        )}

        {/* Real Cake Display Container */}
        <div className="relative w-76 h-76 sm:w-84 sm:h-84 md:w-92 md:h-92 rounded-3xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(224,169,109,0.25)] border border-[#e0a96d]/30 group">
          <AnimatePresence mode="sync">
            {/* 1. LIT REAL CAKE */}
            {!candlesBlown && (
              <motion.div
                key="cake-lit"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={handleExtinguish}
                className="absolute inset-0 cursor-pointer"
              >
                <Image
                  src="/images/real_birthday_cake.jpg"
                  alt="Real birthday cake with Happy Birthday Nidhi and 5 lit candles"
                  fill
                  sizes="(max-width: 640px) 340px, 420px"
                  className={`object-cover transition-transform duration-300 ${
                    isBlowingAnim ? "scale-[0.99] filter brightness-110" : ""
                  }`}
                  priority
                />

                {/* Living Candlelight Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Dynamic Flickering Flame Glows & Breath Reaction */}
                {CANDLE_COORDINATES.map((c) => (
                  <div
                    key={c.id}
                    style={{ left: c.flameLeft, top: c.flameTop }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  >
                    {/* Pulsing Warm Flame Core Glow */}
                    <motion.div
                      animate={
                        isBlowingAnim || volume > 0.08
                          ? {
                              scale: [1, 1.4, 0.4],
                              skewX: [0, 15, -15, 0],
                              opacity: [0.9, 1, 0.2],
                            }
                          : {
                              scale: [0.95, 1.08, 0.97, 1.03, 0.95],
                              opacity: [0.75, 0.95, 0.8, 0.9, 0.75],
                            }
                      }
                      transition={{
                        duration: isBlowingAnim ? 0.25 : 0.8 + (c.id % 3) * 0.2,
                        repeat: isBlowingAnim ? 0 : Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-8 h-8 rounded-full bg-radial from-[#ffe494]/70 via-[#ff9500]/30 to-transparent blur-sm"
                    />
                  </div>
                ))}

                {/* Click / Tap to blow hint overlay */}
                <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-[#ffe8d6] border border-white/10 shadow-lg">
                    Tap cake or blow into mic to extinguish
                  </span>
                </div>
              </motion.div>
            )}

            {/* 2. EXTINGUISHED REAL CAKE (Smoke rising, red embers) */}
            {candlesBlown && !isSliced && (
              <motion.div
                key="cake-blown"
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 cursor-crosshair"
              >
                <Image
                  src="/images/real_birthday_cake_blown.jpg"
                  alt="Real birthday cake with extinguished candles and curling smoke"
                  fill
                  sizes="(max-width: 640px) 340px, 420px"
                  className="object-cover"
                  priority
                />

                {/* Soft moody vignette after blow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* 5 Animated Glowing Embers on Candle Wicks */}
                {CANDLE_COORDINATES.map((c) => (
                  <div
                    key={c.id}
                    style={{ left: c.flameLeft, top: c.wickTop }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
                  >
                    {/* Hot glowing ember point cooling down */}
                    <motion.div
                      initial={{ scale: 1.6, opacity: 1 }}
                      animate={{
                        scale: [1.6, 1.2, 0.9, 0.5, 0],
                        opacity: [1, 0.9, 0.7, 0.4, 0],
                      }}
                      transition={{ duration: 4.5, ease: "easeOut" }}
                      className="w-2 h-2 rounded-full bg-gradient-to-t from-[#ff2a00] to-[#ffaa00] shadow-[0_0_10px_#ff4500]"
                    />

                    {/* Additional rising smoke particle wisps */}
                    {[0, 1].map((s) => (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, y: 0, x: 0, scale: 0.3 }}
                        animate={{
                          opacity: [0, 0.5, 0.3, 0],
                          y: [-2, -35 - s * 25],
                          x: [0, (c.id % 2 === 0 ? 5 : -5) + (s - 0.5) * 8],
                          scale: [0.3, 1.2, 2.0],
                          filter: ["blur(1px)", "blur(3px)", "blur(5px)"],
                        }}
                        transition={{
                          duration: 2.5 + s * 0.8,
                          delay: s * 0.4,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                          ease: "easeOut",
                        }}
                        className="absolute top-0 left-0 w-3 h-3 rounded-full bg-slate-300/30 pointer-events-none"
                      />
                    ))}
                  </div>
                ))}

                {/* Slice Instruction Overlay */}
                <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                  <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-[#ffbe53] border border-[#ffbe53]/30 shadow-lg animate-pulse">
                    🔪 Drag or swipe across cake to slice
                  </span>
                </div>
              </motion.div>
            )}

            {/* 3. SLICED REAL CAKE (Slice served on gold spatula) */}
            {isSliced && (
              <motion.div
                key="cake-sliced"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/real_birthday_cake_sliced.jpg"
                  alt="Real birthday cake with slice pulled out on ornate gold server spatula"
                  fill
                  sizes="(max-width: 640px) 340px, 420px"
                  className="object-cover"
                  priority
                />

                {/* Golden celebratory shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                {/* Celebratory badge */}
                {/* <div className="absolute inset-x-0 bottom-3 text-center pointer-events-none">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ffbe53]/30 to-[#ff7b90]/30 backdrop-blur-md text-[11px] text-[#fff] border border-[#ffbe53]/40 shadow-lg font-medium">
                    🎉 Delicious First Slice Made with Love!
                  </span>
                </div> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Actions & Interactive Triggers */}
      <div className="w-full max-w-sm mx-auto pb-4 flex flex-col items-center gap-3">
        {!candlesBlown ? (
          <div className="flex flex-col items-center gap-2 w-full">
            {!isListening && micPermissionState !== "denied" && micPermissionState !== "unsupported" ? (
              <button
                onClick={startListening}
                className="px-5 py-2.5 rounded-full glass-panel border border-[#ffbe53]/40 hover:border-[#ffbe53] text-xs font-medium text-[#ffe8d6] flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <Mic className="w-4 h-4 text-[#ffbe53]" />
                <span>Enable Microphone to Blow Candles</span>
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
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ffbe53]/20 to-[#ff7b90]/20 hover:from-[#ffbe53]/30 hover:to-[#ff7b90]/30 border border-[#ffbe53]/40 text-xs text-[#ffe8d6] font-medium transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Flame className="w-4 h-4 text-[#ffbe53]" />
              <span>Blow out all 5 candles now</span>
            </button>
          </div>
        ) : !isSliced ? (
          <div className="flex flex-col items-center gap-2 w-full">
            <button
              onClick={triggerConfettiCelebration}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ffbe53] via-[#ffd700] to-[#e0a96d] text-[#1c1208] text-xs font-semibold tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.5)] hover:shadow-[0_0_35px_rgba(255,190,83,0.7)] transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-[#1c1208]" />
              <span>Cut & Slice Birthday Cake 🍰</span>
            </button>
          </div>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onComplete}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-semibold text-sm tracking-wide shadow-[0_0_35px_rgba(255,190,83,0.5)] hover:shadow-[0_0_50px_rgba(255,190,83,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Heart className="w-4 h-4 fill-current text-[#b32d4a]" />
            <span>Read My Love Letter</span>
            <Heart className="w-4 h-4 fill-current text-[#b32d4a]" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
