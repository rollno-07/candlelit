"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BackgroundFX } from "@/components/BackgroundFX";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Scene1Intro } from "@/components/Scene1Intro";
import { Scene2Balloons } from "@/components/Scene2Balloons";
import { Scene3Cake } from "@/components/Scene3Cake";
import { Scene4Letter } from "@/components/Scene4Letter";
import { soundManager } from "@/utils/audioSynthesizer";
import { getSurpriseBySlug } from "@/lib/surprisesStore";
import { SurpriseData } from "@/types/candlelit";

type ActNumber = 1 | 2 | 3 | 4;

const ACTS_META = [
  { id: 1, label: "Invitation" },
  { id: 2, label: "Memories" },
  { id: 3, label: "Ceremony" },
  { id: 4, label: "Letter" },
];

function ExperienceContent() {
  const params = useParams();
  const slug = (params?.slug as string) || "birthday-surprise";

  const [surprise, setSurprise] = useState<SurpriseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentAct, setCurrentAct] = useState<ActNumber>(1);
  const [maxUnlockedAct, setMaxUnlockedAct] = useState<ActNumber>(1);

  // Load surprise data
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const data = await getSurpriseBySlug(slug);
        setSurprise(data);
      } catch (e) {
        console.error("Error loading surprise:", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [slug]);

  // Deep linking via ?act=
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const actParam = urlParams.get("act");
      if (actParam && ["1", "2", "3", "4"].includes(actParam)) {
        const a = parseInt(actParam, 10) as ActNumber;
        setCurrentAct(a);
        setMaxUnlockedAct((prev) => Math.max(prev, a) as ActNumber);
      }
    }
  }, []);

  // First interaction unlock
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0714] flex flex-col items-center justify-center text-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-2 border-t-[#ffbe53] border-r-transparent border-b-[#e0a96d] border-l-transparent mb-4"
        />
        <h3 className="font-serif text-2xl text-gold-gradient font-light">
          Unfolding your digital surprise...
        </h3>
      </div>
    );
  }

  if (!surprise) {
    return (
      <div className="min-h-screen bg-[#0a0714] flex flex-col items-center justify-center text-center p-6 text-white">
        <span className="text-4xl mb-4">🕯️</span>
        <h2 className="font-serif text-3xl text-gold-gradient mb-2">
          Surprise Not Found
        </h2>
        <p className="text-xs text-[#a8998d] max-w-sm mb-6">
          The link you opened might be expired or not created yet. You can create your own digital surprise right now.
        </p>
        <Link
          href="/templates"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold"
        >
          Browse All Templates
        </Link>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      {/* Dynamic Starlight & Embers Background */}
      <BackgroundFX />

      {/* Persistent Floating BGM Player in Bottom Right */}
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
              <Scene1Intro
                onComplete={() => goToAct(2)}
                recipientName={surprise.recipientName}
                senderName={surprise.senderName}
              />
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
              <Scene2Balloons
                onComplete={() => goToAct(3)}
                photos={surprise.photos}
              />
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
              <Scene3Cake
                onComplete={() => goToAct(4)}
                recipientName={surprise.recipientName}
                cakeOrObjectMessage={surprise.cakeOrObjectMessage}
              />
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
              <Scene4Letter
                onRestart={() => goToAct(1)}
                recipientName={surprise.recipientName}
                senderName={surprise.senderName}
                letter={surprise.letter}
                photos={surprise.photos}
              />
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

export default function ExperiencePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0714] flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#ffbe53] border-r-transparent border-b-[#e0a96d] border-l-transparent animate-spin mb-4" />
          <h3 className="font-serif text-2xl text-gold-gradient font-light">
            Unfolding your digital surprise...
          </h3>
        </div>
      }
    >
      <ExperienceContent />
    </Suspense>
  );
}
