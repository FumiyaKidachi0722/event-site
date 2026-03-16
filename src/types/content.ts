export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];
export type PublishStatus = "draft" | "published";
export type EventPhase = "before" | "live" | "after";
export type NewsCategory =
  | "announcement"
  | "ticket"
  | "streaming"
  | "goods"
  | "campaign"
  | "report";
export type FaqCategory = "ticket" | "streaming" | "rules" | "access";

export type LocalizedText = {
  ja: string;
  en?: string;
};

export type CtaLink = {
  label: LocalizedText;
  url: string;
};

export type Banner = {
  enabled: boolean;
  tone: "info" | "alert";
  text: LocalizedText;
  link?: CtaLink;
};

export type EventDoc = {
  id: string;
  slug: string;
  status: PublishStatus;
  phase: EventPhase;
  title: LocalizedText;
  subtitle: LocalizedText;
  summary: LocalizedText;
  venue: LocalizedText;
  format: LocalizedText;
  highlights: LocalizedText[];
  participationSteps: LocalizedText[];
  startAt: string;
  endAt: string;
  heroImageUrl: string;
  ogImageUrl: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  hashtags: string[];
  locales: Locale[];
  emergencyBanner: Banner;
  createdAt: string;
  updatedAt: string;
};

export type StageDoc = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  color: string;
  sortOrder: number;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
};

export type NewsDoc = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  thumbnailUrl: string;
  category: NewsCategory;
  status: PublishStatus;
  publishedAt: string;
  pinned: boolean;
  relatedTalentIds: string[];
  relatedSessionIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type TalentDoc = {
  id: string;
  slug: string;
  name: LocalizedText;
  shortBio: LocalizedText;
  fullBio: LocalizedText;
  imageUrl: string;
  unit: string;
  tags: string[];
  appearanceDayKeys: string[];
  xUrl: string;
  youtubeUrl: string;
  sortOrder: number;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
};

export type SessionDoc = {
  id: string;
  dayKey: string;
  stageId: string;
  title: LocalizedText;
  description: LocalizedText;
  startAt: string;
  endAt: string;
  talentIds: string[];
  watchUrl: string;
  tags: string[];
  sortOrder: number;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
};

export type FaqDoc = {
  id: string;
  category: FaqCategory;
  question: LocalizedText;
  answer: LocalizedText;
  sortOrder: number;
  status: PublishStatus;
  createdAt: string;
  updatedAt: string;
};

export type PageDoc = {
  id: string;
  key: "about" | "ticket" | "guidelines";
  title: LocalizedText;
  body: LocalizedText;
  status: PublishStatus;
  updatedAt: string;
};

export type AdminDoc = {
  uid: string;
  email: string;
  name: string;
  role: "owner" | "editor";
};

export type EventBundle = {
  event: EventDoc;
  stages: StageDoc[];
  news: NewsDoc[];
  talents: TalentDoc[];
  sessions: SessionDoc[];
  faqs: FaqDoc[];
  pages: PageDoc[];
};

export type LocalDatabase = {
  currentEventId: string;
  admins: AdminDoc[];
  events: Record<string, EventBundle>;
};
