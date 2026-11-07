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
  prompts?: {
    step3Badge: string;
    step3Title: string;
    step3Description: string;
    letterLabel: string;
    letterPlaceholder: string;
  };
  ritualConfig?: {
    ritualLabel: string;
    ritualPlaceholder: string;
    ritualHelper: string;
    allowCakeUpload?: boolean;
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
  customCakeUrl?: string;
  customCandlePosition?: { top: number; arcSpread: number };
  act4Title?: string;
  act4Subtitle?: string;
  createdAt: string;
  userId?: string;
  isPaid?: boolean;
  paymentId?: string;
  orderId?: string;
  amountPaid?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: "google" | "email" | "guest";
}
