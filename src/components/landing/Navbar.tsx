"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart, User, LogOut, PlusCircle } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Navbar() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0714]/80 backdrop-blur-md border-b border-[#e0a96d]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_15px_rgba(255,190,83,0.3)] border border-[#ffbe53]/40 group-hover:scale-105 transition-transform">
              <span className="text-base">🕯️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-medium tracking-wide text-[#fff] flex items-center gap-1.5">
                Candlelit
                <Sparkles className="w-3.5 h-3.5 text-[#ffbe53] fill-current" />
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#a8998d]">
                Cinematic Surprises
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#d1c4b9]">
            <Link href="/templates" className="hover:text-[#ffbe53] transition-colors">
              Templates (11)
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#ffbe53] transition-colors">
              How It Works
            </Link>
            <Link
              href="/experience/birthday-surprise"
              className="text-[#ffbe53] hover:text-[#fff] flex items-center gap-1 transition-colors"
            >
              <span>Live Experience Demo</span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53] fill-current" />
            </Link>
            {user && (
              <Link href="/dashboard" className="hover:text-[#ffbe53] transition-colors">
                My Surprises
              </Link>
            )}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] hover:border-[#ffbe53] transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ffbe53]/20 flex items-center justify-center text-[11px] font-bold text-[#ffbe53]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel border border-[#e0a96d]/30 bg-[#120c20]/95 backdrop-blur-xl shadow-2xl py-2 z-50">
                    <div className="px-3 py-1.5 border-b border-white/10 text-xs text-[#a8998d]">
                      Signed in as <strong className="text-white block truncate">{user.email}</strong>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#ffe8d6] hover:bg-white/5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#ffbe53]" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link
                      href="/templates"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#ffe8d6] hover:bg-white/5 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-[#ffbe53]" />
                      <span>Create New Surprise</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ff7b90] hover:bg-white/5 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#d1c4b9] hover:text-[#fff] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <Link
              href="/templates"
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_25px_rgba(255,190,83,0.5)] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Create Surprise</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
