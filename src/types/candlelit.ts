export type TemplateCategory = "all" | "romance" | "milestones" | "celebrations";

export interface TemplateDefinition {
  id: string;
  title: string;
  category: TemplateCategory;
  shortDescription: string;
  tag: string;
  emoji: string;
  accentColor: string;
  previewImage: string;
  acts: {
    actNumber: number;
    title: string;
    description: string;
  }[];
  defaultFields: {
    occasionSubtitle: string;
    cakeOrObjectMessage: string;
    defaultLetter: string[];
    defaultPhotos: { url: string; caption: string }[];
    musicLabel: string;
    musicUrl: string;
  };
  options?: {
    subtypes?: string[]; // e.g. for Anniversary: ["Marriage", "Love", "Proposal", "Work"]
    days?: string[]; // e.g. for Valentine: ["Rose Day", "Propose Day", "Chocolate Day", "Teddy Day", "Promise Day", "Hug Day", "Kiss Day", "Valentine's Day"]
  };
}

export interface SurpriseData {
  id: string;
  slug: string;
  templateId: string;
  recipientName: string;
  senderName: string;
  date?: string;
  occasionSubtitle: string;
  cakeOrObjectMessage?: string;
  subtype?: string;
  photos: { url: string; caption: string }[];
  letter: string[];
  musicUrl: string;
  musicTitle?: string;
  createdAt: string;
  userId?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: "google" | "email" | "guest";
}
