"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import { TEMPLATES } from "@/lib/templatesData";
import { SurpriseBuilder } from "@/components/builder/SurpriseBuilder";
import { Navbar } from "@/components/landing/Navbar";
import { BackgroundFX } from "@/components/BackgroundFX";

function CreateSurpriseContent() {
  const params = useParams();
  const templateId = (params?.templateId as string) || "birthday-surprise";

  const template =
    TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      <BackgroundFX />
      <Navbar />

      <div className="relative z-10 flex-1">
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
