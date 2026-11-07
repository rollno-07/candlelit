"use client";

import React, { Suspense, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TEMPLATES } from "@/lib/templatesData";
import { SurpriseBuilder } from "@/components/builder/SurpriseBuilder";
import { Navbar } from "@/components/landing/Navbar";
import { BackgroundFX } from "@/components/BackgroundFX";
import { useAuth } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { Sparkles, ArrowLeft, Lock } from "lucide-react";

function CreateSurpriseContent() {
  const params = useParams();
  const router = useRouter();
  const templateId = (params?.templateId as string) || "birthday-surprise";
  const { user, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(true);

  const template =
    TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0714] flex flex-col items-center justify-center text-center p-4">
        <div className="w-12 h-12 rounded-full border-2 border-t-[#ffbe53] border-r-transparent border-b-[#e0a96d] border-l-transparent animate-spin mb-4" />
        <h3 className="font-serif text-2xl text-gold-gradient font-light">
          Loading celebration builder...
        </h3>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
        <BackgroundFX />
        <Navbar />

        <div className="relative flex-1 flex items-center justify-center px-4 py-20 z-10">
          <div className="max-w-md w-full glass-panel border border-[#e0a96d]/30 bg-[#120c20]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_30px_rgba(255,190,83,0.4)] mb-4 border border-[#ffbe53]/40">
              <span className="text-2xl">🕯️</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffbe53]/15 border border-[#ffbe53]/30 text-[11px] font-semibold text-[#ffbe53] mb-3">
              <Lock className="w-3 h-3" />
              <span>Authentication Required</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-gold-gradient font-light">
              Sign In to Personalize
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#d1c4b9] leading-relaxed">
              Please sign in or create a free account to customize{" "}
              <strong className="text-white font-medium">{template.title}</strong>, upload your cake photo, and craft your 4-act surprise.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Sign In / Sign Up to Continue</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/templates")}
                className="w-full py-2.5 px-4 text-xs text-[#a8998d] hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Browse Other Templates</span>
              </button>
            </div>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
          title="Sign In to Customize"
          subtitle={`Sign in or create an account to start customizing ${template.title}`}
        />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      <BackgroundFX />
      <Navbar />

      <div className="relative flex-1">
        <SurpriseBuilder template={template} />
      </div>
    </main>
  );
}

export function CreateSurpriseClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0714] flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-full border-2 border-t-[#ffbe53] border-r-transparent border-b-[#e0a96d] border-l-transparent animate-spin mb-4" />
          <h3 className="font-serif text-2xl text-gold-gradient font-light">
            Loading template builder...
          </h3>
        </div>
      }
    >
      <CreateSurpriseContent />
    </Suspense>
  );
}
