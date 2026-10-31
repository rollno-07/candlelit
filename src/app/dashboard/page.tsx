"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { BackgroundFX } from "@/components/BackgroundFX";
import { useAuth } from "@/lib/authContext";
import { getUserSurprises, formatSurpriseShareUrl, formatSurpriseWebUrl } from "@/lib/surprisesStore";
import { SurpriseData } from "@/types/candlelit";
import { Sparkles, PlusCircle, ExternalLink, Copy, Check, Share2, Heart } from "lucide-react";

export function DashboardPage() {
  const { user } = useAuth();
  const [surprises, setSurprises] = useState<SurpriseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const list = await getUserSurprises(user?.id);
        setSurprises(list);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [user]);

  const handleCopy = async (slug: string) => {
    try {
      await navigator.clipboard.writeText(formatSurpriseWebUrl(slug));
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {}
  };

  const handleWhatsApp = (s: SurpriseData) => {
    const url = formatSurpriseWebUrl(s.slug);
    const text = encodeURIComponent(
      `Hey ${s.recipientName}! ❤️ I created a special digital surprise just for you. Open it here: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#0a0714] text-[#fdf8f4]">
      <BackgroundFX />
      <Navbar />

      <div className="relative z-10 flex-1 pt-28 pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e0a96d]/20">
          <div>
            <span className="text-xs font-semibold text-[#ffbe53] uppercase tracking-wider block mb-1">
              Creator Dashboard
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
              My Created Surprises
            </h1>
            <p className="text-xs text-[#a8998d] mt-1">
              Track, share, and preview all your live digital moments.
            </p>
          </div>

          <Link
            href="/templates"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold tracking-wide flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95 w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Surprise</span>
          </Link>
        </div>

        {/* List of Surprises */}
        {isLoading ? (
          <div className="py-20 text-center text-xs text-[#a8998d]">
            Loading your surprises...
          </div>
        ) : surprises.length === 0 ? (
          <div className="py-16 text-center rounded-3xl glass-panel border border-[#e0a96d]/20 p-8 max-w-md mx-auto">
            <span className="text-4xl block mb-3">🕯️</span>
            <h3 className="font-serif text-xl text-white mb-2">No surprises yet</h3>
            <p className="text-xs text-[#a8998d] mb-6">
              Pick from 11 templates to create your first cinematic moment for someone you love.
            </p>
            <Link
              href="/templates"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-semibold inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Choose a Template</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {surprises.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl glass-panel border border-[#e0a96d]/30 bg-[#120c20]/80 p-6 flex flex-col justify-between shadow-xl hover:border-[#ffbe53]/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#ffbe53]/15 text-[#ffbe53] border border-[#ffbe53]/30">
                      {s.templateId.replace("-", " ").toUpperCase()}
                    </span>
                    <span className="text-[11px] text-[#a8998d]">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-medium mb-1 flex items-center gap-2">
                    <span>For {s.recipientName}</span>
                    <Heart className="w-4 h-4 text-[#ff7b90] fill-current" />
                  </h3>

                  <p className="text-xs text-[#a8998d] mb-4">
                    By <strong className="text-white">{s.senderName}</strong> • {s.photos?.length || 0} Photos • {s.letter?.length || 0} Letter Paragraphs
                  </p>

                  {/* Share Link box */}
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 mb-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-[#ffbe53] truncate">
                      {formatSurpriseShareUrl(s.slug)}
                    </span>
                    <button
                      onClick={() => handleCopy(s.slug)}
                      className="px-2.5 py-1 rounded-md bg-[#ffbe53]/20 hover:bg-[#ffbe53]/30 text-xs font-medium text-[#ffbe53] flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      {copiedSlug === s.slug ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href={`/experience/${s.slug}`}
                    target="_blank"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>View Experience</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleWhatsApp(s)}
                    className="p-2.5 rounded-xl bg-[#25D366] text-[#0d2a15] hover:bg-[#20ba5a] transition-colors cursor-pointer"
                    title="Share via WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default DashboardPage;
