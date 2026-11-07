export interface InspirationItem {
  id: string;
  category: "birthday" | "anniversary" | "proposal" | "valentine" | "romantic" | "retirement" | "mothers-day" | "baby-shower";
  title: string;
  text: string;
  tone: string;
}

export const CURATED_INSPIRATIONS: InspirationItem[] = [
  // BIRTHDAY WISHES
  {
    id: "bday-1",
    category: "birthday",
    title: "The Light in My World",
    text: "From the very first moment our paths crossed, you brought an impossible amount of light into my world. Your smile is my comfort, your laughter my favorite melody, and every second with you is a memory I treasure. Happy Birthday, my love.",
    tone: "Deep & Romantic",
  },
  {
    id: "bday-2",
    category: "birthday",
    title: "A Year of Magic",
    text: "Another year around the sun, and somehow you grow more radiant with every season. May this milestone chapter bring you all the warmth, joy, and wild dreams your heart has ever whispered in the quiet of night.",
    tone: "Poetic & Warm",
  },
  {
    id: "bday-3",
    category: "birthday",
    title: "My Favorite Person",
    text: "Happy Birthday to the one who makes ordinary grocery trips feel like adventures and simple conversations feel like home. Here is to celebrating you today, tomorrow, and every day after.",
    tone: "Playful & Sweet",
  },

  // ANNIVERSARY QUOTES
  {
    id: "anni-1",
    category: "anniversary",
    title: "Still Choosing You",
    text: "Looking back at the path we have walked hand in hand, through sunny mornings and quiet storms, I would choose you all over again in every lifetime. Thank you for being my constant anchor and greatest joy.",
    tone: "Deep & Moving",
  },
  {
    id: "anni-2",
    category: "anniversary",
    title: "Years into Eternity",
    text: "They say time flies when you are in love, but with you, every year feels like a golden chapter of a story I never want to end. Happy Anniversary to my forever partner.",
    tone: "Poetic & Cinematic",
  },
  {
    id: "anni-3",
    category: "anniversary",
    title: "The Adventure Continues",
    text: "Cheers to another year of shared laughter, inside jokes, and falling deeper in love with every sunrise. You are my home and my favorite adventure.",
    tone: "Warm & Emotional",
  },

  // PROPOSAL CONFESSIONS
  {
    id: "prop-1",
    category: "proposal",
    title: "The Question of a Lifetime",
    text: "I used to think fairy tales were written for books, until you looked into my eyes and gave every ordinary day meaning. I want to build a life with you, grow old with you, and love you until the stars burn out. Will you marry me?",
    tone: "Unforgettable & Deep",
  },
  {
    id: "prop-2",
    category: "proposal",
    title: "My Today and All My Tomorrows",
    text: "There is no dream I have that does not have you standing by my side. Let us take this promise into forever.",
    tone: "Poetic & Sincere",
  },

  // VALENTINE & ROMANTIC TEXTS
  {
    id: "val-1",
    category: "valentine",
    title: "My Eternal Valentine",
    text: "You are the poetry I never knew I was writing, and the song my heart has always hummed. Every heartbeat of mine belongs to you. Happy Valentine's Day.",
    tone: "Romantic Elegance",
  },
  {
    id: "val-2",
    category: "romantic",
    title: "Whisper in the Dark",
    text: "In a world of billions of souls, mine recognized yours in an instant. Being loved by you is the quietest luxury I have ever known.",
    tone: "Intimate & Soulful",
  },

  // RETIREMENT TRIBUTES
  {
    id: "ret-1",
    category: "retirement",
    title: "A Legacy of Honor",
    text: "Decades of relentless dedication, wisdom, and leadership have left an indelible mark on everyone who worked beside you. Now it is time to turn off the alarm clock, savor peaceful mornings, and celebrate a lifetime of brilliance.",
    tone: "Honor & Prestige",
  },

  // MOTHER'S DAY
  {
    id: "mom-1",
    category: "mothers-day",
    title: "To My First Home",
    text: "Mom, you are the warmth that held our home together and the gentle hand that guided me when I felt lost. Thank you for teaching me kindness, resilience, and what unconditional love truly looks like.",
    tone: "Heartfelt Gratitude",
  },

  // BABY SHOWER / PREGNANCY
  {
    id: "baby-1",
    category: "baby-shower",
    title: "A Little Starlight",
    text: "May your little miracle be blessed with good health, endless curiosity, and a heart full of love. You two are going to be the most extraordinary parents.",
    tone: "Gentle & Tender",
  },
];

