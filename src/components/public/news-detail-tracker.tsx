"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function NewsDetailTracker({ newsId }: { newsId: string }) {
  useEffect(() => {
    trackEvent("news_detail_view", { newsId });
  }, [newsId]);

  return null;
}

