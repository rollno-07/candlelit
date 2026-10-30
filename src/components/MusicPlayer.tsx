"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundManager } from "@/utils/audioSynthesizer";
import { motion } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((playing, muted) => {
      setIsPlaying(playing);
      setIsMuted(muted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    if (!isPlaying && isMuted) {
      soundManager.toggleMute();
    } else if (!isPlaying) {
      soundManager.unlockAudio();
    } else {
      soundManager.toggleMute();
    }
  };

  const isSilenced = isMuted || !isPlaying;

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      onClick={handleToggle}
      className="fixed top-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-[#e0a96d]/30 hover:border-[#ffbe53]/60 transition-all duration-300 text-sm text-[#ffe8d6] shadow-lg group cursor-pointer active:scale-95"
      aria-label={isSilenced ? "Play romantic background music" : "Mute background music"}
      title={isSilenced ? "Play Music" : "Mute Music"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isSilenced ? (
          <VolumeX className="w-4 h-4 text-[#ff7b90]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#ffbe53]" />
        )}
      </div>

      <div className="flex items-center gap-0.5 h-3 px-0.5">
        {!isSilenced ? (
          <>
            <span className="w-0.5 h-3 bg-[#ffbe53] rounded-full animate-pulse" />
            <span className="w-0.5 h-2 bg-[#e0a96d] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <span className="w-0.5 h-3.5 bg-[#ff7b90] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="w-0.5 h-2 bg-[#ffbe53] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
          </>
        ) : (
          <span className="text-[11px] text-[#a8998d]">Music Off</span>
        )}
      </div>
    </motion.button>
  );
}
