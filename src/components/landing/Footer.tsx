import React from "react";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#e0a96d]/15 bg-[#0a0714] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow border border-[#ffbe53]/40">
            <span className="text-sm">🕯️</span>
          </div>
          <div>
            <span className="font-serif text-lg text-white font-medium flex items-center gap-1.5">
              Candlelit
              <Sparkles className="w-3 h-3 text-[#ffbe53] fill-current" />
            </span>
            <span className="text-[10px] text-[#a8998d] block -mt-1">
              candleit.one7app.in
            </span>
          </div>
        </div>

        <p className="text-xs text-[#a8998d] flex items-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-[#ff7b90] fill-current" />
          <span>for the most important people in your world.</span>
        </p>

        <div className="flex items-center gap-6 text-xs text-[#d1c4b9]">
          <Link href="/templates" className="hover:text-[#ffbe53] transition-colors">
            All Templates
          </Link>
          <Link href="/experience/birthday-surprise" className="hover:text-[#ffbe53] transition-colors">
            Live Demo
          </Link>
          <Link href="/auth" className="hover:text-[#ffbe53] transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </footer>
  );
}
