"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Heart,
  Crown,
  Trophy,
  Moon,
  Baby,
  Gift,
  Lock,
  Unlock,
  Award,
  CheckCircle2,
  ArrowRight,
  Flame,
} from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";
import { Scene3Cake } from "@/components/Scene3Cake";

interface Scene3CeremonyProps {
  onComplete: () => void;
  recipientName?: string;
  senderName?: string;
  templateId?: string;
  cakeOrObjectMessage?: string;
}

export function Scene3Ceremony({
  onComplete,
  recipientName = "My Love",
  senderName = "With All My Heart",
  templateId = "birthday-surprise",
  cakeOrObjectMessage,
}: Scene3CeremonyProps) {
  // If Birthday Surprise, use the full photorealistic Scene3Cake
  if (templateId === "birthday-surprise") {
    return (
      <Scene3Cake
        onComplete={onComplete}
        recipientName={recipientName}
        cakeOrObjectMessage={cakeOrObjectMessage}
      />
    );
  }

  // Route to the appropriate custom ritual for each template
  return (
    <div className="relative z-10 w-full h-full min-h-[460px] flex flex-col items-center justify-center px-3.5 sm:px-4 py-3 sm:py-6 overflow-hidden">
      {templateId === "propose" && (
        <ProposalCeremony
          recipientName={recipientName}
          senderName={senderName}
          onComplete={onComplete}
        />
      )}
      {templateId === "anniversary" && (
        <AnniversaryCeremony
          recipientName={recipientName}
          senderName={senderName}
          onComplete={onComplete}
        />
      )}
      {templateId === "valentine" && (
        <ValentineCeremony
          recipientName={recipientName}
          senderName={senderName}
          onComplete={onComplete}
        />
      )}
      {templateId === "karwa-chauth" && (
        <KarwaChauthCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "pregnancy-reveal" && (
        <PregnancyCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "baby-shower" && (
        <BabyShowerCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "retirement" && (
        <RetirementCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "mothers-day" && (
        <MothersDayCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "fathers-day" && (
        <FathersDayCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
      {templateId === "womens-day" && (
        <WomensDayCeremony
          recipientName={recipientName}
          onComplete={onComplete}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 1. THE DREAM PROPOSAL: Velvet Ring Box & Diamond Reveal
// -------------------------------------------------------------
function ProposalCeremony({
  recipientName,
  senderName,
  onComplete,
}: {
  recipientName: string;
  senderName: string;
  onComplete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [answeredYes, setAnsweredYes] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    soundManager.playSwooshSound();
    setIsOpen(true);
  };

  const handleSayYes = () => {
    setAnsweredYes(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ffbe53", "#ffd166", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#ff7b90]/40 mb-3 shadow-md"
      >
        <span className="text-sm">💍</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Question of a Lifetime
        </span>
        <span className="text-sm">💍</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        {isOpen ? `Will You Marry Me, ${recipientName}?` : `A Secret Waiting For ${recipientName}`}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {isOpen
          ? "Every heartbeat, every sunrise, and all my tomorrows belong only to you."
          : "Tap the velvet ring box to unveil what my heart has whispered from the day we met."}
      </p>

      {/* Velvet Ring Box */}
      <div className="relative my-4 cursor-pointer" onClick={handleOpenBox}>
        {/* Soft ground glow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#ff7b90]/25 rounded-full blur-2xl pointer-events-none" />

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="relative w-44 h-40 sm:w-52 sm:h-48 rounded-3xl bg-gradient-to-b from-[#4a0d1e] via-[#2c0812] to-[#1a040b] border-2 border-[#ff7b90]/50 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          {/* Velvet texture simulation */}
          <div className="absolute inset-0 bg-radial from-white/10 to-transparent pointer-events-none" />

          {!isOpen ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-[#1c040b] border-2 border-[#ffbe53]/60 flex items-center justify-center shadow-lg">
                <span className="text-2xl animate-pulse">💍</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#ff7b90]/20 border border-[#ff7b90]/40 text-[11px] text-[#ffbe53] font-semibold">
                Tap to Open
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              {/* Sparkling Diamond Ring */}
              <div className="relative mb-2">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#ffe8d6] via-[#ffffff] to-[#ffbe53] p-1 shadow-[0_0_40px_rgba(255,190,83,0.8)] flex items-center justify-center border-2 border-white"
                >
                  <div className="w-14 h-14 rounded-full bg-[#14060b] flex items-center justify-center">
                    <span className="text-3xl filter drop-shadow-[0_0_12px_#ffffff]">💎</span>
                  </div>
                </motion.div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#ffbe53] animate-spin" />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-[#ffbe53] uppercase">
                Forever With You
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decision Buttons */}
      {isOpen && !answeredYes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs"
        >
          <button
            onClick={handleSayYes}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#ff758f] to-[#ffbe53] text-white font-bold text-sm tracking-wide shadow-[0_0_35px_rgba(255,77,109,0.7)] hover:shadow-[0_0_50px_rgba(255,77,109,0.9)] transition-all cursor-pointer active:scale-95"
          >
            YES! A Thousand Times Yes! 💍
          </button>
        </motion.div>
      )}

      {answeredYes && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>She Said YES! Written in the Stars Forever ✨</span>
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read The Love Letter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 2. ANNIVERSARY CELEBRATION: Champagne Flutes Toast & Eternal Flame
// -------------------------------------------------------------
function AnniversaryCeremony({
  recipientName,
  senderName,
  onComplete,
}: {
  recipientName: string;
  senderName: string;
  onComplete: () => void;
}) {
  const [toasted, setToasted] = useState(false);

  const handleToast = () => {
    if (toasted) return;
    setToasted(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#ffd700", "#ffbe53", "#e0a96d", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🥂</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Golden Champagne Toast
        </span>
        <span className="text-sm">🥂</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        A Toast to Our Journey, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {toasted
          ? "Here is to every laugh we shared, every storm we weathered, and the eternal flame of our love."
          : "Tap the crystal glasses to clink together and raise a celebratory toast to our milestones."}
      </p>

      {/* Clinking Flutes Graphic */}
      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleToast}
      >
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#ffbe53]/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#e0a96d]/40 p-6 flex items-center justify-center gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Left Flute */}
          <motion.div
            animate={
              toasted
                ? { x: [0, 18, 0], rotate: [0, 15, 0] }
                : { y: [0, -6, 0] }
            }
            transition={{
              duration: toasted ? 0.6 : 3,
              repeat: toasted ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="text-5xl filter drop-shadow-[0_0_15px_#ffbe53]"
          >
            🥂
          </motion.div>

          {/* Eternal Candle Flame in the middle */}
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-4 h-6 rounded-full bg-gradient-to-t from-[#ff7b90] via-[#ffbe53] to-white shadow-[0_0_20px_#ffbe53]"
            />
            <div className="w-3 h-8 bg-gradient-to-b from-[#e0a96d] to-[#8a4b2a] rounded-sm mt-0.5" />
          </div>

          {/* Right Heart */}
          <motion.div
            animate={
              toasted
                ? { x: [0, -18, 0], rotate: [0, -15, 0] }
                : { y: [0, 6, 0] }
            }
            transition={{
              duration: toasted ? 0.6 : 3,
              repeat: toasted ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl filter drop-shadow-[0_0_15px_#ff7b90]"
          >
            💖
          </motion.div>
        </div>
      </div>

      {!toasted ? (
        <button
          onClick={handleToast}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Tap to Clink &amp; Toast 🥂
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-[#ffbe53]/20 border border-[#ffbe53]/40 text-[#ffbe53] font-semibold text-xs">
            ✨ Cheers to Endless Tomorrows!
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Vows of Eternity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 3. VALENTINE'S WEEK: Red Velvet Rose & Golden Love Lock
// -------------------------------------------------------------
function ValentineCeremony({
  recipientName,
  senderName,
  onComplete,
}: {
  recipientName: string;
  senderName: string;
  onComplete: () => void;
}) {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    if (unlocked) return;
    setUnlocked(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ff4d6d", "#ff758f", "#ffc2d1", "#ffbe53"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#ff4d6d]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🌹</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Crimson Rose &amp; Love Lock
        </span>
        <span className="text-sm">🌹</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        My Heart is Locked With You, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {unlocked
          ? "The key was thrown into the ocean the moment I saw you. You hold my forever."
          : "Tap the golden key to turn the lock and bloom the crimson velvet rose."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleUnlock}
      >
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#ff4d6d]/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#ff4d6d]/40 p-6 flex flex-col items-center justify-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Blooming Rose */}
          <motion.div
            animate={
              unlocked
                ? { scale: [1, 1.3, 1.2], rotate: [0, 8, 0] }
                : { scale: [1, 1.05, 1] }
            }
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl filter drop-shadow-[0_0_20px_#ff4d6d]"
          >
            🌹
          </motion.div>

          {/* Golden Padlock */}
          <div className="flex items-center gap-2">
            {unlocked ? (
              <Unlock className="w-5 h-5 text-emerald-400" />
            ) : (
              <Lock className="w-5 h-5 text-[#ffbe53] animate-bounce" />
            )}
            <span className="text-xs font-mono tracking-wider text-[#ffe8d6]">
              {unlocked ? "ETERNALLY UNLOCKED" : "LOCKED WITH DEVOTION"}
            </span>
          </div>
        </div>
      </div>

      {!unlocked ? (
        <button
          onClick={handleUnlock}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#ff4d6d] via-[#ff758f] to-[#ffbe53] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Turn Golden Key &amp; Bloom 🌹
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-[#ff4d6d]/20 border border-[#ff4d6d]/40 text-[#ff758f] font-semibold text-xs">
            ❤️ Be My Valentine Today &amp; For All Years Ahead
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read The Valentine Letter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 4. KARWA CHAUTH: Traditional Moon, Channi & Diya
// -------------------------------------------------------------
function KarwaChauthCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [sieveLifted, setSieveLifted] = useState(false);

  const handleLiftSieve = () => {
    if (sieveLifted) return;
    setSieveLifted(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#ffaa00", "#ffd700", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#ffaa00]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🌙</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: Moonlit Vows &amp; Sacred Sieve
        </span>
        <span className="text-sm">🌙</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        Behold The Sacred Moon, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {sieveLifted
          ? "The radiant moon blesses our bond with long life, endless warmth, and eternal togetherness."
          : "Tap or slide the ceremonial sieve to view the glowing full moon through sacred starlight."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleLiftSieve}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#ffaa00]/40 p-6 flex flex-col items-center justify-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Glowing Full Moon */}
          <motion.div
            animate={{
              scale: sieveLifted ? 1.25 : 1,
              filter: sieveLifted
                ? "drop-shadow(0 0 35px #ffe8cc)"
                : "drop-shadow(0 0 15px #e0a96d)",
            }}
            transition={{ duration: 0.8 }}
            className="text-6xl"
          >
            🌕
          </motion.div>

          {/* Diya Lamp */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl animate-pulse">🪔</span>
            <span className="text-xs font-mono text-[#ffbe53]">
              {sieveLifted ? "FAST BROKEN WITH BLESSINGS" : "TAP TO LIFT CHANNI"}
            </span>
          </div>
        </div>
      </div>

      {!sieveLifted ? (
        <button
          onClick={handleLiftSieve}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#ffaa00] via-[#ffd700] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          View The Sacred Moon 🌙
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-[#ffaa00]/20 border border-[#ffaa00]/40 text-[#ffbe53] font-semibold text-xs">
            🙏 May our bond shine eternal through every lifetime
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Sacred Vows</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 5. PREGNANCY REVEAL: Ultrasound & Tiny Heartbeat
// -------------------------------------------------------------
function PregnancyCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [scratched, setScratched] = useState(false);

  const handleReveal = () => {
    if (scratched) return;
    setScratched(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#6ee7b7", "#93c5fd", "#ffd166", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#6ee7b7]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🍼</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Tiny Heartbeat
        </span>
        <span className="text-sm">🍼</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        A Miracle Is On The Way, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {scratched
          ? "Our greatest adventure begins. Two hearts are welcoming a precious third beat."
          : "Tap or scratch the mystery card to reveal the life-changing news."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleReveal}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#6ee7b7]/40 p-6 flex flex-col items-center justify-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Ultrasound / Baby Silhouette */}
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl filter drop-shadow-[0_0_20px_#6ee7b7]"
          >
            {scratched ? "🍼" : "✨"}
          </motion.div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#ff4d6d] animate-ping" />
            <span className="text-xs font-mono font-bold text-[#6ee7b7]">
              {scratched ? "WE'RE HAVING A BABY! 👶" : "TAP TO REVEAL"}
            </span>
          </div>
        </div>
      </div>

      {!scratched ? (
        <button
          onClick={handleReveal}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#6ee7b7] via-[#93c5fd] to-[#6ee7b7] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Reveal The Big News 🍼
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs">
            🎉 Welcoming Our Little Blessing Very Soon!
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Next Chapter</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 6. BABY SHOWER: Golden Cradle & Shower of Blessings
// -------------------------------------------------------------
function BabyShowerCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [showered, setShowered] = useState(false);

  const handleShower = () => {
    if (showered) return;
    setShowered(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#93c5fd", "#f472b6", "#ffd166", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#93c5fd]/40 mb-3 shadow-md"
      >
        <span className="text-sm">👶</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: Shower of Blessings
        </span>
        <span className="text-sm">👶</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        Blessings for Mama &amp; Baby, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {showered
          ? "May this little angel grow up surrounded by boundless laughter, health, and limitless love."
          : "Tap the floating cradle to rain down warm wishes and golden stardust."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleShower}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#93c5fd]/40 p-6 flex flex-col items-center justify-center gap-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl filter drop-shadow-[0_0_20px_#93c5fd]"
          >
            🧸
          </motion.div>

          <span className="text-xs font-mono text-[#93c5fd] font-bold">
            {showered ? "SHOWERED WITH LOVE ✨" : "TAP TO SHOWER BLESSINGS"}
          </span>
        </div>
      </div>

      {!showered ? (
        <button
          onClick={handleShower}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#93c5fd] via-[#f472b6] to-[#93c5fd] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Shower Warm Blessings 👶
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 font-semibold text-xs">
            ✨ Boundless health, happiness &amp; warmth for the little one
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Letter to Mama</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 7. RETIREMENT ODYSSEY: Lifetime Achievement Golden Trophy
// -------------------------------------------------------------
function RetirementCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [awarded, setAwarded] = useState(false);

  const handleAward = () => {
    if (awarded) return;
    setAwarded(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 130,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#ffd700", "#ffbe53", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#ffd700]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🏆</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: Lifetime Achievement Award
        </span>
        <span className="text-sm">🏆</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        A Lifetime of Excellence, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {awarded
          ? "Decades of tireless dedication, visionary leadership, and mentorship celebrated today."
          : "Tap the pedestal to unveil the Golden Lifetime Achievement Trophy."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleAward}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#ffd700]/40 p-6 flex flex-col items-center justify-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <motion.div
            animate={{
              scale: awarded ? [1, 1.2, 1.1] : [1, 1.05, 1],
              rotate: awarded ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 1.5 }}
            className="text-6xl filter drop-shadow-[0_0_25px_#ffd700]"
          >
            🏆
          </motion.div>

          <span className="text-[11px] font-mono tracking-wider text-[#ffd700] uppercase font-bold">
            {awarded ? `HONORING ${recipientName.toUpperCase()}` : "TAP TO UNVEIL TROPHY"}
          </span>
        </div>
      </div>

      {!awarded ? (
        <button
          onClick={handleAward}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#ffd700] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Present Lifetime Award 🏆
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-xs">
            🎖️ Decades of Brilliance &amp; Leadership Celebrated
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Career Tributes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 8. MOTHER'S DAY: Blooming Botanical Bouquet of Gratitude
// -------------------------------------------------------------
function MothersDayCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [bloomed, setBloomed] = useState(false);

  const handleBloom = () => {
    if (bloomed) return;
    setBloomed(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#f472b6", "#ffc2d1", "#ffbe53", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#f472b6]/40 mb-3 shadow-md"
      >
        <span className="text-sm">💐</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Blooming Garden of Love
        </span>
        <span className="text-sm">💐</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        To The World&apos;s Best Mom, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {bloomed
          ? "Every petal holds a quiet sacrifice you made with a tender smile. You are our world."
          : "Tap the garden bouquet to bloom fresh flowers of gratitude for Mom."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleBloom}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#f472b6]/40 p-6 flex flex-col items-center justify-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <motion.div
            animate={{
              scale: bloomed ? [1, 1.25, 1.15] : [1, 1.05, 1],
              rotate: bloomed ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 1.5 }}
            className="text-6xl filter drop-shadow-[0_0_20px_#f472b6]"
          >
            💐
          </motion.div>

          <span className="text-[11px] font-mono tracking-wider text-[#f472b6] uppercase font-bold">
            {bloomed ? "MOM IS DEEPLY CHERISHED 🌸" : "TAP TO BLOOM BOUQUET"}
          </span>
        </div>
      </div>

      {!bloomed ? (
        <button
          onClick={handleBloom}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#f472b6] via-[#ffc2d1] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Bloom Mom&apos;s Flowers 💐
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-semibold text-xs">
            🌸 Happy Mother&apos;s Day, today and every single day
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Tribute to Mom</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 9. FATHER'S DAY: #1 Dad Champion Medal of Honor
// -------------------------------------------------------------
function FathersDayCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [awarded, setAwarded] = useState(false);

  const handleAward = () => {
    if (awarded) return;
    setAwarded(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.6 },
      colors: ["#38bdf8", "#ffbe53", "#ffd700", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#38bdf8]/40 mb-3 shadow-md"
      >
        <span className="text-sm">🕶️</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: Father&apos;s Day Hall of Fame
        </span>
        <span className="text-sm">🕶️</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        To My First Hero, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {awarded
          ? "For the strength that never wavered and the quiet sacrifices you made so we could fly."
          : "Tap to award Dad the #1 Champion Medallion of Honor."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleAward}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#38bdf8]/40 p-6 flex flex-col items-center justify-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <motion.div
            animate={{
              scale: awarded ? [1, 1.25, 1.15] : [1, 1.05, 1],
              rotate: awarded ? [0, 8, -8, 0] : 0,
            }}
            transition={{ duration: 1.5 }}
            className="text-6xl filter drop-shadow-[0_0_20px_#38bdf8]"
          >
            🥇
          </motion.div>

          <span className="text-[11px] font-mono tracking-wider text-[#38bdf8] uppercase font-bold">
            {awarded ? "#1 DAD IN THE UNIVERSE" : "TAP TO AWARD MEDAL"}
          </span>
        </div>
      </div>

      {!awarded ? (
        <button
          onClick={handleAward}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Award Dad&apos;s Medal 🥇
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 font-semibold text-xs">
            🏆 Always our greatest hero and anchor
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Tribute to Dad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 10. WOMEN'S DAY: Royal Crystal Crown of Radiance
// -------------------------------------------------------------
function WomensDayCeremony({
  recipientName,
  onComplete,
}: {
  recipientName: string;
  onComplete: () => void;
}) {
  const [crowned, setCrowned] = useState(false);

  const handleCrown = () => {
    if (crowned) return;
    setCrowned(true);
    soundManager.playCheerSound();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#c084fc", "#ffd700", "#ffbe53", "#ffffff"],
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#c084fc]/40 mb-3 shadow-md"
      >
        <span className="text-sm">👑</span>
        <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
          Act III: The Royal Crown of Radiance
        </span>
        <span className="text-sm">👑</span>
      </motion.div>

      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gold-gradient font-light mb-2">
        To An Extraordinary Queen, {recipientName}
      </h2>

      <p className="text-xs sm:text-sm text-[#d1c4b9] mb-6 max-w-sm">
        {crowned
          ? "Unstoppable spirit, profound intellect, and fierce grace. Wear your crown with pride."
          : "Tap to place the Royal Crystal Crown in honor of your brilliance."}
      </p>

      <div
        className="relative my-4 cursor-pointer select-none group"
        onClick={handleCrown}
      >
        <div className="relative w-56 h-48 rounded-3xl glass-card border border-[#c084fc]/40 p-6 flex flex-col items-center justify-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <motion.div
            animate={{
              y: crowned ? [0, -6, 0] : [0, -10, 0],
              scale: crowned ? [1, 1.25, 1.15] : [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl filter drop-shadow-[0_0_25px_#c084fc]"
          >
            👑
          </motion.div>

          <span className="text-[11px] font-mono tracking-wider text-[#c084fc] uppercase font-bold">
            {crowned ? "CROWNED IN ROYAL RADIANCE" : "TAP TO CROWN THE QUEEN"}
          </span>
        </div>
      </div>

      {!crowned ? (
        <button
          onClick={handleCrown}
          className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#c084fc] via-[#ffd700] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95"
        >
          Crown The Queen 👑
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <div className="px-5 py-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-semibold text-xs">
            ✨ Inspiring the world with grace &amp; indomitable spirit
          </div>

          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-bold text-xs sm:text-sm tracking-wide shadow-lg cursor-pointer active:scale-95 flex items-center gap-2 mx-auto"
          >
            <span>Read Royal Tribute</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
