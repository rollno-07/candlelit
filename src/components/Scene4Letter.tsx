"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronLeft, ChevronRight, RotateCcw, Volume2, CheckCircle2 } from "lucide-react";
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

  // Progressive streaming typewriter effect (approx 20ms per character for smooth reading)
  useEffect(() => {
    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedLength((prev) => prev + 1);
      }, 18);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedLength, fullText.length]);

  const handleSkipTyping = () => {
    setDisplayedLength(fullText.length);
    setIsTypingComplete(true);
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
    <div className="relative z-10 w-full min-h-[92vh] flex flex-col items-center px-4 py-8 max-w-2xl mx-auto">
      {/* Title Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 mb-3">
          <Image src="/cake-icon.svg" alt="Cake" width={16} height={16} className="drop-shadow" />
          <span className="text-xs uppercase tracking-widest text-[#ffe8d6] font-medium">
            Act IV: The Love Letter
          </span>
          <Image src="/cake-icon.svg" alt="Cake" width={16} height={16} className="drop-shadow" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-gold-gradient font-light">
          From My Heart To Yours
        </h2>
      </motion.div>

      {/* Memory Carousel Showcase */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md mx-auto mb-10"
      >
        <div className="relative bg-[#faf6f0] p-4 rounded-2xl shadow-2xl border-4 border-white/90 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/10 mb-3 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={MEMORY_CAROUSEL[currentSlide].url}
                  alt={MEMORY_CAROUSEL[currentSlide].title}
                  fill
                  sizes="(max-width: 640px) 90vw, 420px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Polaroid Caption */}
          <div className="text-center px-2">
            <h4 className="font-serif text-lg font-bold text-[#2a1b12]">
              {MEMORY_CAROUSEL[currentSlide].title}
            </h4>
            <p className="font-serif text-xs text-[#5c493c] italic mt-0.5">
              &ldquo;{MEMORY_CAROUSEL[currentSlide].caption}&rdquo;
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {MEMORY_CAROUSEL.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playSwooshSound();
                  setCurrentSlide(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "w-5 bg-[#c68953]" : "bg-[#d3c2b4]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Streaming Love Letter Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full rounded-2xl glass-card p-6 md:p-8 border border-[#e0a96d]/30 shadow-2xl relative overflow-hidden mb-8"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <Heart className="w-32 h-32 text-[#e0a96d]" />
        </div>

        {/* Letter Content with Typewriter */}
        <div className="relative font-serif text-base md:text-lg text-[#f7ede2] leading-relaxed whitespace-pre-line tracking-wide">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-4 ml-1 bg-[#ffbe53] animate-pulse" />
          )}
        </div>

        {/* Skip button during typing */}
        {!isTypingComplete && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSkipTyping}
              className="text-xs text-[#d1c4b9]/70 hover:text-[#ffbe53] transition-colors underline cursor-pointer"
            >
              Skip streaming &amp; read all
            </button>
          </div>
        )}

        {/* Sealed Stamp once typing is complete */}
        {isTypingComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 pt-6 border-t border-[#e0a96d]/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 text-xs text-[#e0a96d]">
              <CheckCircle2 className="w-4 h-4 text-[#ffbe53]" />
              <span>Written with all my heart</span>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#ffbe53]/10 border border-[#ffbe53]/40 text-xs text-[#ffbe53] font-serif tracking-widest uppercase">
              Vishal &amp; Nidhi
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Special Voice Note / Finale Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md flex flex-col gap-3 items-center text-center"
      >
        <button
          onClick={handlePlayVoiceNote}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] font-medium text-sm tracking-wide shadow-[0_0_30px_rgba(255,190,83,0.4)] hover:shadow-[0_0_45px_rgba(255,190,83,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <Volume2 className="w-4 h-4 fill-current" />
          <span>
            {isPlayingVoiceNote ? "Playing Special Birthday Wish... ✨" : "A Special Birthday Whisper For You 💌"}
          </span>
        </button>

        {/* Replay Entire Journey */}
        <button
          onClick={() => {
            soundManager.playSwooshSound();
            onRestart();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-[#a8998d] hover:text-[#ffe8d6] transition-colors py-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Relive the Birthday Journey From Act 1</span>
        </button>
      </motion.div>
    </div>
  );
}
