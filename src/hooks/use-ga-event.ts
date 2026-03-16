"use client";

import { useCallback } from "react";

import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

export function useGaEvent() {
  return useCallback(
    (name: AnalyticsEventName, params?: Record<string, string | number | boolean | undefined>) =>
      trackEvent(name, params),
    [],
  );
}
