"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, User, LogOut, PlusCircle, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCreateClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      router.push("/templates");
    }
  };

  const isCreatePage = pathname?.startsWith("/create");
  const isExperiencePage = pathname?.startsWith("/experience");

  // Lock body scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

          {/* Desktop User actions & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] hover:border-[#ffbe53] transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#ffbe53]/20 flex items-center justify-center text-[11px] font-bold text-[#ffbe53]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[110px] truncate">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl glass-panel border border-[#e0a96d]/30 bg-[#120c20]/95 backdrop-blur-xl shadow-2xl py-2 z-50">
                    <div className="px-3.5 py-2 border-b border-white/10 text-xs text-[#a8998d]">
                      Signed in as <strong className="text-white block truncate">{user.email}</strong>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#ffe8d6] hover:bg-white/5 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-[#ffbe53]" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link
                      href="/templates"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs text-[#ffe8d6] hover:bg-white/5 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-[#ffbe53]" />
                      <span>Create New Surprise</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#ff7b90] hover:bg-white/5 transition-colors text-left cursor-pointer"
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

            <button
              onClick={handleCreateClick}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_25px_rgba(255,190,83,0.5)] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Create Surprise</span>
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle (Clean header on mobile: only Logo + Hamburger) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1.5 p-2 rounded-full text-[#ffe8d6] hover:text-[#ffbe53] hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#ffbe53]" />
              ) : (
                <div className="flex items-center gap-1.5">
                  {user && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-[10px] font-bold text-[#1c1208] shadow-sm border border-[#ffbe53]/40">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <Menu className="w-6 h-6 text-[#ffbe53]" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Sidebar / Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Side Bar Panel (Drawer) */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-[85%] max-w-sm h-full bg-[#0c0818]/98 backdrop-blur-2xl border-l border-[#e0a96d]/25 shadow-[-15px_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto no-scrollbar z-10"
              style={{
                paddingTop: "max(1.25rem, env(safe-area-inset-top))",
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              }}
            >
              {/* Drawer Top Header */}
              <div className="px-5 pb-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_12px_rgba(255,190,83,0.3)] border border-[#ffbe53]/40">
                    <span className="text-sm">🕯️</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-lg font-medium text-white flex items-center gap-1 leading-tight">
                      Candlelit
                      <Sparkles className="w-3.5 h-3.5 text-[#ffbe53] fill-current" />
                    </span>
                    <span className="text-[9px] tracking-widest uppercase text-[#a8998d]">
                      Cinematic Surprises
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-[#a8998d] hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5 text-[#ffbe53]" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto no-scrollbar">
                {/* 1. Login Details Section inside Sidebar */}
                {user ? (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#1d122b] to-[#120a1f] border border-[#ffbe53]/30 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center text-sm font-bold text-[#1c1208] shadow-md shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-white truncate">{user.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ffbe53]/20 text-[#ffbe53] border border-[#ffbe53]/30 font-medium shrink-0">
                            Signed In
                          </span>
                        </div>
                        <p className="text-xs text-[#a8998d] truncate">{user.email}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-[#ffe8d6] transition-colors border border-white/10"
                      >
                        <User className="w-3.5 h-3.5 text-[#ffbe53]" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-[#ff7b90] transition-colors border border-red-500/20 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a1228] to-[#120a1e] border border-[#e0a96d]/25 shadow-lg">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">Welcome to Candlelit</p>
                        <p className="text-xs text-[#a8998d] mt-0.5">Sign in to create & track your surprises</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setShowAuthModal(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e0a96d] to-[#ffbe53] text-[#1c1208] text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Navigation Links inside Sidebar */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#a8998d] font-semibold block px-3 mb-1">
                    Navigation
                  </span>

                  <Link
                    href="/templates"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3.5 rounded-xl hover:bg-white/5 text-sm text-[#ffe8d6] font-medium transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">🎨</span>
                      <span>Browse Templates (11)</span>
                    </div>
                    <span className="text-xs text-[#ffbe53] group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <Link
                    href="/experience/birthday-surprise"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3.5 rounded-xl bg-white/[0.03] hover:bg-[#ffbe53]/10 text-sm text-[#ffbe53] font-medium transition-colors border border-[#ffbe53]/20 group"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 fill-current text-[#ffbe53]" />
                      <span>Live Demo Experience</span>
                    </div>
                    <span className="text-xs text-[#ffe8d6] group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <Link
                    href="/#how-it-works"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3.5 rounded-xl hover:bg-white/5 text-sm text-[#d1c4b9] transition-colors"
                  >
                    <span className="text-base">✨</span>
                    <span>How It Works</span>
                  </Link>

                  <Link
                    href="/#faq"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-3.5 rounded-xl hover:bg-white/5 text-sm text-[#d1c4b9] transition-colors"
                  >
                    <span className="text-base">❓</span>
                    <span>Frequently Asked Questions</span>
                  </Link>

                  {user && (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-3.5 rounded-xl bg-[#ffbe53]/15 text-sm text-[#ffbe53] font-medium border border-[#ffbe53]/30"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-[#ffbe53]" />
                        <span>My Surprises Dashboard</span>
                      </div>
                      <span className="text-xs">Open →</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="px-5 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleCreateClick();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,190,83,0.4)] active:scale-98 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Create a Surprise Now</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Floating Create Button (Right Bottom Corner) */}
      {!isCreatePage && !isExperiencePage && !isMobileMenuOpen && (
        <div className="fixed bottom-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-4 sm:right-6 z-40 animate-in fade-in duration-300">
          <button
            onClick={handleCreateClick}
            className="group flex items-center gap-2.5 px-4.5 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] bg-[length:200%_auto] hover:bg-right text-[#1c1208] text-xs sm:text-sm font-bold tracking-wide shadow-[0_6px_25px_rgba(255,190,83,0.55)] hover:shadow-[0_8px_32px_rgba(255,190,83,0.75)] border border-white/50 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Create a Surprise"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1c1208] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1c1208]"></span>
            </span>
            <span>Create</span>
            <span className="hidden xs:inline">Surprise</span>
            <Sparkles className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          router.push("/templates");
        }}
        title="Sign In to Create"
        subtitle="Sign in or create an account to start creating your personalized surprise"
      />
    </>
  );
}
