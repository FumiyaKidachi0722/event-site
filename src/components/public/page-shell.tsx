import { RouteReady } from "@/components/public/navigation-progress";
import type { Locale } from "@/types/content";

import type { ReactNode } from "react";


export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="site-page-shell mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <RouteReady />
      <div className="max-w-3xl space-y-4 pb-10">
        <p className="site-kicker text-xs font-semibold uppercase tracking-[0.28em]">
          {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-semibold text-[var(--text-primary)] sm:text-5xl">
          {title}
        </h1>
        <p className="site-muted text-base leading-8">{description}</p>
      </div>
      {children}
    </div>
  );
}
