import { RouteLoadingProvider } from "@/components/public/navigation-progress";
import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";
import type { EventDoc, Locale } from "@/types/content";

import type { ReactNode } from "react";

export function PublicSiteLayout({
  locale,
  event,
  children,
}: {
  locale: Locale;
  event: EventDoc;
  children: ReactNode;
}) {
  return (
    <div className="site-shell min-h-screen text-[var(--text-primary)]">
      <RouteLoadingProvider>
        <SiteHeader locale={locale} event={event} />
        <main>{children}</main>
        <SiteFooter locale={locale} event={event} />
      </RouteLoadingProvider>
    </div>
  );
}
