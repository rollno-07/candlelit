"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQS } from "@/lib/seoData";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel border border-[#e0a96d]/30 text-xs text-[#ffe8d6] mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#ffbe53]" />
          <span className="uppercase tracking-widest text-[11px] font-medium">
            Frequently Asked Questions
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
          Everything You Need to Know
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-[#d1c4b9] font-light max-w-lg mx-auto">
          Clear answers about creating, sharing, and experiencing your personalized Candlelit digital surprises.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="rounded-2xl glass-panel border border-[#e0a96d]/20 bg-[#120c20]/75 backdrop-blur-xl overflow-hidden transition-colors hover:border-[#ffbe53]/40"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="font-serif text-base sm:text-lg text-white font-medium">
                  {faq.question}
                </span>
                <span
                  className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-[#ffbe53]/20 border-[#ffbe53]/40 text-[#ffbe53]" : "text-[#a8998d]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#d1c4b9] leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
