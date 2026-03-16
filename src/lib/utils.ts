import { cn as mergeCn } from "@/lib/utils/cn";
import type { EventPhase, Locale, PublishStatus } from "@/types/content";

export function cn(...parts: Array<string | false | null | undefined>) {
  return mergeCn(...parts);
}

export function sortByDateDesc<
  T extends { publishedAt?: string; updatedAt?: string; createdAt?: string },
>(items: T[]) {
  return [...items].sort((a, b) => {
    const left = a.publishedAt ?? a.updatedAt ?? a.createdAt ?? "";
    const right = b.publishedAt ?? b.updatedAt ?? b.createdAt ?? "";
    return right.localeCompare(left);
  });
}

export function sortByOrder<T extends { sortOrder: number }>(items: T[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function statusLabel(status: PublishStatus, locale: Locale) {
  if (status === "published") {
    return locale === "ja" ? "公開中" : "Published";
  }

  return locale === "ja" ? "下書き" : "Draft";
}

export function phasePrimaryAction(phase: EventPhase, locale: Locale) {
  if (phase === "live") {
    return locale === "ja" ? "視聴する" : "Watch now";
  }

  if (phase === "after") {
    return locale === "ja" ? "アーカイブを見る" : "Watch archive";
  }

  return locale === "ja" ? "チケットを購入" : "Buy tickets";
}

export function phaseTone(phase: EventPhase) {
  if (phase === "live") {
    return "bg-[rgba(99,184,176,0.16)] text-[rgba(255,250,242,0.94)] ring-1 ring-[rgba(99,184,176,0.28)]";
  }

  if (phase === "after") {
    return "bg-[rgba(234,217,167,0.16)] text-[rgba(255,250,242,0.94)] ring-1 ring-[rgba(234,217,167,0.28)]";
  }

  return "bg-[rgba(235,132,69,0.18)] text-[rgba(255,250,242,0.96)] ring-1 ring-[rgba(235,132,69,0.28)]";
}

export function excerpt(text: string, length = 120) {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trimEnd()}...`;
}

export function newsCategoryTone(category: string) {
  const key = category.toLowerCase();

  if (
    key.includes("schedule") ||
    key.includes("guide") ||
    key.includes("配信") ||
    key.includes("案内") ||
    key.includes("ガイド")
  ) {
    return "site-chip-mint";
  }

  if (
    key.includes("announcement") ||
    key.includes("ticket") ||
    key.includes("告知") ||
    key.includes("チケット")
  ) {
    return "site-chip-champagne";
  }

  if (
    key.includes("goods") ||
    key.includes("campaign") ||
    key.includes("グッズ") ||
    key.includes("企画")
  ) {
    return "site-chip-berry";
  }

  return "site-chip-coral";
}

export function fallbackSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
