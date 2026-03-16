import { notFound } from "next/navigation";

import { NewsDetailTracker } from "@/components/public/news-detail-tracker";
import { PageShell } from "@/components/public/page-shell";
import { RichText } from "@/components/public/rich-text";
import { SiteLink } from "@/components/ui/site-link";
import { TrackableLink } from "@/components/ui/trackable-link";
import { getPublicSnapshot } from "@/lib/content/repository";
import { formatDate, getLocalizedText, isLocale } from "@/lib/i18n";
import { newsCategoryTone, phasePrimaryAction } from "@/lib/utils";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  const entry = snapshot.news.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  const related = snapshot.news.filter((item) => item.id !== entry.id).slice(0, 3);

  return (
    <PageShell
      locale={locale}
      eyebrow={entry.category}
      title={getLocalizedText(entry.title, locale)}
      description={getLocalizedText(entry.summary, locale)}
    >
      <NewsDetailTracker newsId={entry.id} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="site-panel rounded-[2rem] p-6">
          <div className="site-label mb-6 flex flex-wrap items-center gap-3 text-sm">
            <span>{formatDate(entry.publishedAt, locale)}</span>
            <span className={`${newsCategoryTone(entry.category)} rounded-full px-3 py-1 text-xs`}>
              {entry.category}
            </span>
          </div>
          <img
            src={entry.thumbnailUrl}
            alt={getLocalizedText(entry.title, locale)}
            className="mb-6 h-72 w-full rounded-[2rem] object-cover"
          />
          <RichText value={getLocalizedText(entry.body, locale)} />
        </article>
        <aside className="space-y-5">
          <div className="site-panel-elevated rounded-[2rem] p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "CTA" : "Call to Action"}
            </h2>
            <TrackableLink
              href={snapshot.event.primaryCta.url}
              target="_blank"
              rel="noreferrer"
              eventName={snapshot.event.phase === "before" ? "ticket_cta_click" : "watch_cta_click"}
              className="site-cta-primary mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
            >
              {phasePrimaryAction(snapshot.event.phase, locale)}
            </TrackableLink>
            <SiteLink
              href={`/${locale}/ticket`}
              className="site-outline-action mt-3 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
            >
              {locale === "ja" ? "チケット / 視聴案内へ" : "Ticket / watch guide"}
            </SiteLink>
          </div>
          <div className="site-panel rounded-[2rem] p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "関連ニュース" : "Related News"}
            </h2>
            <div className="mt-4 space-y-4">
              {related.map((item) => (
                <SiteLink
                  key={item.id}
                  href={`/${locale}/news/${item.slug}`}
                  className="site-panel-subtle block rounded-2xl p-4 transition hover:border-[rgba(228,196,122,0.24)]"
                >
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(item.title, locale)}
                  </h3>
                  <p className="site-muted mt-2 text-sm leading-7">
                    {getLocalizedText(item.summary, locale)}
                  </p>
                </SiteLink>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
