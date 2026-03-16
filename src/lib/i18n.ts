import { locales, type Locale, type LocalizedText } from "@/types/content";

export const defaultLocale: Locale = "ja";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedText(
  value: LocalizedText | string,
  locale: Locale,
  fallback: Locale = defaultLocale,
) {
  if (typeof value === "string") {
    return value;
  }

  return value[locale] || value[fallback] || "";
}

export function formatDate(date: string, locale: Locale, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(date));
}

export function formatDateTime(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function getUiCopy(locale: Locale) {
  return {
    localeName: locale === "ja" ? "日本語" : "English",
    navigation: {
      about: locale === "ja" ? "イベント概要" : "About",
      talents: locale === "ja" ? "出演者" : "Talents",
      schedule: locale === "ja" ? "タイムテーブル" : "Schedule",
      news: locale === "ja" ? "ニュース" : "News",
      faq: locale === "ja" ? "FAQ" : "FAQ",
      ticket: locale === "ja" ? "視聴 / チケット" : "Ticket / Watch",
      guidelines: locale === "ja" ? "注意事項" : "Guidelines",
      admin: locale === "ja" ? "管理画面" : "Admin",
    },
    common: {
      latestNews: locale === "ja" ? "最新ニュース" : "Latest News",
      talents: locale === "ja" ? "出演者" : "Talents",
      schedule: locale === "ja" ? "スケジュール" : "Schedule",
      faq: locale === "ja" ? "よくある質問" : "FAQ",
      relatedNews: locale === "ja" ? "関連ニュース" : "Related News",
      relatedTalents: locale === "ja" ? "あわせて見たい出演者" : "More Talents",
      viewMore: locale === "ja" ? "もっと見る" : "View more",
      back: locale === "ja" ? "戻る" : "Back",
      published: locale === "ja" ? "公開中" : "Published",
      draft: locale === "ja" ? "下書き" : "Draft",
      noItems: locale === "ja" ? "該当データがありません。" : "No matching items found.",
      eventOverview: locale === "ja" ? "イベント概要" : "Event Overview",
      participate: locale === "ja" ? "参加方法" : "How to Join",
    },
    cta: {
      buyTicket: locale === "ja" ? "チケットを購入" : "Buy Tickets",
      watchLive: locale === "ja" ? "配信を見る" : "Watch Live",
      watchArchive: locale === "ja" ? "アーカイブを見る" : "Watch Archive",
      learnMore: locale === "ja" ? "イベント概要へ" : "Explore the Event",
    },
    phaseLabel: {
      before: locale === "ja" ? "開催前" : "Before",
      live: locale === "ja" ? "開催中" : "Live",
      after: locale === "ja" ? "開催後" : "After",
    },
  };
}
