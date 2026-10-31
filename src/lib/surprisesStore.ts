import { SurpriseData } from "@/types/candlelit";
import { supabase, isSupabaseConfigured } from "./supabase";
import { TEMPLATES } from "./templatesData";

// Pre-seeded flagship experience for Nidhi
export const NIDHI_FLAGSHIP_SURPRISE: SurpriseData = {
  id: "flagship-birthday-nidhi",
  slug: "birthday-nidhi",
  templateId: "birthday-surprise",
  recipientName: "Nidhi",
  senderName: "Vishal",
  occasionSubtitle: "Act III: The Cake Ceremony",
  cakeOrObjectMessage: "Happy Birthday Nidhi",
  photos: [
    { url: "/images/polaroids/photo_rooftop.jpg", caption: "Under the stars with you ✨" },
    { url: "/images/polaroids/photo_beach.jpg", caption: "Sunset waves & quiet laughs 🌊" },
    { url: "/images/polaroids/photo_festive.jpg", caption: "Golden festive lights with you 🪔" },
    { url: "/images/polaroids/photo_roses.jpg", caption: "A million roses wouldn't be enough 🌹" },
    { url: "/images/polaroids/photo_mountains.jpg", caption: "Adventures to the highest peaks ⛰️" },
  ],
  letter: [
    "From the very first moment our paths crossed, you brought an impossible amount of light into my world.",
    "Your smile is my favorite comfort, your laughter my favorite melody, and every single second with you is a memory I treasure.",
    "On this special day, I want you to know how deeply you are appreciated, cherished, and loved.",
    "May this new year of your life bring you endless joy, success, and all the dreams your heart has ever whispered.",
    "Happy Birthday, My Queen Nidhi. Forever and always, yours."
  ],
  musicUrl: "/audio/bgm.mp3",
  musicTitle: "Soothing Ambient Melody (Low Volume)",
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY = "candlelit_surprises_v1";

function getLocalSurprises(): SurpriseData[] {
  if (typeof window === "undefined") return [NIDHI_FLAGSHIP_SURPRISE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([NIDHI_FLAGSHIP_SURPRISE]));
      return [NIDHI_FLAGSHIP_SURPRISE];
    }
    const parsed = JSON.parse(raw);
    if (!parsed.some((s: SurpriseData) => s.slug === "birthday-nidhi")) {
      parsed.unshift(NIDHI_FLAGSHIP_SURPRISE);
    }
    return parsed;
  } catch {
    return [NIDHI_FLAGSHIP_SURPRISE];
  }
}

function saveLocalSurprise(surprise: SurpriseData) {
  if (typeof window === "undefined") return;
  try {
    const list = getLocalSurprises();
    const existingIndex = list.findIndex((s) => s.slug === surprise.slug);
    if (existingIndex >= 0) {
      list[existingIndex] = surprise;
    } else {
      list.unshift(surprise);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export async function saveSurprise(surprise: SurpriseData): Promise<string> {
  // Always save to local storage as fallback and immediate cache
  saveLocalSurprise(surprise);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("surprises").upsert({
        id: surprise.id,
        slug: surprise.slug,
        template_id: surprise.templateId,
        recipient_name: surprise.recipientName,
        sender_name: surprise.senderName,
        data: surprise,
        created_at: surprise.createdAt,
      });
    } catch (err) {
      console.warn("Supabase save error, saved locally:", err);
    }
  }

  return surprise.slug;
}

export async function getSurpriseBySlug(slug: string): Promise<SurpriseData | null> {
  if (slug === "birthday-nidhi") {
    return NIDHI_FLAGSHIP_SURPRISE;
  }

  // 1. Check database if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from("surprises")
        .select("data")
        .eq("slug", slug)
        .single();
      if (data?.data) {
        return data.data as SurpriseData;
      }
    } catch {
      // Fallback to local
    }
  }

  // 2. Check local storage for customized saved surprises
  const locals = getLocalSurprises();
  const match = locals.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
  if (match) return match;

  // 3. Check exact template match (e.g. "birthday-surprise", "propose", "anniversary")
  const templateMatch = TEMPLATES.find(
    (t) => t.id === slug || `demo-${t.id}` === slug
  );
  if (templateMatch) {
    return {
      id: `demo-${templateMatch.id}`,
      slug: templateMatch.id,
      templateId: templateMatch.id,
      recipientName: "Sophia",
      senderName: "With Love",
      occasionSubtitle: templateMatch.defaultFields.occasionSubtitle,
      cakeOrObjectMessage: templateMatch.defaultFields.cakeOrObjectMessage,
      photos: templateMatch.defaultFields.defaultPhotos,
      letter: templateMatch.defaultFields.defaultLetter,
      musicUrl: templateMatch.defaultFields.musicUrl,
      musicTitle: templateMatch.defaultFields.musicLabel,
      createdAt: new Date().toISOString(),
    };
  }

  // 4. Dynamic pattern: {templateId}-{recipientName} (e.g. "propose-maya", "birthday-surprise-john")
  for (const tmpl of TEMPLATES) {
    const prefix = `${tmpl.id}-`;
    if (slug.startsWith(prefix)) {
      const rawName = slug.slice(prefix.length).trim();
      if (rawName.length > 0) {
        const recipient = rawName.charAt(0).toUpperCase() + rawName.slice(1);
        return {
          id: `auto-${slug}`,
          slug: slug,
          templateId: tmpl.id,
          recipientName: recipient,
          senderName: "With Love",
          occasionSubtitle: tmpl.defaultFields.occasionSubtitle,
          cakeOrObjectMessage:
            tmpl.id === "birthday-surprise"
              ? `Happy Birthday ${recipient}`
              : tmpl.defaultFields.cakeOrObjectMessage,
          photos: tmpl.defaultFields.defaultPhotos,
          letter: tmpl.defaultFields.defaultLetter,
          musicUrl: tmpl.defaultFields.musicUrl,
          musicTitle: tmpl.defaultFields.musicLabel,
          createdAt: new Date().toISOString(),
        };
      }
    }
  }

  return null;
}

export async function getUserSurprises(userId?: string): Promise<SurpriseData[]> {
  const localList = getLocalSurprises();
  if (isSupabaseConfigured && supabase && userId) {
    try {
      const { data } = await supabase
        .from("surprises")
        .select("data")
        .eq("user_id", userId);
      if (data && data.length > 0) {
        return data.map((d) => d.data as SurpriseData);
      }
    } catch {
      // Fallback
    }
  }
  return localList;
}

/**
 * Formats the public share link in the format: candleit.one7app.in/{template}-{name}
 */
export function formatSurpriseShareUrl(slug: string): string {
  return `candleit.one7app.in/${slug}`;
}

export function formatSurpriseWebUrl(slug: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/${slug}`;
  }
  return `https://candleit.one7app.in/${slug}`;
}
