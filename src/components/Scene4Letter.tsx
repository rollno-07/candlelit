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

const LOVE_LETTER_PARAGRAPHS = [
  "My Dearest Nidhi,",
  "Happy Birthday to the Most Special Person in My Life ❤️🥹",
  "Sometimes, I wonder how a person who came into my life recently could become so special to my heart. And then I remember all the little moments we have shared, and I realise that some people don’t need years to create a place in your heart. They just need a little understanding, a little care, and a beautiful heart like yours. ❤️",
  "I still remember the first day we spoke over the phone. When I explained my mother’s condition to you, I didn’t know what you would think or whether you would want to continue talking to me. But you understood my situation, accepted everything, and chose to move forward with me. That day, you gave me something precious — the feeling that someone could understand my life without judging me. 🫶🏻",
  "Then came the most difficult phase of my life, when I lost my mother. 💔 I lost the person who was my whole world. You couldn’t be physically beside me, but you were there emotionally, checking on me over calls, asking whether I was okay, and making sure I wasn’t going through everything alone. You may not realise how much those little things meant to me, but during those days, your care brought me comfort when I needed it the most.",
  "I still remember the first time I saw you at the hotel. I had so many things running through my mind and so many things I wanted to tell you, but I couldn’t express them. I was wondering whether you would like me, whether you would feel the same way, and whether this beautiful beginning would turn into something meaningful. ❤️",
  "And how can I ever forget that moment at the railway station when you were leaving for Hyderabad? We were waiting for your train, and you gently rested your head on my shoulder. 🥹❤️",
  "I don’t know how to explain that feeling in words. For a few moments, everything felt so peaceful. I just wanted time to stop right there, because that little moment gave me a happiness I will always carry in my heart.",
  "Then came those three beautiful days we spent together in Mumbai. Going to the mandir, shopping together, holding your bag while you were in the changing room, holding your hand at the mandir, and taking God’s blessings with you beside me. 🙏🏻❤️",
  "These may seem like ordinary moments to the world, but for me, they are memories I will cherish forever. Because happiness isn’t always about expensive gifts or grand celebrations. Sometimes, happiness is simply walking beside the person you care about, holding their hand, and wishing that life gives you many more such moments together.",
  "And you know what makes you even more special to me?\n\nWhen you ask me, “Where are you?” “Have you eaten?” “Office se aa gaye?” 🥹❤️\n\nThese little questions may sound simple, but they mean so much to me. They make me feel cared for. They make me feel that someone is waiting to know how my day went. After my mother’s love, experiencing this kind of care again means more to me than I can ever explain.",
  "2026 has taken away the most precious person in my life — my mother, my whole world. 💔 There is an emptiness in my heart that no one can ever completely replace.",
  "But somewhere in the middle of all this pain, God also brought you into my life. And I feel blessed that, after so much sadness, I have someone with whom I can share my thoughts, my happiness, my fears, and my future.",
  "You can never replace my mother, and I would never expect you to. But the love, warmth, understanding, and care you have brought into my life have made my lonely days feel a little less lonely. And for that, I will always be grateful to you. ❤️🫂",
  "Sometimes, I think about my mother and wonder how happy she would have been if she were here today to see you in my life. I imagine her smiling, knowing that someone is there to care for me, understand me, and walk beside me. I truly believe your presence would have brought so much happiness to her heart, too. ❤️🙏🏻",
  "And today, on your birthday, I keep thinking that I should be the one giving you gifts, making you feel special, and bringing happiness to your face.",
  "But the truth is, you have already given me so many beautiful gifts without even wrapping them.",
  "You have given me your time, your understanding, your care, your hand to hold, your shoulder to lean on, and memories that I will treasure for the rest of my life. You have given me reasons to smile during a time when smiling wasn’t easy.",
  "And these are gifts that no money in this world can buy. 🥹❤️",
  "I don’t know what our future holds in every little detail, but I know what I wish for us. I wish to see you happy, to stand beside you in your difficult times the way you stood beside me in mine, to celebrate your successes, to hold your hand through life’s challenges, and to create countless beautiful memories together.",
  "I want to be the person you can share everything with — your happiness, your worries, your dreams, and even your silence. I want us to look back years from now and smile at how beautifully our story began.",
  "So, my future wife, my favourite person, and the one who has brought a little more light into my life — Happy Birthday! 🎂❤️😘",
  "May God bless you with endless happiness, good health, success, peace, and all the beautiful things your heart wishes for. May your smile always remain the same, and may I get the privilege of being one of the reasons behind it.",
  "Thank you for coming into my life. Thank you for understanding me. Thank you for being there when I needed someone. And thank you for giving me so many moments that have become precious parts of my life.",
  "I may not always find the perfect words to express what I feel, but today I just want you to know one thing:",
  "Your birthday is the day you came into this world, but your presence has made my world a little more beautiful. ❤️🫶🏻",
  "Happy Birthday, my special one. May this be the first of many birthdays we celebrate together, with more love, more laughter, more memories, and a lifetime of togetherness.",
  "I hope one day I can hold your hand, look into your eyes, and wish you a happy birthday in person — as your husband. 🥹❤️💍",
  "Until then, sending you all my love, the warmest hugs, and the sweetest birthday wishes.",
  "Happy Birthday, my future wife. You are already a beautiful part of my heart and my story. ❤️😘🎂",
  "Forever and always yours,\nVishal ❤️",
];

interface Scene4LetterProps {
  onRestart: () => void;
}

export function Scene4Letter({ onRestart }: Scene4LetterProps) {
  const fullText = LOVE_LETTER_PARAGRAPHS.join("\n\n");
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);

  // Auto-cycle background polaroid photos every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % MEMORY_CAROUSEL.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

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
    setCurrentSlide((prev) => (prev + 1) % MEMORY_CAROUSEL.length);
  };

  const handlePrevSlide = () => {
    soundManager.playSwooshSound();
    setCurrentSlide((prev) => (prev - 1 + MEMORY_CAROUSEL.length) % MEMORY_CAROUSEL.length);
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
              src={MEMORY_CAROUSEL[currentSlide].url}
              alt={MEMORY_CAROUSEL[currentSlide].title}
              fill
              sizes="(max-width: 768px) 95vw, 680px"
              className="object-cover object-center"
              priority
            />

            {/* Polaroid Memory Label in background frame */}
            <div className="absolute top-3 left-4 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#e0a96d]/50 text-xs text-[#ffe8d6] font-serif tracking-wider flex items-center gap-1.5 shadow-lg">
              <span>📸</span>
              <span>{MEMORY_CAROUSEL[currentSlide].title}</span>
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
                Vishal &amp; Nidhi
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
