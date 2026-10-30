"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundFX } from "@/components/BackgroundFX";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Scene1Intro } from "@/components/Scene1Intro";
import { Scene2Balloons } from "@/components/Scene2Balloons";
import { Scene3Cake } from "@/components/Scene3Cake";
import { Scene4Letter } from "@/components/Scene4Letter";
import { soundManager } from "@/utils/audioSynthesizer";

type ActNumber = 1 | 2 | 3 | 4;

const ACTS_META = [
  { id: 1, label: "Invitation" },
  { id: 2, label: "Memories" },
  { id: 3, label: "Cake Ceremony" },
  { id: 4, label: "Love Letter" },
];

export default function BirthdayPage() {
  const [currentAct, setCurrentAct] = useState<ActNumber>(1);
  const [maxUnlockedAct, setMaxUnlockedAct] = useState<ActNumber>(1);

  // Allow deep linking via ?act=3 or #act-3 for seamless testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const actParam = params.get("act");
      if (actParam && ["1", "2", "3", "4"].includes(actParam)) {
        const a = parseInt(actParam, 10) as ActNumber;
        setCurrentAct(a);
        setMaxUnlockedAct((prev) => Math.max(prev, a) as ActNumber);
      }
    }
  }, []);

  // Auto-play song immediately on load or at the very first user tap/touch anywhere
  useEffect(() => {
    soundManager.unlockAudio();

    const handleFirstInteraction = () => {
      soundManager.unlockAudio();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return () => {
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const goToAct = (act: ActNumber) => {
    setCurrentAct(act);
    if (act > maxUnlockedAct) {
      setMaxUnlockedAct(act);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      {/* Dynamic Starlight & Embers Background */}
      <BackgroundFX />

      {/* Persistent Floating BGM Player */}
      <MusicPlayer />

      {/* Main Act Scene Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentAct === 1 && (
            <motion.section
              key="act-1"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Scene1Intro onComplete={() => goToAct(2)} />
            </motion.section>
          )}

          {currentAct === 2 && (
            <motion.section
              key="act-2"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Scene2Balloons onComplete={() => goToAct(3)} />
            </motion.section>
          )}

          {currentAct === 3 && (
            <motion.section
              key="act-3"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Scene3Cake onComplete={() => goToAct(4)} />
            </motion.section>
          )}

          {currentAct === 4 && (
            <motion.section
              key="act-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <Scene4Letter onRestart={() => goToAct(1)} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Scene Navigation Bar (Visible once Act 2 is reached) */}
      {maxUnlockedAct > 1 && (
        <nav
          aria-label="Experience scenes"
          className="relative z-30 w-full max-w-xs mx-auto pb-5 px-4 flex items-center justify-center gap-2"
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-[#e0a96d]/25 shadow-lg">
            {ACTS_META.map((act) => {
              const isUnlocked = act.id <= maxUnlockedAct;
              const isActive = act.id === currentAct;

              return (
                <button
                  key={act.id}
                  disabled={!isUnlocked}
                  onClick={() => goToAct(act.id as ActNumber)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] shadow-[0_0_12px_rgba(255,190,83,0.5)] font-semibold"
                      : isUnlocked
                      ? "text-[#d1c4b9] hover:text-[#ffbe53] hover:bg-white/5 cursor-pointer"
                      : "text-[#5e5349] cursor-not-allowed opacity-50"
                  }`}
                >
                  {act.label}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </main>
  );
}
