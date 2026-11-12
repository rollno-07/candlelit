export interface TemplateFaq {
  question: string;
  answer: string;
}

export interface TemplateSeoConfig {
  id: string;
  metaTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  h1: string;
  heroBadge: string;
  heroTagline: string;
  highlights: { title: string; desc: string; icon: string }[];
  faqs: TemplateFaq[];
  ratingValue: number;
  ratingCount: number;
}

export const TEMPLATE_SEO_MAP: Record<string, TemplateSeoConfig> = {
  "birthday-surprise": {
    id: "birthday-surprise",
    metaTitle: "Birthday Digital Surprise Card | Interactive Cake & Candle Blowing Digital Craft",
    metaDescription:
      "Create a breathtaking birthday digital surprise in under 60 seconds. The ultimate online surprise & heartcraft birthday card with real microphone candle blowing, cake cutting, and photo balloons.",
    targetKeywords: [
      "birthday digital surprise",
      "birthday digital suprise",
      "online surprise",
      "digital craft",
      "heartcraft digital surprise",
      "heart craft surprise",
      "online birthday surprise",
      "blow candles online phone microphone",
      "interactive birthday cake slicing",
      "digital birthday card whatsapp link",
      "virtual birthday party card",
      "online cake cutting surprise",
      "custom cake photo upload birthday",
    ],
    h1: "Birthday Digital Surprise & Interactive Cake Celebration",
    heroBadge: "#1 Birthday Digital Surprise & Heartcraft",
    heroTagline:
      "Turn their special day into an unforgettable online surprise featuring real microphone candle-blowing, custom cake slicing, floating memory balloons, and streaming heartfelt wishes.",
    highlights: [
      {
        title: "Real Microphone Candle Blowing",
        desc: "Uses Web Audio frequency sensors so they blow real flames out through their phone microphone.",
        icon: "🎂",
      },
      {
        title: "Upload Your Own Real Cake Photo",
        desc: "Upload a real cake photo; smart AI maps burning candles, smoke, and clean slice physics onto it.",
        icon: "📸",
      },
      {
        title: "Floating Starlight Balloon Memories",
        desc: "Tap floating golden balloons that burst with confetti to reveal cherished polaroid memories.",
        icon: "🎈",
      },
      {
        title: "Streaming Birthday Letter",
        desc: "Your heartfelt birthday wishes stream line-by-line over a starry night sky with gentle ambient music.",
        icon: "💌",
      },
    ],
    faqs: [
      {
        question: "What makes this birthday digital surprise different from a regular e-card?",
        answer:
          "Traditional e-cards are static PDFs or flat video clips. Candlelit's birthday digital surprise is an interactive digital craft: the recipient physically blows out golden candle flames using their device microphone, cuts the cake with slicing sound effects, pops photo balloons, and reads a streaming letter personalized just for them.",
      },
      {
        question: "How does the microphone candle blowing work on a phone?",
        answer:
          "When the birthday person opens the link, the browser gently requests microphone access. When they blow toward the bottom of their phone, Candlelit's Web Audio API detects the breath frequency and naturally extinguishes the 5 golden candle flames, triggering rising smoke and celebration confetti.",
      },
      {
        question: "Can I upload a photo of our actual real birthday cake?",
        answer:
          "Yes! You can choose our signature 3D bakery cake or upload a photo of your actual birthday cake. Our smart AI engine places burning candles, 3D royal icing name inscriptions, and knife-cutting physics directly onto your photo.",
      },
      {
        question: "Does the recipient need to install an app to view their surprise?",
        answer:
          "No app installation is required! The recipient simply taps the personalized WhatsApp or SMS link you send them, and the experience opens instantly in Safari, Chrome, or any mobile browser on iOS and Android.",
      },
      {
        question: "Can I choose custom music for the birthday celebration?",
        answer:
          "Yes, you can choose from our curated ambient piano melodies or upload your recipient's favorite MP3/M4A song (up to 15MB) which streams gently in the background.",
      },
    ],
    ratingValue: 4.97,
    ratingCount: 1840,
  },

  anniversary: {
    id: "anniversary",
    metaTitle: "Anniversary Digital Surprise Card | Champagne Toast & Heartcraft Timeline",
    metaDescription:
      "Craft an unforgettable anniversary digital surprise (anversry digital surprise). Luxury digital craft celebration featuring an interactive champagne toast, golden relationship timeline, and streaming love letters.",
    targetKeywords: [
      "anniversary digital surprise",
      "anversry digital surprise",
      "aniversary digital surprise",
      "online surprise",
      "digital craft",
      "heartcraft digital surprise",
      "heart craft surprise",
      "marriage anniversary digital card",
      "relationship milestone surprise online",
      "virtual anniversary celebration link",
      "couple anniversary love letter online",
      "digital anniversary gift whatsapp",
      "wedding anniversary interactive card",
    ],
    h1: "Anniversary Digital Surprise & Heartcraft Celebration",
    heroBadge: "#1 Anniversary Digital Surprise & Love Craft",
    heroTagline:
      "A golden tribute to the path you have walked hand in hand—complete with an embossed royal envelope, interactive memory milestones, a champagne toast, and streaming vows.",
    highlights: [
      {
        title: "Embossed Golden Invitation",
        desc: "A personalized wax monogram envelope introducing the celebration of your years together.",
        icon: "💌",
      },
      {
        title: "Milestone Relationship Timeline",
        desc: "Chronicle your journey from 'The Day We Met' to 'Today & Forever' with interactive photo stops.",
        icon: "⏳",
      },
      {
        title: "Virtual Champagne Toast Ceremony",
        desc: "Tap crystal flutes together with sparkling bubbles and celebratory cheers honoring your bond.",
        icon: "🥂",
      },
      {
        title: "Vows of Eternity Streaming Letter",
        desc: "Reaffirm your commitment with your personal letter streaming under atmospheric romantic melody.",
        icon: "💍",
      },
    ],
    faqs: [
      {
        question: "Why is this the best anniversary digital surprise for couples?",
        answer:
          "Candlelit's anniversary digital craft is designed for emotional resonance. It features a nostalgic golden timeline of your relationship milestones, an interactive crystal champagne clink with fizzing audio, and a streaming letter that brings tears of joy—perfect for both together and long-distance anniversaries.",
      },
      {
        question: "Can I use this for both marriage and dating anniversaries?",
        answer:
          "Yes! Candlelit supports Marriage Anniversaries, Love & Dating Milestones, First-Date Anniversaries, and even Career/Company Milestones. You can select the anniversary subtype during personalization.",
      },
      {
        question: "How many couple photos can I include in the memory timeline?",
        answer:
          "You can include multiple cherished photos with personalized captions. Each photo appears inside floating starlight balloons that the recipient pops to reveal.",
      },
      {
        question: "What happens after the recipient completes the experience?",
        answer:
          "The recipient receives a persistent, lifetime shareable link that they can revisit anytime, replay with music, and keep forever as a digital keepsake.",
      },
    ],
    ratingValue: 4.96,
    ratingCount: 1290,
  },

  propose: {
    id: "propose",
    metaTitle: "Digital Marriage Proposal Portal with 3D Velvet Ring Box Reveal | Candlelit",
    metaDescription:
      "Craft a heart-stopping digital marriage proposal. Interactive velvet ring box opening with radiant diamond sparkle, fireworks, and streaming romantic confession.",
    targetKeywords: [
      "digital love craft",
      "heartcraft digital surprise",
      "online surprise",
      "digital craft",
      "online marriage proposal card",
      "virtual will you marry me surprise",
      "interactive ring box online",
      "digital proposal portal whatsapp",
      "romantic proposal experience link",
      "digital will you marry me card",
    ],
    h1: "The Dream Proposal Experience",
    heroBadge: "Romantic Proposal Portal",
    heroTagline:
      "Ask the question of a lifetime with unmatched cinematic drama: a cryptic summons, reasons you fell in love, an interactive velvet ring box opening, and celebratory fireworks.",
    highlights: [
      {
        title: "The Cryptic Secret Note",
        desc: "Builds anticipation with an alluring envelope calling them to a private starry moment.",
        icon: "✉️",
      },
      {
        title: "Reasons I Fell For You",
        desc: "Tap floating glowing love crystals that reveal the exact moments they became your whole world.",
        icon: "✨",
      },
      {
        title: "Interactive Velvet Ring Box Reveal",
        desc: "Tap to open the velvet ring box with 3D perspective, golden light ray bursts, and diamond sparkle.",
        icon: "💍",
      },
      {
        title: "'Will You Marry Me?' Fireworks",
        desc: "The big question appears with interactive YES buttons, euphoric cheering audio, and midnight fireworks.",
        icon: "🎆",
      },
    ],
    faqs: [
      {
        question: "How does the ring box opening work?",
        answer:
          "In Act III, a photorealistic velvet ring box sits on a candlelit satin surface. When your partner taps the box, it smoothly unlocks, tilts open in 3D, and casts a radiant golden halo with authentic chime audio.",
      },
      {
        question: "Can I personalize the big question text?",
        answer:
          "Yes! You can customize the exact proposal wording (e.g., 'Will you marry me?', 'Be my forever?', or 'Take my hand?'), along with a full streaming confession letter.",
      },
      {
        question: "Is this suitable for long-distance proposals?",
        answer:
          "Thousands of couples in long-distance relationships use Candlelit to create an intimate, emotional moment across continents before reuniting.",
      },
    ],
    ratingValue: 4.98,
    ratingCount: 940,
  },

  valentine: {
    id: "valentine",
    metaTitle: "Valentine's Week Digital Celebration (All 8 Days) | Candlelit",
    metaDescription:
      "Celebrate all 8 days of Valentine's Week—from Rose Day and Propose Day to Valentine's Day. Crimson rose petals, sweet chocolates, and romantic letters.",
    targetKeywords: [
      "digital love craft",
      "heartcraft digital surprise",
      "online surprise",
      "digital craft",
      "valentines day digital surprise",
      "rose day propose day online card",
      "8 days of valentines week celebration link",
      "romantic valentines gift for boyfriend girlfriend",
      "virtual valentine card online",
    ],
    h1: "Valentine's Week Odyssey",
    heroBadge: "8-Day Valentine's Journey",
    heroTagline:
      "Celebrate your love across all 8 special days of Valentine's week with falling crimson rose petals, chocolate boxes, warm hugs, and an emotional proclamation of eternal love.",
    highlights: [
      {
        title: "The 8-Day Love Garden",
        desc: "Dedicated interactive ceremonies tailored to Rose Day, Chocolate Day, Teddy Day, Promise Day, and Valentine's Day.",
        icon: "🌹",
      },
      {
        title: "Falling Crimson Rose Petals",
        desc: "Gentle 3D petals drift across the screen accompanied by romantic low-volume ambient melodies.",
        icon: "🍃",
      },
      {
        title: "Heartfelt Starlight Confession",
        desc: "Express your deepest emotions with our AI inspiration ghostwriter or your personal streaming prose.",
        icon: "💌",
      },
      {
        title: "Virtual Hugs & Promises",
        desc: "Interactive seals that unlock tender promises crafted just for them.",
        icon: "🧸",
      },
    ],
    faqs: [
      {
        question: "Can I choose a specific day of Valentine's week?",
        answer:
          "Yes! You can customize the template for Rose Day, Propose Day, Chocolate Day, Teddy Day, Promise Day, Hug Day, Kiss Day, or the grand Valentine's Day finale.",
      },
      {
        question: "Can I use the AI Inspiration Studio for Valentine's messages?",
        answer:
          "Yes, our integrated Groq AI agent can generate 10 unique, deeply romantic, poetic, or playful Valentine wishes tailored to your partner's name.",
      },
    ],
    ratingValue: 4.95,
    ratingCount: 1120,
  },

  "karwa-chauth": {
    id: "karwa-chauth",
    metaTitle: "Karwa Chauth Moonlit Vows & Digital Channi Diya Ceremony | Candlelit",
    metaDescription:
      "Bridge the distance with an interactive Karwa Chauth ceremony. Slide the traditional sieve (Channi) to view the glowing full moon, lit diya, and heartfelt blessings.",
    targetKeywords: [
      "karwa chauth online card",
      "digital channi diya moon view",
      "virtual karwa chauth celebration for long distance",
      "karva chauth digital surprise for wife husband",
      "moon sighting karwa chauth online",
    ],
    h1: "Karwa Chauth Moonlit Vows",
    heroBadge: "Sacred Moonlit Bond",
    heroTagline:
      "A sacred digital experience for couples celebrating love, longevity, and devotion. Slide the traditional Channi (sieve) to view the moon, light the diya, and share eternal prayers.",
    highlights: [
      {
        title: "Traditional Shringar Invitation",
        desc: "Embellished with Mehendi motifs, auspicious red & gold bangles, and sacred devotion.",
        icon: "🪔",
      },
      {
        title: "Interactive Channi & Moon Sighting",
        desc: "Touch and slide the traditional golden sieve across the screen to reveal the glowing full moon.",
        icon: "🌕",
      },
      {
        title: "Diya Flame Lighting Ceremony",
        desc: "Light the brass diya to symbolize longevity, health, and steadfast love.",
        icon: "🕯️",
      },
      {
        title: "Vows of Longevity & Devotion",
        desc: "A deeply moving streaming letter expressing gratitude for her fast and unwavering dedication.",
        icon: "🙏",
      },
    ],
    faqs: [
      {
        question: "How does the Channi (sieve) moon sighting work?",
        answer:
          "In Act II, the user drags or slides the golden Channi across the screen. As the sieve aligns over the glowing full moon, golden moonlight illuminates the screen and plays traditional celebration music.",
      },
      {
        question: "Is this ideal for spouses in different cities or countries?",
        answer:
          "Absolutely. It is the number one choice for military spouses, NRI couples, and long-distance partners celebrating Karwa Chauth when they cannot be physically together.",
      },
    ],
    ratingValue: 4.96,
    ratingCount: 680,
  },

  "pregnancy-reveal": {
    id: "pregnancy-reveal",
    metaTitle: "Digital Pregnancy Surprise Reveal Card with Scratch to Reveal | Candlelit",
    metaDescription:
      "Surprise your husband, parents, or best friends with an interactive pregnancy announcement. Features an audio heartbeat and gold foil scratch-to-reveal card.",
    targetKeywords: [
      "pregnancy reveal card online",
      "baby announcement digital surprise",
      "we are having a baby scratch card",
      "virtual pregnancy announcement for husband grandparents",
      "digital baby reveal link",
    ],
    h1: "Pregnancy Surprise Reveal",
    heroBadge: "Our Greatest Adventure",
    heroTagline:
      "Share the most miraculous news of your life with an enigmatic mystery envelope, precious little heartbeat audio, and an interactive gold foil scratch card that reveals: 'We're having a baby!'.",
    highlights: [
      {
        title: "Enigmatic Mystery Envelope",
        desc: "Teases big news with a playful hint that will keep them guessing.",
        icon: "🍼",
      },
      {
        title: "Precious Little Heartbeat Audio",
        desc: "Listen to the rapid, rhythmic ultrasound heartbeat of your growing miracle.",
        icon: "💓",
      },
      {
        title: "Interactive Scratch-to-Reveal Card",
        desc: "Rub the screen to scratch away the golden foil and reveal the sonogram or announcement photo.",
        icon: "✨",
      },
      {
        title: "Letter to the New Dad / Grandparents",
        desc: "Pour your joy into a streaming letter celebrating the beginning of your growing family.",
        icon: "👶",
      },
    ],
    faqs: [
      {
        question: "How does the scratch-to-reveal feature work?",
        answer:
          "Recipients use their finger or mouse to rub across the golden scratch area on their screen. As they scratch, the gold foil disappears to reveal your sonogram photo or custom announcement text with celebratory confetti.",
      },
      {
        question: "Can I personalize it for different family members?",
        answer:
          "Yes! You can create custom versions for the husband ('You're going to be a daddy!'), grandparents ('Promoted to Grandma & Grandpa!'), or best friends.",
      },
    ],
    ratingValue: 4.98,
    ratingCount: 750,
  },

  "baby-shower": {
    id: "baby-shower",
    metaTitle: "Baby Shower Wonderland Digital Card with Cloud Wishes | Candlelit",
    metaDescription:
      "A pastel wonderland celebrating the new mom and baby. Floating blessing clouds, baby milestone footprints countdown, and streaming family wishes.",
    targetKeywords: [
      "virtual baby shower card",
      "baby shower digital invitation online",
      "online baby shower blessing book",
      "digital celebration for mom to be",
      "baby shower interactive portal",
    ],
    h1: "Baby Shower Wonderland",
    heroBadge: "Welcoming Our Little Miracle",
    heroTagline:
      "Shower the expectant mama with pastel clouds, golden confetti, tiny footprint countdowns, and a collection of heartwarming blessings for the little one on the way.",
    highlights: [
      {
        title: "Pastel Cloud Invitation",
        desc: "Soft dreamlike hues welcoming guests to celebrate the mom-to-be.",
        icon: "☁️",
      },
      {
        title: "Interactive Footprint Steps",
        desc: "Tiny footprints stepping forward with every tap toward the due date.",
        icon: "👣",
      },
      {
        title: "Shower of Floating Blessings",
        desc: "Pop golden blessing clouds to rain down wishes of health, happiness, and peace.",
        icon: "✨",
      },
      {
        title: "Letter to Mama & Baby",
        desc: "Heartwarming words of encouragement and love from friends, partner, and family.",
        icon: "🍼",
      },
    ],
    faqs: [
      {
        question: "Is this suitable for both virtual and in-person baby showers?",
        answer:
          "Yes! You can share the link as an interactive digital invitation before the event, or play it on a big screen during the baby shower as a special surprise for the mom-to-be.",
      },
    ],
    ratingValue: 4.94,
    ratingCount: 520,
  },

  retirement: {
    id: "retirement",
    metaTitle: "Retirement Odyssey & Tribute Card with Golden Trophy Plaque | Candlelit",
    metaDescription:
      "Honor a distinguished career with a prestigious Royal Scroll, Career Milestones gallery, interactive Lifetime Achievement Trophy, and heartfelt colleague tributes.",
    targetKeywords: [
      "digital retirement card",
      "online retirement tribute from colleagues",
      "virtual retirement celebration plaque",
      "retirement gift link for boss coworker parent",
      "prestigious career farewell card online",
    ],
    h1: "Retirement Odyssey & Tribute",
    heroBadge: "Honoring Decades of Excellence",
    heroTagline:
      "Celebrate a lifetime of leadership, hard work, and wisdom. An honorable Royal Scroll, career milestone gallery, interactive Lifetime Achievement Trophy, and heartfelt reflections on the peaceful mornings ahead.",
    highlights: [
      {
        title: "The Royal Scroll of Honor",
        desc: "An embossed parchment scroll recognizing years of dedication and service.",
        icon: "📜",
      },
      {
        title: "Career Milestones Gallery",
        desc: "Polaroid memories of landmark projects, cherished team members, and victories.",
        icon: "🏆",
      },
      {
        title: "Lifetime Achievement Trophy Plaque",
        desc: "Tap to unveil an engraved golden award honoring their lasting legacy and mentorship.",
        icon: "🥇",
      },
      {
        title: "Tributes from Colleagues & Loved Ones",
        desc: "Streaming reflections and warm congratulations on their well-deserved next chapter.",
        icon: "🥂",
      },
    ],
    faqs: [
      {
        question: "Can multiple team members contribute their memories?",
        answer:
          "Yes! You can add multiple colleague photos in the starlight memories gallery and combine several team messages into the streaming letter.",
      },
      {
        question: "Can I engrave their name on the virtual trophy?",
        answer:
          "Yes! The trophy plaque automatically inscribes their name, title, and years of service in radiant 3D golden typography.",
      },
    ],
    ratingValue: 4.97,
    ratingCount: 610,
  },

  "mothers-day": {
    id: "mothers-day",
    metaTitle: "Mother's Day Sanctuary Digital Card with Blooming Flower Bouquet | Candlelit",
    metaDescription:
      "Shower Mom with love and gratitude. Blooming virtual flowers, memory bubbles honoring her sacrifices, and an emotional letter thanking her for being your anchor.",
    targetKeywords: [
      "mothers day digital surprise",
      "online flower bouquet card for mom",
      "mothers day emotional tribute link",
      "virtual mothers day celebration card",
      "digital card for mom whatsapp",
    ],
    h1: "Mother's Day Sanctuary",
    heroBadge: "To My First Home",
    heroTagline:
      "A tribute to the woman who made everything feel safe. Blooming flowers, floating bubbles celebrating her daily superpowers, and a deeply moving streaming letter of gratitude.",
    highlights: [
      {
        title: "Blooming Flower Bouquet",
        desc: "A cascade of animated blooming lilies and roses sent with pure love.",
        icon: "💐",
      },
      {
        title: "Mom's Superpowers Bubbles",
        desc: "Tap bubbles celebrating her unconditional patience, warm meals, and comforting hugs.",
        icon: "🌸",
      },
      {
        title: "Cherished Family Moments",
        desc: "Vintage and modern polaroid photos honoring every sacrifice she made.",
        icon: "📷",
      },
      {
        title: "Letter to My First Home",
        desc: "Express the deep gratitude that words usually fail to capture.",
        icon: "💖",
      },
    ],
    faqs: [
      {
        question: "Can I send this to Mom over WhatsApp?",
        answer:
          "Yes! Mom will receive a beautiful preview thumbnail on WhatsApp. When she taps it, the full cinematic 4-act experience plays smoothly on her phone without installing anything.",
      },
    ],
    ratingValue: 4.98,
    ratingCount: 890,
  },

  "fathers-day": {
    id: "fathers-day",
    metaTitle: "Father's Day Hall of Fame Digital Card with Superhero Badge | Candlelit",
    metaDescription:
      "Celebrate Dad with a superhero Hall of Fame badge, life lessons wisdom wall, celebratory toast, and a heartfelt tribute honoring your lifelong guide.",
    targetKeywords: [
      "fathers day digital card",
      "online tribute to dad",
      "virtual fathers day gift link",
      "best dad superhero celebration online",
      "digital fathers day card whatsapp",
    ],
    h1: "Father's Day Hall of Fame",
    heroBadge: "To My First Hero & Guide",
    heroTagline:
      "For the quiet pillar of strength who gave you roots and wings. An interactive superhero badge, a wall of his best advice, and a tribute thanking Dad for always having your back.",
    highlights: [
      {
        title: "Hall of Fame Superhero Badge",
        desc: "A bold golden seal honoring Dad as the true champion of the household.",
        icon: "🕶️",
      },
      {
        title: "Dad's Wisdom Wall",
        desc: "Interactive tiles highlighting his funniest advice, life rules, and quiet sacrifices.",
        icon: "🔨",
      },
      {
        title: "Golden Cheers & Handshake",
        desc: "A celebratory toast recognizing everything he taught you about integrity and strength.",
        icon: "🍻",
      },
      {
        title: "Tribute to My Anchor",
        desc: "A personal letter thanking Dad for his unspoken sacrifices and unconditional love.",
        icon: "🛡️",
      },
    ],
    faqs: [
      {
        question: "Can I add funny Dad jokes or his famous sayings?",
        answer:
          "Yes! You can customize the wisdom tiles and the streaming letter with his favorite catchphrases, advice, or classic dad jokes.",
      },
    ],
    ratingValue: 4.96,
    ratingCount: 710,
  },

  "womens-day": {
    id: "womens-day",
    metaTitle: "International Women's Day Digital Tribute with Crystal Crown & Fireworks | Candlelit",
    metaDescription:
      "Honor the phenomenal women in your life. Features a royal crystal crown, empowering strength cards, golden celebration fireworks, and inspiring prose.",
    targetKeywords: [
      "womens day online tribute",
      "international womens day digital card",
      "celebrate her achievements online",
      "virtual celebration for woman leader friend sister",
      "empowering womens day card link",
    ],
    h1: "International Women's Day Tribute",
    heroBadge: "Celebrating Her Brilliance",
    heroTagline:
      "A celebration of her brilliance, grace, and unstoppable strength. An empowering purple and gold crystal crown, strength cards, golden fireworks, and words honoring the queen she is.",
    highlights: [
      {
        title: "The Crown of Radiance",
        desc: "A sparkling purple and gold crystal crown honoring her resilience and poise.",
        icon: "👑",
      },
      {
        title: "Unstoppable Strength Cards",
        desc: "Tap cards highlighting her courage, empathy, intellect, and leadership.",
        icon: "⚡",
      },
      {
        title: "Golden Midnight Fireworks",
        desc: "Celebrate her milestones and victories with dynamic sparkling fireworks.",
        icon: "🎆",
      },
      {
        title: "Tribute to an Extraordinary Queen",
        desc: "Empowering prose recognizing her undeniable impact on your world.",
        icon: "💜",
      },
    ],
    faqs: [
      {
        question: "Can I send this to colleagues, friends, or family members?",
        answer:
          "Yes! This storyline is designed to celebrate women in any role—partners, mothers, sisters, mentors, or team leaders.",
      },
    ],
    ratingValue: 4.97,
    ratingCount: 590,
  },
};

