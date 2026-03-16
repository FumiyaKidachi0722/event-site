import type {
  EventDoc,
  FaqDoc,
  NewsDoc,
  PageDoc,
  SessionDoc,
  StageDoc,
  TalentDoc,
} from "@/types/content";

const now = () => new Date().toISOString();

export function newId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }

  return `${prefix}-${Date.now().toString(36)}`;
}

export function createEmptyNews(): NewsDoc {
  const timestamp = now();
  return {
    id: newId("news"),
    slug: "",
    title: { ja: "", en: "" },
    summary: { ja: "", en: "" },
    body: { ja: "", en: "" },
    thumbnailUrl: "/assets/news-announcement.svg",
    category: "announcement",
    status: "draft",
    publishedAt: timestamp,
    pinned: false,
    relatedTalentIds: [],
    relatedSessionIds: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createEmptyTalent(): TalentDoc {
  const timestamp = now();
  return {
    id: newId("talent"),
    slug: "",
    name: { ja: "", en: "" },
    shortBio: { ja: "", en: "" },
    fullBio: { ja: "", en: "" },
    imageUrl: "/assets/talent-liora.svg",
    unit: "",
    tags: [],
    appearanceDayKeys: [],
    xUrl: "",
    youtubeUrl: "",
    sortOrder: 99,
    status: "draft",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createEmptySession(): SessionDoc {
  const timestamp = now();
  return {
    id: newId("session"),
    dayKey: "day1",
    stageId: "mainstage",
    title: { ja: "", en: "" },
    description: { ja: "", en: "" },
    startAt: timestamp,
    endAt: timestamp,
    talentIds: [],
    watchUrl: "",
    tags: [],
    sortOrder: 99,
    status: "draft",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createEmptyFaq(): FaqDoc {
  const timestamp = now();
  return {
    id: newId("faq"),
    category: "ticket",
    question: { ja: "", en: "" },
    answer: { ja: "", en: "" },
    sortOrder: 99,
    status: "draft",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createEmptyPage(key: PageDoc["key"]): PageDoc {
  return {
    id: `page-${key}`,
    key,
    title: { ja: "", en: "" },
    body: { ja: "", en: "" },
    status: "draft",
    updatedAt: now(),
  };
}

export function createDefaultStages(): StageDoc[] {
  const timestamp = now();
  return [
    {
      id: "mainstage",
      name: { ja: "Main Orbit", en: "Main Orbit" },
      description: {
        ja: "大型ライブとメイン番組を配信する中心ステージ。",
        en: "The headline stage for major performances.",
      },
      color: "#ff8f6b",
      sortOrder: 1,
      status: "published",
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  ];
}

export function updateTimestamp<T extends { updatedAt: string }>(doc: T) {
  return { ...doc, updatedAt: now() };
}

export function touchEvent(event: EventDoc) {
  return { ...event, updatedAt: now() };
}
