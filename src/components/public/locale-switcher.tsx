"use client";

import { usePathname } from "next/navigation";

import { SiteLink } from "@/components/ui/site-link";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types/content";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const nextLocale = locale === "ja" ? "en" : "ja";
  const href = pathname.replace(`/${locale}`, `/${nextLocale}`) || `/${nextLocale}`;

  return (
    <SiteLink
      href={href}
      className={cn(
        "site-dark-tag rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] transition hover:border-[rgba(99,184,176,0.26)] hover:text-white",
      )}
      onClick={() => trackEvent("locale_switch", { from: locale, to: nextLocale })}
    >
      {nextLocale}
    </SiteLink>
  );
}
