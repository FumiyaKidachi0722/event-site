"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import type { Locale } from "@/types/content";

export function useLanguageSwitch(locale: Locale) {
  const pathname = usePathname();

  return useMemo(() => {
    const nextLocale = locale === "ja" ? "en" : "ja";
    return {
      nextLocale,
      href: pathname.replace(`/${locale}`, `/${nextLocale}`),
    };
  }, [locale, pathname]);
}
