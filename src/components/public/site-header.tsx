"use client";

import { Menu } from "lucide-react";

import { LocaleSwitcher } from "@/components/public/locale-switcher";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiteLink } from "@/components/ui/site-link";
import { publicNavigation } from "@/config/navigation";
import { getUiCopy } from "@/lib/i18n";
import { phaseTone } from "@/lib/utils";
import type { EventDoc, Locale } from "@/types/content";

export function SiteHeader({
  locale,
  event,
}: {
  locale: Locale;
  event: EventDoc;
}) {
  const copy = getUiCopy(locale);
  const nav = publicNavigation.map((item) => ({
    href: `/${locale}${item.href}`,
    label: copy.navigation[item.key],
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(234,217,167,0.16)] bg-[rgba(23,25,34,0.92)] text-[rgba(255,250,242,0.94)] backdrop-blur-xl">
      {event.emergencyBanner.enabled ? (
        <div
          className={`border-b border-[rgba(234,217,167,0.14)] px-4 py-2 text-center text-xs font-medium ${phaseTone(
            event.phase,
          )}`}
        >
          <span>{event.emergencyBanner.text[locale] || event.emergencyBanner.text.ja}</span>
          {event.emergencyBanner.link?.url ? (
            <SiteLink
              href={event.emergencyBanner.link.url}
              className="ml-3 underline underline-offset-4"
            >
              {event.emergencyBanner.link.label[locale] || event.emergencyBanner.link.label.ja}
            </SiteLink>
          ) : null}
        </div>
      ) : null}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo-astraflow-mark.svg"
            alt=""
            aria-hidden="true"
            className="h-11 w-11 shrink-0"
          />
          <SiteLink
            href={`/${locale}`}
            className="font-display text-lg font-semibold text-white"
          >
            <span className="block">{event.title[locale] || event.title.ja}</span>
            <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-[rgba(234,217,167,0.78)]">
              {copy.phaseLabel[event.phase]}
            </span>
          </SiteLink>
        </div>
        <nav className="hidden items-center gap-5 text-sm text-[rgba(255,250,242,0.72)] lg:flex">
          {nav.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--accent-champagne)]"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} />
          <Button asChild size="sm" className="site-header-cta hidden sm:inline-flex">
            <SiteLink href={`/${locale}/ticket`}>{copy.navigation.ticket}</SiteLink>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border border-[rgba(234,217,167,0.16)] bg-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(255,255,255,0.1)] hover:text-white lg:hidden"
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="space-y-6">
              <DialogTitle className="sr-only">
                {locale === "ja" ? "モバイルナビゲーション" : "Mobile navigation"}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <img
                  src="/assets/logo-astraflow-mark.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 shrink-0"
                />
                <div>
                  <p className="font-display text-xl font-semibold text-white">
                    {event.title[locale] || event.title.ja}
                  </p>
                  <p className="mt-2 text-sm text-[rgba(234,217,167,0.76)]">{copy.phaseLabel[event.phase]}</p>
                </div>
              </div>
              <nav className="space-y-2">
                {nav.map((item) => (
                  <SiteLink
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl border border-[rgba(234,217,167,0.14)] bg-[rgba(255,255,255,0.05)] px-4 py-3 text-sm text-[rgba(255,250,242,0.88)] transition hover:border-[rgba(99,184,176,0.26)] hover:bg-[rgba(255,255,255,0.08)]"
                  >
                    {item.label}
                  </SiteLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
