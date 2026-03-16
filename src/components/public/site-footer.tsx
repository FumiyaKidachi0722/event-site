import { SiteLink } from "@/components/ui/site-link";
import { getUiCopy } from "@/lib/i18n";
import type { EventDoc, Locale } from "@/types/content";

export function SiteFooter({ locale, event }: { locale: Locale; event: EventDoc }) {
  const copy = getUiCopy(locale);

  return (
    <footer className="border-t border-[rgba(234,217,167,0.16)] bg-[rgba(23,25,34,0.96)] text-[rgba(255,250,242,0.9)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-astraflow-mark.svg"
              alt=""
              aria-hidden="true"
              className="h-12 w-12 shrink-0"
            />
            <p className="font-display text-xl font-semibold text-white">
              {event.title[locale] || event.title.ja}
            </p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[rgba(255,250,242,0.7)]">
            {event.summary[locale] || event.summary.ja}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.hashtags.map((tag) => (
              <span key={tag} className="site-dark-tag rounded-full px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-[rgba(255,250,242,0.7)]">
          <p className="font-semibold text-white">{copy.navigation.about}</p>
          <SiteLink href={`/${locale}/about`} className="site-dark-link block">
            {copy.common.eventOverview}
          </SiteLink>
          <SiteLink href={`/${locale}/ticket`} className="site-dark-link block">
            {copy.navigation.ticket}
          </SiteLink>
          <SiteLink href={`/${locale}/guidelines`} className="site-dark-link block">
            {copy.navigation.guidelines}
          </SiteLink>
        </div>
        <div className="space-y-3 text-sm text-[rgba(255,250,242,0.7)]">
          <p className="font-semibold text-white">Admin</p>
          <SiteLink href="/admin/login" className="site-dark-link block">
            {copy.navigation.admin}
          </SiteLink>
          <p>{locale === "ja" ? "ポートフォリオ用の架空イベント作品です。" : "A fictional event project built for portfolio use."}</p>
        </div>
      </div>
    </footer>
  );
}
