import { getBaseUrl } from "@/lib/env";

import type { Metadata } from "next";

export function buildMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: getBaseUrl(),
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
