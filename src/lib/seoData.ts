/**
 * SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) Constants
 */

export const SITE_CONFIG = {
  name: "Candlelit",
  tagline: "Cinematic Digital Surprises for People You Love",
  description:
    "Create breathtaking 4-act interactive digital celebrations, proposal portals, and romantic surprises with real candle-blowing cakes, memory balloons, and streaming letters.",
  domain: "candleit.one7app.in",
  canonicalUrl: "https://candleit.one7app.in",
  creator: "one7app",
  author: "Candlelit Studios",
  keywords: [
    "digital surprise",
    "candlelit",
    "interactive birthday celebration",
    "blow candles online",
    "real candle blow cake online",
    "digital proposal card",
    "marriage anniversary surprise",
    "valentines week digital celebration",
    "karwa chauth digital surprise",
    "pregnancy reveal card",
    "baby shower digital card",
    "retirement digital tribute",
    "mothers day online greeting",
    "fathers day online card",
    "womens day tribute",
    "whatsapp surprise link",
    "personalized gift link",
    "4 act digital greeting",
    "candleit one7app in",
  ],
  ogImage: "https://candleit.one7app.in/images/og-candlelit.jpg",
};

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "What is Candlelit and how does it work?",
    answer:
      "Candlelit is an interactive digital surprise platform by one7app that turns emotional moments into a 4-act cinematic experience. You pick an occasion template (such as Birthday, Proposal, or Anniversary), personalize details like photos, romantic letters, and cake messages, and instantly receive a bespoke link like candleit.one7app.in/{template}-{name} to share directly over WhatsApp or social media.",
  },
  {
    question: "How do you blow out real candles on a phone screen?",
    answer:
      "Candlelit uses real-time Web Audio API frequency and RMS amplitude analysis through your device's microphone. When the recipient gently blows into their phone or laptop microphone, the system detects breath frequency and realistically extinguishes the 5 golden candle flames, triggering rising smoke effects, audio sounds, and festive golden confetti.",
  },
  {
    question: "What format are the custom surprise share links?",
    answer:
      "Every surprise generates a clean, personalized link formatted as candleit.one7app.in/{template}-{name} (for example, candleit.one7app.in/birthday-surprise-sophia or candleit.one7app.in/propose-maya). The link works instantly across iPhone, Android, iPads, and desktop browsers without requiring any app download.",
  },
  {
    question: "What occasions and templates does Candlelit support?",
    answer:
      "Candlelit supports 11 curated occasion storylines: 1) Birthday Surprise (cake with blowable candles), 2) Anniversary Celebration (marriage, love, or milestone), 3) The Dream Proposal (interactive velvet ring box), 4) Valentine's Week Odyssey (all 8 days), 5) Karwa Chauth Moonlit Vows (Channi & Diya), 6) Pregnancy Surprise Reveal (ultrasound scratch reveal), 7) Baby Shower Wonderland, 8) Retirement Odyssey & Tribute, 9) Mother's Day Sanctuary, 10) Father's Day Hall of Fame, and 11) International Women's Day.",
  },
  {
    question: "Is Candlelit free to use?",
    answer:
      "Yes, Candlelit provides free access to create, customize, and share interactive digital surprises with bespoke background melodies, floating photo memories, and streaming letters. No app installation is required.",
  },
  {
    question: "How can I play background music on my digital surprise?",
    answer:
      "Candlelit features a built-in Web Audio API ambient synthesizer that produces gentle, low-volume melodic piano chords (Dmaj9 to Gmaj7) and music box chimes. Recipients can mute or unmute anytime using the discreet speaker button in the bottom right corner.",
  },
];
