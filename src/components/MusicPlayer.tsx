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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      onClick={handleToggle}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 flex items-center justify-center rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53]/80 bg-[#120c20]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,190,83,0.35)] transition-all duration-300 cursor-pointer active:scale-90 group"
      aria-label={isSilenced ? "Unmute background music" : "Mute background music"}
      title={isSilenced ? "Unmute Music" : "Mute Music"}
    >
      {isSilenced ? (
        <VolumeX className="w-5 h-5 text-[#ff7b90] transition-transform duration-300 group-hover:scale-110" />
      ) : (
        <Volume2 className="w-5 h-5 text-[#ffbe53] transition-transform duration-300 group-hover:scale-110" />
      )}
    </motion.button>
  );
}
