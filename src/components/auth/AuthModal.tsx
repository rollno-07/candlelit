"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/authContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail, loginAsGuest } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const res = await loginWithEmail(email, password);
        if (res.error) {
          setError(res.error);
        } else {
          onClose();
          onSuccess?.();
        }
      } else {
        const res = await signupWithEmail(email, password, name);
        if (res.error) {
          setError(res.error);
        } else {
          onClose();
          onSuccess?.();
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      onClose();
      onSuccess?.();
    } catch {
      setError("Failed to initialize Google sign in");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    onClose();
    onSuccess?.();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-2xl glass-panel border border-[#e0a96d]/40 bg-[#120c20]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 overflow-hidden z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#a8998d] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#8a4b2a] via-[#c68953] to-[#ffbe53] shadow-[0_0_20px_rgba(255,190,83,0.4)] mb-3">
              <span className="text-xl">🕯️</span>
            </div>
            <h3 className="font-serif text-2xl text-gold-gradient font-light">
              Welcome to Candlelit
            </h3>
            <p className="text-xs text-[#a8998d] mt-1">
              Sign in to save, publish, and track your personalized surprises
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogle}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#120c20] px-3 text-[11px] text-[#a8998d] uppercase tracking-wider">
              Or with email
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg bg-black/40 p-1 mb-4 border border-white/5">
            <button
              onClick={() => {
                setMode("signin");
                setError("");
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "signin"
                  ? "bg-gradient-to-r from-[#e0a96d]/30 to-[#ffbe53]/30 text-[#ffbe53] shadow"
                  : "text-[#a8998d] hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "signup"
                  ? "bg-gradient-to-r from-[#e0a96d]/30 to-[#ffbe53]/30 text-[#ffbe53] shadow"
                  : "text-[#a8998d] hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#a8998d] mb-1">
                  Your Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-[#a8998d]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a8998d] mb-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-[#a8998d]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a8998d] mb-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-[#a8998d]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ffbe53] transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="text-xs text-[#ff7b90] bg-[#ff7b90]/10 border border-[#ff7b90]/30 rounded-lg p-2 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-[#e0a96d] via-[#ffbe53] to-[#e0a96d] text-[#1c1208] text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(255,190,83,0.3)] hover:shadow-[0_0_30px_rgba(255,190,83,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{mode === "signin" ? "Sign In to Candlelit" : "Create My Account"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Guest / Demo Option */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <button
              onClick={handleGuest}
              className="text-xs text-[#d1c4b9]/80 hover:text-[#ffbe53] flex items-center justify-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffbe53]" />
              <span>Or continue as Guest (Instant 1-Click Access)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
