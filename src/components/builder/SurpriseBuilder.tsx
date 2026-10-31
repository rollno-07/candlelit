"use client";

import React, { useState } from "react";
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
  Share2
} from "lucide-react";
import { TemplateDefinition, SurpriseData } from "@/types/candlelit";
import { saveSurprise } from "@/lib/surprisesStore";
import { useAuth } from "@/lib/authContext";
import { ShareModal } from "./ShareModal";
import { AuthModal } from "../auth/AuthModal";

interface SurpriseBuilderProps {
  template: TemplateDefinition;
}

export function SurpriseBuilder({ template }: SurpriseBuilderProps) {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
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

  // Save / Create handler
  const handleCreate = async () => {
    if (!recipientName.trim()) {
      alert("Please enter the name of the recipient.");
      setCurrentStep(1);
      return;
    }

    setIsSaving(true);
    try {
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
      };

      const slug = await saveSurprise(surpriseData);
      setCreatedSlug(slug);
    } catch (e) {
      console.error(e);
      alert("Failed to save surprise. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0714] text-[#fdf8f4] pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Breadcrumb & Template Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e0a96d]/20">
          <div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs text-[#a8998d] hover:text-[#ffbe53] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all templates</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-medium flex items-center gap-2">
              <span>{template.emoji}</span>
              <span>Customize: {template.title}</span>
            </h1>
          </div>

          {/* Target URL Preview Badge */}
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-[#e0a96d]/30 text-xs font-mono text-[#ffbe53] flex items-center gap-2 shadow">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="truncate">candleit.one7app.in/{currentSlug}</span>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[
            { num: 1, label: "1. Details" },
            { num: 2, label: "2. Memories" },
            { num: 3, label: "3. Letter" },
            { num: 4, label: "4. Music" },
          ].map((tab) => (
            <button
              key={tab.num}
              onClick={() => setCurrentStep(tab.num as any)}
              className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer text-center truncate ${
                currentStep === tab.num
                  ? "bg-gradient-to-r from-[#e0a96d]/30 to-[#ffbe53]/30 text-[#ffbe53] border border-[#ffbe53]/50 shadow-md"
                  : "bg-white/5 border border-white/5 text-[#a8998d] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <div className="rounded-3xl glass-panel border border-[#e0a96d]/30 bg-[#120c20]/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
          {/* STEP 1: BASIC DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl text-white font-medium mb-1">
                  1. Who is this special surprise for?
                </h3>
                <p className="text-xs text-[#a8998d]">
                  Their name will be featured on the envelope, cake, and personalized URL.
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
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
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
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
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
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbe53]"
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
                    className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbe53]"
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
                  className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Next: Add Memories & Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MEMORIES & PHOTOS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium mb-1">
                    2. Cherished Memories & Photos
                  </h3>
                  <p className="text-xs text-[#a8998d]">
                    These will be revealed when popping the floating starlight balloons in Act II.
                  </p>
                </div>
                <button
                  onClick={handleAddPhoto}
                  className="px-3.5 py-1.5 rounded-full bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 border border-[#ffbe53]/40 text-xs font-medium text-[#ffbe53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="space-y-4">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                      <Image
                        src={photo.url}
                        alt={`Photo ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <input
                        type="text"
                        value={photo.url}
                        onChange={(e) => handleUpdatePhoto(idx, "url", e.target.value)}
                        placeholder="Image URL or preset path"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53]"
                      />
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => handleUpdatePhoto(idx, "caption", e.target.value)}
                        placeholder="Sweet caption (e.g. Under the stars with you ✨)"
                        className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-[#ffbe53] placeholder-white/30 focus:outline-none focus:border-[#ffbe53]"
                      />
                    </div>

                    {photos.length > 1 && (
                      <button
                        onClick={() => handleRemovePhoto(idx)}
                        className="p-2 rounded-lg text-[#ff7b90] hover:bg-[#ff7b90]/10 transition-colors shrink-0 cursor-pointer"
                        title="Remove photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Next: Write Love Letter</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: THE LOVE LETTER */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium mb-1">
                    3. The Streaming Love Letter
                  </h3>
                  <p className="text-xs text-[#a8998d]">
                    This letter streams line by line with gentle auto-scroll in Act IV.
                  </p>
                </div>
                <button
                  onClick={handleAddParagraph}
                  className="px-3.5 py-1.5 rounded-full bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 border border-[#ffbe53]/40 text-xs font-medium text-[#ffbe53] flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
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
                      className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#ffbe53] transition-colors resize-y leading-relaxed"
                    />
                    {letterParagraphs.length > 1 && (
                      <button
                        onClick={() => handleRemoveParagraph(idx)}
                        className="absolute top-3 right-3 p-1 rounded-md text-[#a8998d] hover:text-[#ff7b90] transition-colors cursor-pointer"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Next: Choose Music & Finish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: MUSIC & PUBLISH */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl text-white font-medium mb-1">
                  4. Background Music & Theme
                </h3>
                <p className="text-xs text-[#a8998d]">
                  Pick a romantic melody that plays seamlessly throughout the experience.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    onClick={() => {
                      setMusicTitle(track.title);
                      setMusicUrl(track.url);
                    }}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      musicTitle === track.title
                        ? "bg-[#ffbe53]/20 border-[#ffbe53] shadow-lg text-white"
                        : "bg-black/40 border-white/10 hover:border-white/20 text-[#d1c4b9]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#ffbe53]">
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold block">{track.title}</span>
                        <span className="text-[10px] text-[#a8998d]">Curated Track</span>
                      </div>
                    </div>
                    {musicTitle === track.title && <Check className="w-4 h-4 text-[#ffbe53]" />}
                  </button>
                ))}
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-black/60 border border-[#e0a96d]/30 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#ffbe53] font-semibold block">
                  Surprise Summary:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Recipient:</span>
                    <strong className="text-white">{recipientName || "Not set"}</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Occasion:</span>
                    <strong className="text-white">{template.title}</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Photos:</span>
                    <strong className="text-white">{photos.length} Memories</strong>
                  </div>
                  <div>
                    <span className="text-[#a8998d] block text-[10px]">Letter:</span>
                    <strong className="text-white">{letterParagraphs.length} Paragraphs</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full glass-panel border border-white/10 text-xs text-[#d1c4b9] hover:text-white cursor-pointer"
                >
                  Back
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                    href={`/experience/${template.id}`}
                    target="_blank"
                    className="w-full sm:w-auto px-5 py-3 rounded-full glass-panel border border-[#e0a96d]/40 hover:border-[#ffbe53] text-[#ffe8d6] text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#ffbe53]" />
                    <span>Test Demo</span>
                  </Link>

                  <button
                    onClick={handleCreate}
                    disabled={isSaving}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide shadow-[0_0_25px_rgba(255,190,83,0.4)] hover:shadow-[0_0_40px_rgba(255,190,83,0.6)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>{isSaving ? "Creating Magic..." : "Create & Generate Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
