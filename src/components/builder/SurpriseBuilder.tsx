"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Image as ImageIcon,
  FileText,
  Music,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Check,
  Eye,
  Share2,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Upload,
  Play,
  Pause,
  Disc
} from "lucide-react";
import { TemplateDefinition, SurpriseData } from "@/types/candlelit";
import { saveSurprise } from "@/lib/surprisesStore";
import { useAuth } from "@/lib/authContext";
import { processRazorpayPayment } from "@/utils/razorpayClient";
import { soundManager } from "@/utils/audioSynthesizer";
import { ShareModal } from "./ShareModal";
import { SurprisePreviewModal } from "./SurprisePreviewModal";
import { AuthModal } from "../auth/AuthModal";

interface SurpriseBuilderProps {
  template: TemplateDefinition;
}

export function SurpriseBuilder({ template }: SurpriseBuilderProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states initialized with template defaults
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [date, setDate] = useState("");
  const [occasionSubtitle, setOccasionSubtitle] = useState(template.defaultFields.occasionSubtitle);
  const [cakeOrObjectMessage, setCakeOrObjectMessage] = useState(template.defaultFields.cakeOrObjectMessage);
  const [subtype, setSubtype] = useState(template.options?.subtypes?.[0] || template.options?.days?.[0] || "");

  const [photos, setPhotos] = useState<{ url: string; caption: string }[]>(
    template.defaultFields.defaultPhotos
  );

  const [letterParagraphs, setLetterParagraphs] = useState<string[]>(
    template.defaultFields.defaultLetter
  );

  const [musicUrl, setMusicUrl] = useState(template.defaultFields.musicUrl);
  const [musicTitle, setMusicTitle] = useState(template.defaultFields.musicLabel);

  // Custom audio upload & preview state
  const [customAudioInfo, setCustomAudioInfo] = useState<{
    name: string;
    sizeFormatted: string;
  } | null>(null);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [isPlayingCustomAudio, setIsPlayingCustomAudio] = useState(false);
  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Clean up any playing audio when entering or leaving checkout
  useEffect(() => {
    soundManager.stopBGM();
    return () => {
      soundManager.stopBGM();
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  const handleOpenDemo = () => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      setIsPlayingCustomAudio(false);
    }
    soundManager.unlockAudio();
    setShowPreviewModal(true);
  };

  const handleCloseDemo = () => {
    soundManager.stopBGM();
    setShowPreviewModal(false);
    setCurrentStep(4);
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("Audio file is larger than 15MB. Please choose an audio file under 15MB.");
      return;
    }

    setIsUploadingAudio(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      setCustomAudioInfo({
        name: file.name,
        sizeFormatted: sizeMB,
      });
      setMusicTitle(`Custom Song: ${file.name}`);
      setMusicUrl(result);
      soundManager.setCustomTrack(result);
      setIsUploadingAudio(false);
    };
    reader.onerror = () => {
      alert("Could not load audio file. Please try another audio format (.mp3, .wav, .m4a).");
      setIsUploadingAudio(false);
    };
    reader.readAsDataURL(file);
  };

  const togglePreviewAudio = () => {
    if (!musicUrl) return;

    if (!previewAudioRef.current || previewAudioRef.current.src !== musicUrl) {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
      const audio = new Audio(musicUrl);
      audio.onended = () => setIsPlayingCustomAudio(false);
      previewAudioRef.current = audio;
    }

    if (isPlayingCustomAudio) {
      previewAudioRef.current.pause();
      setIsPlayingCustomAudio(false);
    } else {
      soundManager.stopBGM();
      previewAudioRef.current.play().catch(() => {});
      setIsPlayingCustomAudio(true);
    }
  };

  // Modal states
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Calculate live slug
  const cleanRecipient = recipientName.trim().toLowerCase().replace(/[^a-z0-9]/g, "") || "someone";
  const currentSlug = `${template.id}-${cleanRecipient}`;

  // Photo handlers
  const handleAddPhoto = () => {
    setPhotos([...photos, { url: template.previewImage, caption: "A moment I cherish ✨" }]);
  };

  const handleUpdatePhoto = (idx: number, field: "url" | "caption", val: string) => {
    const updated = [...photos];
    updated[idx] = { ...updated[idx], [field]: val };
    setPhotos(updated);
  };

  const handleRemovePhoto = (idx: number) => {
    if (photos.length <= 1) return;
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  // Letter handlers
  const handleUpdateParagraph = (idx: number, val: string) => {
    const updated = [...letterParagraphs];
    updated[idx] = val;
    setLetterParagraphs(updated);
  };

  const handleAddParagraph = () => {
    setLetterParagraphs([...letterParagraphs, ""]);
  };

  const handleRemoveParagraph = (idx: number) => {
    if (letterParagraphs.length <= 1) return;
    setLetterParagraphs(letterParagraphs.filter((_, i) => i !== idx));
  };

  // Save / Create handler with Razorpay Payment (₹250)
  const handleCreate = async () => {
    if (!recipientName.trim()) {
      alert("Please enter the name of the recipient.");
      setCurrentStep(1);
      return;
    }

    setIsSaving(true);
    try {
      // 1. Process payment via Razorpay for ₹250
      const payment = await processRazorpayPayment({
        amountInRupees: 250,
        templateId: template.id,
        recipientName: recipientName.trim(),
        userEmail: user?.email,
        userName: user?.name,
      });

      if (!payment.success) {
        if (payment.error && !payment.error.includes("cancelled") && !payment.error.includes("closed")) {
          alert(`Payment not completed: ${payment.error}`);
        }
        setIsSaving(false);
        return;
      }

      // 2. Prepare surprise data with verified payment records
      const surpriseData: SurpriseData = {
        id: `surprise-${Date.now()}`,
        slug: currentSlug,
        templateId: template.id,
        recipientName: recipientName.trim(),
        senderName: senderName.trim() || "Someone who loves you",
        date,
        occasionSubtitle,
        cakeOrObjectMessage: cakeOrObjectMessage || `Happy ${template.title}`,
        subtype,
        photos,
        letter: letterParagraphs.filter((p) => p.trim().length > 0),
        musicUrl,
        musicTitle,
        createdAt: new Date().toISOString(),
        userId: user?.id,
        isPaid: true,
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        amountPaid: 250,
      };

      const slug = await saveSurprise(surpriseData, user?.id);
      setCreatedSlug(slug);
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : "Failed to complete creation.";
      alert(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0714] text-[#fdf8f4] pt-20 sm:pt-24 pb-12 sm:pb-16 px-3.5 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb & Template Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-[#e0a96d]/20">
          <div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs text-[#a8998d] hover:text-[#ffbe53] transition-colors mb-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all templates</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-medium flex items-center gap-2">
              <span>{template.emoji}</span>
              <span>Customize: {template.title}</span>
            </h1>
          </div>

          {/* Studio Header Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenDemo}
              className="px-3.5 py-1.5 rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53] text-[#ffe8d6] hover:text-[#ffbe53] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm active:scale-95"
              title="Test Demo Preview of your craft"
            >
              <Eye className="w-3.5 h-3.5 text-[#ffbe53]" />
              <span>Test Demo</span>
            </button>
            <div className="hidden sm:flex px-3.5 py-1.5 rounded-full bg-[#120c20]/90 border border-[#e0a96d]/30 text-xs text-[#ffe8d6] items-center gap-2 shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
              <span className="font-medium text-[11px] tracking-wide">
                Step {currentStep} of 4 • Studio Draft
              </span>
            </div>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="mb-6 sm:mb-8">
          {/* Mobile Step Status Label */}
          <div className="flex sm:hidden items-center justify-between px-1 mb-2">
            <div className="flex items-center gap-1.5 text-xs text-[#ffbe53] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ffbe53] animate-pulse" />
              <span>Step {currentStep} of 4:</span>
              <span className="text-white font-semibold">
                {currentStep === 1 && "Details"}
                {currentStep === 2 && "Memories & Photos"}
                {currentStep === 3 && "Love Letter"}
                {currentStep === 4 && "Music & Checkout"}
              </span>
            </div>
            <span className="text-[10px] text-[#a8998d] font-mono">
              {Math.round((currentStep / 4) * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {[
              { num: 1, label: "Details" },
              { num: 2, label: "Memories" },
              { num: 3, label: "Letter" },
              { num: 4, label: "Music" },
            ].map((tab) => (
              <button
                key={tab.num}
                onClick={() => setCurrentStep(tab.num as any)}
                className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  currentStep === tab.num
                    ? "bg-gradient-to-r from-[#e0a96d]/30 to-[#ffbe53]/30 text-[#ffbe53] border border-[#ffbe53]/50 shadow-md font-semibold"
                    : currentStep > tab.num
                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                    : "bg-white/5 border border-white/5 text-[#a8998d] hover:text-white"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/40 text-[10px] flex items-center justify-center shrink-0">
                  {currentStep > tab.num ? "✓" : tab.num}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl sm:rounded-3xl glass-panel border border-[#e0a96d]/30 bg-[#120c20]/80 backdrop-blur-xl p-4 sm:p-6 md:p-8 shadow-2xl">
          {/* STEP 1: BASIC DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium mb-1">
                  1. Who is this special surprise for?
                </h3>
                <p className="text-xs text-[#a8998d]">
                  Their name will be featured on the envelope, cake, and personalized letter.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1.5">
                    Recipient&apos;s Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Sophia"
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 sm:px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1.5">
                    Your Name (Sender)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 sm:px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
                  />
                </div>
              </div>

              {/* Subtype / Category Option if exists */}
              {template.options?.subtypes && (
                <div>
                  <label className="block text-xs font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1.5">
                    Anniversary Type
                  </label>
                  <select
                    value={subtype}
                    onChange={(e) => setSubtype(e.target.value)}
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 sm:px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbe53]"
                  >
                    {template.options.subtypes.map((sub) => (
                      <option key={sub} value={sub} className="bg-[#120c20]">
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {template.options?.days && (
                <div>
                  <label className="block text-xs font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1.5">
                    Valentine&apos;s Special Day
                  </label>
                  <select
                    value={subtype}
                    onChange={(e) => setSubtype(e.target.value)}
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 sm:px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbe53]"
                  >
                    {template.options.days.map((day) => (
                      <option key={day} value={day} className="bg-[#120c20]">
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1.5">
                  Centerpiece / Cake Message
                </label>
                <input
                  type="text"
                  value={cakeOrObjectMessage}
                  onChange={(e) => setCakeOrObjectMessage(e.target.value)}
                  placeholder={`e.g. Happy Birthday ${recipientName || "Sophia"}`}
                  className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 sm:px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
                />
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <span>Next: Add Memories & Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MEMORIES & PHOTOS */}
          {currentStep === 2 && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium mb-1">
                    2. Cherished Memories & Photos
                  </h3>
                  <p className="text-xs text-[#a8998d]">
                    These will be revealed when popping the floating starlight balloons in Act II.
                  </p>
                </div>
                <button
                  onClick={handleAddPhoto}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 border border-[#ffbe53]/40 text-xs font-semibold text-[#ffbe53] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3.5"
                  >
                    <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/15">
                          <Image
                            src={photo.url}
                            alt={`Photo ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="sm:hidden text-xs text-[#d1c4b9]">
                          <span className="font-semibold text-white block">Memory #{idx + 1}</span>
                          <span className="text-[11px] text-[#a8998d]">Balloon reveal</span>
                        </div>
                      </div>

                      {photos.length > 1 && (
                        <button
                          onClick={() => handleRemovePhoto(idx)}
                          className="sm:hidden p-2 rounded-lg text-[#ff7b90] hover:bg-[#ff7b90]/10 transition-colors cursor-pointer"
                          title="Remove photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={photo.url}
                        onChange={(e) => handleUpdatePhoto(idx, "url", e.target.value)}
                        placeholder="Image URL or preset path"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53]"
                      />
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handleUpdatePhoto(idx, "caption", e.target.value)}
                        placeholder="Sweet caption (e.g. Under the stars with you ✨)"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ffbe53] placeholder-white/30 focus:outline-none focus:border-[#ffbe53]"
                      />
                    </div>

                    {photos.length > 1 && (
                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="hidden sm:block p-2 rounded-lg text-[#ff7b90] hover:bg-[#ff7b90]/10 transition-colors shrink-0 cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer text-center"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <span>Next: Write Love Letter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: THE LOVE LETTER */}
          {currentStep === 3 && (
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium mb-1">
                    3. The Streaming Love Letter
                  </h3>
                  <p className="text-xs text-[#a8998d]">
                    This letter streams line by line with gentle auto-scroll in Act IV.
                  </p>
                </div>
                <button
                  onClick={handleAddParagraph}
                  className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 border border-[#ffbe53]/40 text-xs font-semibold text-[#ffbe53] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Paragraph</span>
                </button>
              </div>

              <div className="space-y-3">
                {letterParagraphs.map((para, idx) => (
                  <div key={idx} className="relative">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                      placeholder={`Paragraph ${idx + 1}...`}
                      className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-2xl p-3.5 sm:p-4 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors resize-y leading-relaxed pr-10"
                    />
                    {letterParagraphs.length > 1 && (
                      <button
                        onClick={() => handleRemoveParagraph(idx)}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-[#a8998d] hover:text-[#ff7b90] hover:bg-white/5 transition-colors cursor-pointer"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer text-center"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  <span>Next: Choose Music & Finish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MUSIC & PUBLISH */}
          {currentStep === 4 && (
            <div className="space-y-5 sm:space-y-6">
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium mb-1">
                  4. Background Music & Theme
                </h3>
                <p className="text-xs text-[#a8998d]">
                  Upload your own favorite song or choose from our handcrafted acoustic melodies.
                </p>
              </div>

              {/* OPTION 1: USER CUSTOM MUSIC UPLOAD */}
              <div className="p-3.5 sm:p-5 rounded-2xl border-2 border-dashed border-[#ffbe53]/40 bg-[#160d26]/70 hover:border-[#ffbe53] transition-colors relative overflow-hidden group">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#ffbe53]/15 border border-[#ffbe53]/40 flex items-center justify-center text-[#ffbe53] shrink-0 shadow-md">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          Upload Custom Song
                        </span>
                        {customAudioInfo && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            ✓ Active Song
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#a8998d] mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                        {customAudioInfo
                          ? `${customAudioInfo.name} (${customAudioInfo.sizeFormatted})`
                          : "Upload MP3, WAV, or M4A (Max 15MB)"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {customAudioInfo && (
                      <button
                        type="button"
                        onClick={togglePreviewAudio}
                        className="flex-1 sm:flex-initial px-3.5 py-2 rounded-full bg-black/60 hover:bg-black border border-[#ffbe53]/50 text-xs font-semibold text-[#ffbe53] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm active:scale-95"
                      >
                        {isPlayingCustomAudio ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pause</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Preview</span>
                          </>
                        )}
                      </button>
                    )}

                    <label className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-bold shadow-md hover:shadow-lg cursor-pointer transition-all active:scale-95 text-center flex items-center justify-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{customAudioInfo ? "Replace Song" : "Choose File"}</span>
                      <input
                        type="file"
                        accept=".mp3,.wav,.m4a,.ogg,audio/*"
                        onChange={handleAudioFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {isUploadingAudio && (
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-[#ffbe53]">
                    <div className="w-3 h-3 rounded-full border-2 border-t-transparent border-[#ffbe53] animate-spin" />
                    <span>Processing audio file...</span>
                  </div>
                )}
              </div>

              {/* OPTION 2: CURATED PRESETS */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#a8998d] mb-2.5 block">
                  Or Choose A Handcrafted Preset Melody:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    {
                      title: "Romantic Ambient Piano & Music Box (Low Volume)",
                      url: "/audio/bgm.mp3",
                    },
                    {
                      title: "Soft Acoustic Reverie (Low Volume)",
                      url: "/audio/bgm.mp3",
                    },
                    {
                      title: "Starlight Piano Whispers",
                      url: "/audio/bgm.mp3",
                    },
                    {
                      title: "Sunset Lo-fi Warmth",
                      url: "/audio/bgm.mp3",
                    },
                  ].map((track, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setMusicTitle(track.title);
                        setMusicUrl(track.url);
                        setCustomAudioInfo(null);
                        soundManager.setCustomTrack(null);
                      }}
                      className={`p-3 sm:p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        musicTitle === track.title
                          ? "bg-[#ffbe53]/20 border-[#ffbe53] shadow-lg text-white"
                          : "bg-black/40 border-white/10 hover:border-white/20 text-[#d1c4b9]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center text-[#ffbe53] shrink-0">
                          <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold block">{track.title}</span>
                          <span className="text-[10px] text-[#a8998d]">Curated Track</span>
                        </div>
                      </div>
                      {musicTitle === track.title && <Check className="w-4 h-4 text-[#ffbe53] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-[#e0a96d]/30 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#ffbe53] font-semibold block">
                  Surprise Summary:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Recipient:</span>
                    <strong className="text-white truncate block">{recipientName || "Not set"}</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Occasion:</span>
                    <strong className="text-white truncate block">{template.title}</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Photos:</span>
                    <strong className="text-white block">{photos.length} Memories</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Letter:</span>
                    <strong className="text-white block">{letterParagraphs.length} Paragraphs</strong>
                  </div>
                </div>
              </div>

              {/* Pricing & Guarantee Box */}
              <div className="p-4 sm:p-6 rounded-2xl glass-panel border border-[#ffbe53]/40 bg-gradient-to-br from-[#1c122e]/90 via-[#120c20]/90 to-[#2a1710]/80 shadow-[0_10px_35px_rgba(255,190,83,0.15)] space-y-3.5 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-lg sm:text-xl shadow-lg border border-[#ffbe53]/50 shrink-0">
                      <span>🕯️</span>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#ffbe53]/20 border border-[#ffbe53]/40 text-[9px] sm:text-[10px] font-bold text-[#ffbe53] uppercase tracking-wider mb-0.5">
                        <span>Single Surprise Pass</span>
                      </div>
                      <h4 className="font-serif text-lg sm:text-2xl text-white font-medium leading-snug">
                        Surprise for {recipientName || "Your Loved One"}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#d1c4b9]">
                        One-time payment • Lifetime link • Unlimited views
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col justify-between sm:justify-start sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                    <div className="text-[10px] text-[#a8998d] uppercase tracking-wider">Total Charge</div>
                    <div className="font-serif text-2xl sm:text-4xl font-bold text-gold-gradient">
                      ₹250
                    </div>
                  </div>
                </div>

                {/* Included Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#d1c4b9]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53] shrink-0" />
                    <span>Interactive 4-Act Ceremony with Real Blowing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53] shrink-0" />
                    <span>Pop-the-Memories Polaroid Balloon Reveal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53] shrink-0" />
                    <span>Auto-scrolling Typewriter Love Letter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ffbe53] shrink-0" />
                    <span>Private Hosted Link + 1-Tap WhatsApp Share</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[11px] text-[#a8998d] border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Secured by Razorpay • UPI, Cards, Netbanking</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#a8998d]/80">
                    <Lock className="w-3 h-3 text-[#ffbe53]" />
                    <span>256-bit SSL Encrypted</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 flex flex-col gap-3">
                {/* Primary Action Button (Top on mobile for thumb priority) */}
                <button
                  onClick={handleCreate}
                  disabled={isSaving}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-sm font-bold tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.4)] hover:shadow-[0_0_40px_rgba(255,190,83,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{isSaving ? "Processing Payment..." : "Pay ₹250 & Launch Surprise"}</span>
                </button>

                {/* Secondary Actions (Clean 50/50 split on mobile) */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="py-2.5 px-4 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer text-center active:scale-95 transition-all"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenDemo}
                    className="py-2.5 px-4 rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53] text-[#ffe8d6] hover:text-[#ffbe53] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors active:scale-95 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ffbe53]" />
                    <span>Test Demo</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Test Demo / Surprise Craft Preview Modal over Checkout */}
      <SurprisePreviewModal
        isOpen={showPreviewModal}
        onClose={handleCloseDemo}
        recipientName={recipientName}
        senderName={senderName}
        templateId={template.id}
        occasionSubtitle={occasionSubtitle}
        cakeOrObjectMessage={cakeOrObjectMessage}
        photos={photos}
        letter={letterParagraphs}
        musicTitle={musicTitle}
        musicUrl={musicUrl}
        onProceedToPay={handleCreate}
      />

      {/* Share Modal on Success */}
      {createdSlug && (
        <ShareModal
          isOpen={Boolean(createdSlug)}
          onClose={() => setCreatedSlug(null)}
          slug={createdSlug}
          recipientName={recipientName || "My Love"}
        />
      )}

      {/* Auth Modal if triggered */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}
