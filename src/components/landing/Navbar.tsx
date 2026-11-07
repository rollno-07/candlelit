"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Heart, User, LogOut, PlusCircle, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Navbar() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0714]/85 backdrop-blur-md border-b border-[#e0a96d]/15">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_15px_rgba(255,190,83,0.3)] border border-[#ffbe53]/40 group-hover:scale-105 transition-transform">
              <span className="text-sm sm:text-base">🕯️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-medium tracking-wide text-[#fff] flex items-center gap-1.5 leading-tight">
                Candlelit
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffbe53] fill-current" />
              </span>
              <span className="hidden xs:block text-[9px] sm:text-[10px] tracking-widest uppercase text-[#a8998d]">
                Cinematic Surprises
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#d1c4b9]">
            <Link href="/templates" className="hover:text-[#ffbe53] transition-colors">
              Templates (11)
            </Link>
            <Link href="/#how-it-works" className="hover:text-[#ffbe53] transition-colors">
              How It Works
            </Link>
            <Link href="/#faq" className="hover:text-[#ffbe53] transition-colors">
              FAQ
            </Link>
            <Link
              href="/experience/birthday-surprise"
              className="text-[#ffbe53] hover:text-[#fff] flex items-center gap-1 transition-colors"
            >
              <span>Live Demo</span>
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53] fill-current" />
            </Link>
            {user && (
              <Link href="/dashboard" className="hover:text-[#ffbe53] transition-colors">
                My Surprises
              </Link>
            )}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] hover:border-[#ffbe53] transition-colors cursor-pointer"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ffbe53]/20 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-[#ffbe53]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[70px] sm:max-w-[100px] truncate">{user.name}</span>
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
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium text-[#d1c4b9] hover:text-[#fff] transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}

            <Link
              href="/templates"
              className="px-3.5 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_25px_rgba(255,190,83,0.5)] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Create</span>
              <span className="hidden xs:inline">Surprise</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#d1c4b9] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#ffbe53]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#e0a96d]/20 bg-[#0e081c]/95 backdrop-blur-xl px-4 py-4 space-y-3">
            <Link
              href="/templates"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm text-[#ffe8d6] border-b border-white/5 font-medium"
            >
              <span>Browse Templates (11)</span>
              <span className="text-xs text-[#ffbe53]">Explore →</span>
            </Link>
            <Link
              href="/experience/birthday-surprise"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm text-[#ffbe53] border-b border-white/5 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Live Demo Experience</span>
              </div>
              <span className="text-xs text-[#ffe8d6]">View →</span>
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#d1c4b9] border-b border-white/5"
            >
              How It Works
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-[#d1c4b9]"
            >
              FAQ
            </Link>
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[#ffbe53] font-medium border-t border-white/5 pt-3"
              >
                My Surprises Dashboard →
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
