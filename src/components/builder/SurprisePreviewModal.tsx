"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck,
  Mail,
  PartyPopper,
  Flame,
  FileText,
  Volume2,
  ArrowLeft,
} from "lucide-react";
import { Scene1Intro } from "@/components/Scene1Intro";
import { Scene2Balloons } from "@/components/Scene2Balloons";
import { Scene3Ceremony } from "@/components/ceremonies/Scene3Ceremony";
import { Scene4Letter } from "@/components/Scene4Letter";
import { BackgroundFX } from "@/components/BackgroundFX";
import { soundManager } from "@/utils/audioSynthesizer";

interface SurprisePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  senderName: string;
  templateId?: string;
  occasionSubtitle?: string;
  cakeOrObjectMessage?: string;
  photos: { url: string; caption: string }[];
  letter: string[];
  musicTitle?: string;
  musicUrl?: string;
  onProceedToPay: () => void;
}

type ActNumber = 1 | 2 | 3 | 4;

export function SurprisePreviewModal({
  isOpen,
  onClose,
  recipientName,
  senderName,
  templateId = "birthday-surprise",
  cakeOrObjectMessage,
  photos,
  letter,
  musicTitle,
  musicUrl,
  onProceedToPay,
}: SurprisePreviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentAct, setCurrentAct] = useState<ActNumber>(1);
  const effectiveRecipient = recipientName.trim() || "Your Loved One";
  const effectiveSender = senderName.trim() || "With All My Heart";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && musicUrl) {
      soundManager.setCustomTrack(musicUrl);
    }
  }, [isOpen, musicUrl]);

  const acts = [
    { num: 1 as ActNumber, label: "Act 1: Invitation", icon: Mail },
    { num: 2 as ActNumber, label: "Act 2: Memories", icon: PartyPopper },
    { num: 3 as ActNumber, label: "Act 3: Ceremony", icon: Flame },
    { num: 4 as ActNumber, label: "Act 4: Letter", icon: FileText },
  ];

  const handleNextAct = () => {
    if (currentAct < 4) setCurrentAct((prev) => (prev + 1) as ActNumber);
  };

  const handlePrevAct = () => {
    if (currentAct > 1) setCurrentAct((prev) => (prev - 1) as ActNumber);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-0 sm:p-4 overflow-hidden">
        {/* Dark Backdrop with blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Unmissable Viewport-Level Return Button */}
        <button
          onClick={onClose}
          className="fixed top-3 left-3 sm:top-4 sm:left-4 z-[100000] flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#180e2a] hover:bg-[#251540] border-2 border-[#ffbe53] text-[#ffbe53] hover:text-white text-xs sm:text-sm font-bold shadow-[0_4px_24px_rgba(0,0,0,0.95),0_0_20px_rgba(255,190,83,0.5)] backdrop-blur-xl active:scale-95 transition-all cursor-pointer"
          title="Return to Checkout"
        >
          <ArrowLeft className="w-4 h-4 text-[#ffbe53]" />
          <span>← Back to Checkout</span>
        </button>

        {/* Modal Card Over Checkout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl h-full sm:h-[92vh] rounded-none sm:rounded-3xl glass-panel border sm:border-[#e0a96d]/40 bg-[#0d0718] sm:bg-[#0d0718]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar */}
          <div className="shrink-0 px-3 sm:px-6 py-3.5 border-b border-[#e0a96d]/20 bg-[#140b24]/80 flex items-center justify-between gap-2 sm:gap-3 pl-44 sm:pl-48">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-xs shadow-md border border-[#ffbe53]/40">
                  <Eye className="w-3.5 h-3.5 text-[#1a1006]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-gold-gradient">
                      Surprise Preview
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[9px] text-emerald-400 font-medium">
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] text-[#a8998d] truncate max-w-[160px] sm:max-w-xs">
                    For <strong className="text-[#ffe8d6]">{effectiveRecipient}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Act Navigation Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              {acts.map((act) => {
                const Icon = act.icon;
                const isActive = currentAct === act.num;
                return (
                  <button
                    key={act.num}
                    onClick={() => {
                      soundManager.unlockAudio();
                      setCurrentAct(act.num);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#e0a96d]/30 to-[#ffbe53]/30 text-[#ffbe53] border border-[#ffbe53]/40 shadow-sm"
                        : "text-[#a8998d] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onProceedToPay();
                }}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold shadow-[0_0_20px_rgba(255,190,83,0.35)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] cursor-pointer active:scale-95 transition-all"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay ₹250 & Launch</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#a8998d] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close Preview"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Watermark Banner */}
          <div className="shrink-0 px-4 py-1.5 bg-[#ffbe53]/10 border-b border-[#ffbe53]/20 flex items-center justify-between text-[11px] text-[#ffbe53]">
            <div className="flex items-center gap-2 mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53] shrink-0 animate-pulse" />
              <span>
                <strong>Demo Preview Mode:</strong> Interactive craft preview. Public link activates immediately upon ₹250 payment.
              </span>
            </div>
          </div>

          {/* Mobile Act Selector */}
          <div className="flex md:hidden shrink-0 px-3 py-2 border-b border-white/5 bg-black/30 justify-between gap-1 overflow-x-auto">
            {acts.map((act) => {
              const Icon = act.icon;
              const isActive = currentAct === act.num;
              return (
                <button
                  key={act.num}
                  onClick={() => {
                    soundManager.unlockAudio();
                    setCurrentAct(act.num);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium flex items-center gap-1 shrink-0 ${
                    isActive
                      ? "bg-[#ffbe53]/20 text-[#ffbe53] border border-[#ffbe53]/40"
                      : "text-[#a8998d]"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{act.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Scene Body */}
          <div className="relative flex-1 min-h-0 w-full overflow-y-auto overflow-x-hidden bg-[#0a0714] flex flex-col items-center justify-center">
            {/* Background Atmosphere */}
            <BackgroundFX />

            {/* Floating Quick Return Button inside scene */}
            <div className="absolute top-3 left-3 z-30">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-black border border-[#e0a96d]/50 text-[#ffbe53] hover:text-white text-xs font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md active:scale-95 transition-all cursor-pointer"
                title="Return to checkout"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#ffbe53]" />
                <span>Back to Checkout</span>
              </button>
            </div>

            {/* Render Act Scenes with live craft details */}
            <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col items-center justify-center p-1 sm:p-3 overflow-hidden">
              <AnimatePresence mode="wait">
                {currentAct === 1 && (
                  <motion.div
                    key="modal-act-1"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Scene1Intro
                      recipientName={effectiveRecipient}
                      senderName={effectiveSender}
                      templateId={templateId}
                      onComplete={() => setCurrentAct(2)}
                    />
                  </motion.div>
                )}

                {currentAct === 2 && (
                  <motion.div
                    key="modal-act-2"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Scene2Balloons
                      photos={photos}
                      templateId={templateId}
                      onComplete={() => setCurrentAct(3)}
                    />
                  </motion.div>
                )}

                {currentAct === 3 && (
                  <motion.div
                    key="modal-act-3"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Scene3Ceremony
                      recipientName={effectiveRecipient}
                      senderName={effectiveSender}
                      templateId={templateId}
                      cakeOrObjectMessage={cakeOrObjectMessage}
                      onComplete={() => setCurrentAct(4)}
                    />
                  </motion.div>
                )}

                {currentAct === 4 && (
                  <motion.div
                    key="modal-act-4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Scene4Letter
                      recipientName={effectiveRecipient}
                      senderName={effectiveSender}
                      letter={letter}
                      photos={photos}
                      templateId={templateId}
                      onRestart={() => setCurrentAct(1)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="shrink-0 px-4 sm:px-6 py-3.5 border-t border-[#e0a96d]/20 bg-[#140b24]/90 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Act Step navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevAct}
                disabled={currentAct === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-[#a8998d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Act</span>
              </button>

              <span className="text-xs text-[#d1c4b9] font-mono px-2">
                Act {currentAct} of 4
              </span>

              <button
                onClick={handleNextAct}
                disabled={currentAct === 4}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-[#a8998d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
              >
                <span>Next Act</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Launch CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-[#e0a96d]/40 bg-black/50 hover:bg-[#ffbe53]/10 text-xs font-semibold text-[#ffbe53] hover:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors active:scale-95 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Checkout</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onProceedToPay();
                }}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold shadow-[0_0_20px_rgba(255,190,83,0.4)] hover:shadow-[0_0_30px_rgba(255,190,83,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Pay ₹250 & Launch</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
