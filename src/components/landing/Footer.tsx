"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Check, X, Send, Heart } from "lucide-react";

export function Footer() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSubmitted(false);
      setFeedbackText("");
      setFeedbackEmail("");
    }, 2000);
  };

  return (
    <>
      <footer className="border-t border-[#e0a96d]/15 bg-[#0a0714] text-[#d1c4b9] pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main 5-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12">
            {/* Column 1: Brand & Mission (4 cols on desktop) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] flex items-center justify-center shadow-[0_0_20px_rgba(255,190,83,0.35)] border border-[#ffbe53]/40 group-hover:scale-105 transition-transform">
                    <span className="text-lg">🕯️</span>
                  </div>
                  <span className="font-serif text-2xl text-white font-medium tracking-wide flex items-center gap-1.5">
                    Candlelit
                    <Sparkles className="w-4 h-4 text-[#ffbe53] fill-current" />
                  </span>
                </Link>

                <p className="text-xs sm:text-sm text-[#a8998d] leading-relaxed max-w-sm mb-6 font-light">
                  The world&apos;s most elegant platform for digital celebrations. Craft stunning, personalized aesthetic pages for the people you love in exactly 60 seconds.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-[#ffbe53] text-[#d1c4b9] hover:text-[#ffbe53] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-[#ffbe53] text-[#d1c4b9] hover:text-[#ffbe53] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: INSPIRATION (2 cols) */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white mb-4">
                Inspiration
              </h4>
              <ul className="space-y-2.5 text-xs text-[#a8998d]">
                <li>
                  <Link href="/create/birthday-surprise" className="hover:text-[#ffbe53] transition-colors block">
                    Birthday Wishes
                  </Link>
                </li>
                <li>
                  <Link href="/create/anniversary" className="hover:text-[#ffbe53] transition-colors inline-flex items-center gap-1.5">
                    <span>Anniversary Quotes</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-[#ff4d6d]/20 text-[#ff7b90] border border-[#ff4d6d]/30 tracking-wider">
                      HOT
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/create/valentine" className="hover:text-[#ffbe53] transition-colors block">
                    Valentine Messages
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-[#ffbe53] transition-colors block">
                    Romantic Texts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: SURPRISES (2 cols) */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white mb-4">
                Surprises
              </h4>
              <ul className="space-y-2.5 text-xs text-[#a8998d]">
                <li>
                  <Link href="/create/propose" className="hover:text-[#ffbe53] transition-colors block">
                    For Girlfriend
                  </Link>
                </li>
                <li>
                  <Link href="/create/anniversary" className="hover:text-[#ffbe53] transition-colors block">
                    For Boyfriend
                  </Link>
                </li>
                <li>
                  <Link href="/create/anniversary" className="hover:text-[#ffbe53] transition-colors block">
                    For Husband
                  </Link>
                </li>
                <li>
                  <Link href="/create/birthday-surprise" className="hover:text-[#ffbe53] transition-colors block">
                    For Best Friend
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: RESOURCES (2 cols) */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-[#a8998d]">
                <li>
                  <Link href="/#how-it-works" className="hover:text-[#ffbe53] transition-colors block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-[#ffbe53] transition-colors block">
                    Blog Guides
                  </Link>
                </li>
                <li>
                  <Link href="/llms.txt" target="_blank" className="hover:text-[#ffbe53] transition-colors block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/llms-full.txt" target="_blank" className="hover:text-[#ffbe53] transition-colors block">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: SUPPORT (2 cols) */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] font-semibold tracking-widest uppercase text-white mb-4">
                Support
              </h4>
              <ul className="space-y-2.5 text-xs text-[#a8998d]">
                <li>
                  <Link href="/#faq" className="hover:text-[#ffbe53] transition-colors block">
                    FAQs
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="hover:text-[#ffbe53] transition-colors block text-left cursor-pointer"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <Link href="/templates" className="hover:text-[#ffbe53] transition-colors block">
                    Release Notes
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@one7app.in"
                    className="text-[#ff7b90] hover:text-white font-medium transition-colors block"
                  >
                    Email Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#a8998d]">
            {/* Left Copyright */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#ff4d6d]/20 text-[#ff7b90] border border-[#ff4d6d]/30 flex items-center justify-center text-[10px] shrink-0 font-bold">
                ✓
              </span>
              <span>
                © 2026 Candlelit. A creation by{" "}
                <strong className="text-white font-semibold">one7app</strong>.
              </span>
            </div>

            {/* Right: Status Indicator + Feedback Pill Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs text-[#a8998d]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span>All systems operational</span>
              </div>

              {/* Feedback Pill Trigger */}
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#120c20] hover:bg-[#1c122e] border border-white/15 text-xs text-[#ffe8d6] hover:text-white transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#ffbe53]" />
                <span className="font-medium">Your feedback is precious to us</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeedbackModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md rounded-2xl glass-panel border border-[#e0a96d]/40 bg-[#120c20]/95 backdrop-blur-2xl shadow-2xl p-6 sm:p-7 z-10 text-left"
            >
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-[#a8998d] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffbe53]/15 border border-[#ffbe53]/30 text-[11px] text-[#ffbe53] mb-3">
                <Heart className="w-3 h-3 fill-current text-[#ff7b90]" />
                <span>one7app Community</span>
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-1">
                Your Feedback is Precious to Us
              </h3>
              <p className="text-xs text-[#a8998d] mb-5">
                Have an idea for a new occasion ritual, song, or feature? Let the one7app team know.
              </p>

              {feedbackSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg text-white">Thank You!</h4>
                  <p className="text-xs text-[#a8998d]">Your feedback has been received with love.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitFeedback} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1">
                      Your Thoughts or Ideas *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us what you loved or what you'd like to see next..."
                      className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53] transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#d1c4b9] uppercase tracking-wider mb-1">
                      Your Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={feedbackEmail}
                      onChange={(e) => setFeedbackEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-black/50 border border-[#e0a96d]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-bold tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 mt-4"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to one7app</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
