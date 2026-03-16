"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function TalentDetailTracker({ talentId }: { talentId: string }) {
  useEffect(() => {
    trackEvent("talent_detail_view", { talentId });
  }, [talentId]);

  return null;
}

