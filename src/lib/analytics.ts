"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "ticket_cta_click"
  | "watch_cta_click"
  | "talent_detail_view"
  | "news_detail_view"
  | "faq_open"
  | "locale_switch"
  | "schedule_filter_use";

export function trackEvent(
  name: AnalyticsEventName,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", name, params);
}
