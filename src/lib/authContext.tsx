"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types/candlelit";
import { supabase, isSupabaseConfigured } from "./supabase";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<{ error?: string }>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<{ error?: string }>;
  loginAsGuest: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_SESSION_KEY = "candlelit_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local session
    try {
      const stored = localStorage.getItem(USER_SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Auth session error:", e);
    }

    // Check Supabase session if configured
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
            avatarUrl: session.user.user_metadata?.avatar_url,
            provider: "google",
          };
          setUser(profile);
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const profile: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
            avatarUrl: session.user.user_metadata?.avatar_url,
            provider: "google",
          };
          setUser(profile);
          localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
        } else {
          setUser(null);
          localStorage.removeItem(USER_SESSION_KEY);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
        },
      });
    } else {
      // Graceful instant simulated Google Auth
      const demoGoogleUser: UserProfile = {
        id: "google-demo-" + Date.now(),
        email: "demo.creator@gmail.com",
        name: "Creator",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Candlelit",
        provider: "google",
      };
      setUser(demoGoogleUser);
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(demoGoogleUser));
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<{ error?: string }> => {
    if (!email || !pass) return { error: "Please provide email and password" };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { error: error.message };
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split("@")[0],
          provider: "email",
        };
        setUser(profile);
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
      }
      return {};
    }

    // Local simulated email auth
    const profile: UserProfile = {
      id: "email-" + Date.now(),
      email,
      name: email.split("@")[0],
      provider: "email",
    };
    setUser(profile);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
    return {};
  };

  const signupWithEmail = async (email: string, pass: string, name: string): Promise<{ error?: string }> => {
    if (!email || !pass) return { error: "Please enter email and password" };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { full_name: name } },
      });
      if (error) return { error: error.message };
      if (data.user) {
        const profile: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: name || email.split("@")[0],
          provider: "email",
        };
        setUser(profile);
        localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
      }
      return {};
    }

    const profile: UserProfile = {
      id: "email-" + Date.now(),
      email,
      name: name || email.split("@")[0],
      provider: "email",
    };
    setUser(profile);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(profile));
    return {};
  };

  const loginAsGuest = () => {
    const guestUser: UserProfile = {
      id: "guest-" + Date.now(),
      email: "guest@candlelit.app",
      name: "Guest Creator",
      provider: "guest",
    };
    setUser(guestUser);
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(guestUser));
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(USER_SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        loginWithGoogle,
        loginWithEmail,
        signupWithEmail,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
