"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, RotateCcw, Volume2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "@/utils/audioSynthesizer";

const MEMORY_CAROUSEL = [
  {
    url: "/images/polaroids/photo_rooftop.jpg",
    title: "Our Special Rooftop Evening",
    caption: "Under the stars, celebrating the woman who makes every day magical.",
  },
  {
    url: "/images/polaroids/photo_beach.jpg",
    title: "Golden Hour Coastline",
    caption: "Hand in hand by the shore—my favorite place is wherever you are.",
  },
  {
    url: "/images/polaroids/photo_festive.jpg",
    title: "Festive Sparklers & Us",
    caption: "You outshine every single light, bringing pure joy to my heart.",
  },
  {
    url: "/images/polaroids/photo_roses.jpg",
    title: "Birthday Roses For You",
    caption: "A million flowers could never measure how deeply you are adored.",
  },
  {
    url: "/images/polaroids/photo_mountains.jpg",
    title: "Mountain Mist & Endless Dreams",
    caption: "My adventure partner, my peace, and my beautiful future wife.",
  },
];

const DEFAULT_CELEBRATION_LETTER = [
  "From the very first moment our paths crossed, you brought an impossible amount of light and joy into my world.",
  "Your smile is my favorite comfort, your laughter my favorite melody, and every single second shared with you is a memory I treasure deeply.",
  "On this special day, I want you to know how deeply you are appreciated, cherished, and loved.",
  "May this new chapter of your life bring you endless happiness, boundless success, and every dream your heart has ever whispered.",
  "Thank you for being the wonderful, extraordinary soul that you are. Today and every day, we celebrate you.",
  "Forever and always, with all my heart ❤️"
];

interface Scene4LetterProps {
  onRestart: () => void;
  recipientName?: string;
  senderName?: string;
  letter?: string[];
  photos?: { url: string; caption: string }[];
}

export function Scene4Letter({
  onRestart,
  recipientName = "My Love",
  senderName = "With Love",
  letter,
  photos,
}: Scene4LetterProps) {
  const paragraphs = letter && letter.length > 0 ? letter : DEFAULT_CELEBRATION_LETTER;
  const fullText = paragraphs.join("\n\n");
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState(false);

  const carouselItems = React.useMemo(() => {
    if (photos && photos.length > 0) {
      return photos.map((p, i) => ({
        url: p.url,
        title: `Memory ${i + 1}`,
        caption: p.caption,
      }));
    }
    return MEMORY_CAROUSEL;
  }, [photos]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);

  // Auto-cycle background polaroid photos every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  // Progressive streaming typewriter effect (approx 20ms per character)
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedLength, fullText.length]);

  // Automatic upward scrolling to keep the latest streaming text in focus!
  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [displayedLength]);

  const handleSkipTyping = () => {
    setDisplayedLength(fullText.length);
    setIsTypingComplete(true);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  const handleNextSlide = () => {
    soundManager.playSwooshSound();
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const handlePrevSlide = () => {
    soundManager.playSwooshSound();
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handlePlayVoiceNote = () => {
    setIsPlayingVoiceNote(true);
    soundManager.playCheerSound();

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.7 },
      colors: ["#ff7b90", "#ffbe53", "#e0a96d"],
    });

    setTimeout(() => {
      setIsPlayingVoiceNote(false);
    }, 4000);
  };

  const displayedText = fullText.slice(0, displayedLength);

  return (
    <div className="relative z-10 w-full h-[90vh] md:h-[92vh] max-w-4xl mx-auto flex flex-col justify-between items-center px-3 py-2 select-none overflow-hidden">
      {/* CINEMATIC FRAMING CARD (Prominently visible in background) */}
      <div className="absolute inset-x-2 sm:inset-x-8 top-14 bottom-16 z-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="relative w-full h-full max-w-2xl rounded-3xl overflow-hidden border-2 border-[#e0a96d]/70 shadow-[0_0_50px_rgba(224,169,109,0.4)] bg-[#120a1c]"
          >
            <Image
              src={carouselItems[currentSlide]?.url || "/images/polaroids/photo_rooftop.jpg"}
              alt={carouselItems[currentSlide]?.title || "Memory"}
              fill
              sizes="(max-width: 768px) 95vw, 680px"
              className="object-cover object-center"
              priority
            />

            {/* Polaroid Memory Label in background frame */}
            <div className="absolute top-3 left-4 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#e0a96d]/50 text-xs text-[#ffe8d6] font-serif tracking-wider flex items-center gap-1.5 shadow-lg">
              <span>📸</span>
              <span>{carouselItems[currentSlide]?.title || "Our Memory"}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP HEADER */}
      <div className="relative z-20 text-center shrink-0 pt-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#e0a96d]/30 mb-1 shadow">
          <Image src="/cake-icon.svg" alt="Cake" width={14} height={14} className="drop-shadow" />
          <span className="text-[11px] uppercase tracking-widest text-[#ffe8d6] font-medium">
            Act IV: The Love Letter
          </span>
          <Image src="/cake-icon.svg" alt="Cake" width={14} height={14} className="drop-shadow" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-gold-gradient font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          From My Heart To Yours
        </h2>
      </div>

      {/* FOREGROUND STREAMING LETTER (Ultra-Transparent Crystal Glass, Photo Clearly Visible Behind) */}
      <div className="relative z-20 w-full max-w-xl my-auto px-2">
        <div className="relative rounded-2xl bg-black/25 backdrop-blur-[2px] border border-[#ffbe53]/50 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle Heart Watermark */}
          <div className="absolute -top-10 -right-10 pointer-events-none opacity-10">
            <Heart className="w-40 h-40 text-[#ffbe53]" />
          </div>

          {/* Sticky Header Inside Card */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#e0a96d]/25 bg-black/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffbe53] animate-ping" />
              <span className="text-xs font-serif text-[#ffe8d6] tracking-wider uppercase font-semibold drop-shadow">
                {senderName} &amp; {recipientName}
              </span>
            </div>

            {/* Background Photo Navigation Controls */}
            {/* <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSlide}
                className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-[#ffe8d6] flex items-center justify-center text-xs transition cursor-pointer active:scale-90 border border-white/20"
                title="Previous photo in background"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-[#ffbe53] px-1 font-mono font-semibold drop-shadow">
                {currentSlide + 1}/{MEMORY_CAROUSEL.length}
              </span>
              <button
                onClick={handleNextSlide}
                className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-[#ffe8d6] flex items-center justify-center text-xs transition cursor-pointer active:scale-90 border border-white/20"
                title="Next photo in background"
                aria-label="Next photo"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div> */}
          </div>

          {/* AUTO-SCROLLING TEXT BODY (Sticks in screen, autoscrolls up smoothly, hidden scrollbar) */}
          <div
            ref={scrollContainerRef}
            className="h-[46vh] sm:h-[48vh] md:h-[50vh] overflow-y-auto no-scrollbar px-5 sm:px-6 py-5 font-serif text-base sm:text-lg text-[#ffffff] leading-relaxed whitespace-pre-line tracking-wide scroll-smooth [text-shadow:_0_1px_3px_rgb(0_0_0_/_95%),_0_2px_8px_rgb(0_0_0_/_90%),_0_0_15px_rgb(0_0_0_/_80%)]"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {displayedText}

            {!isTypingComplete && (
              <span className="inline-block w-2 h-4 ml-1 bg-[#ffbe53] animate-pulse align-middle shadow-[0_0_8px_#ffbe53]" />
            )}

            {/* Bottom Anchor */}
            <div ref={bottomAnchorRef} className="h-4" />

            {/* Sealed Stamp once typing is complete */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 pt-5 border-t border-[#e0a96d]/25 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs text-[#ffe8d6] drop-shadow">
                  <CheckCircle2 className="w-4 h-4 text-[#ffbe53]" />
                  <span>Written with all my heart</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-black/50 border border-[#ffbe53]/60 text-xs text-[#ffbe53] font-serif tracking-widest uppercase shadow">
                  Forever Yours
                </div>
              </motion.div>
            )}
          </div>

          {/* Skip Button (Shown while typing) */}
          {!isTypingComplete && (
            <div className="px-5 py-2 bg-black/30 border-t border-[#e0a96d]/20 flex items-center justify-between">
              <span className="text-[11px] text-[#ffe8d6]/90 italic drop-shadow">Streaming letter...</span>
              <button
                onClick={handleSkipTyping}
                className="text-xs text-[#ffbe53] hover:text-white underline transition-colors cursor-pointer drop-shadow font-medium"
              >
                Skip to read all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM ACTIONS (Fixed in view, never pushed offscreen) */}
      <div className="relative z-20 w-full max-w-md flex flex-col gap-2 items-center text-center shrink-0 pb-1">
        <button
          onClick={handlePlayVoiceNote}
          className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-medium text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.4)] hover:shadow-[0_0_35px_rgba(255,190,83,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Volume2 className="w-4 h-4 fill-current" />
          <span>
            {isPlayingVoiceNote ? "Playing Special Birthday Wish... ✨" : "A Special Birthday Whisper For You 💌"}
          </span>
        </button>

        <button
          onClick={() => {
            soundManager.playSwooshSound();
            onRestart();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-[#a8998d] hover:text-[#ffe8d6] transition-colors py-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Relive the Birthday Journey From Act 1</span>
        </button>
      </div>
    </div>
  );
}
