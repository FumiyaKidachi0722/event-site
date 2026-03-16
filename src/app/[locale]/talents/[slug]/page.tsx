import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { TalentDetailTracker } from "@/components/public/talent-detail-tracker";
import { SiteLink } from "@/components/ui/site-link";
import { getPublicSnapshot } from "@/lib/content/repository";
import { formatDateTime, getLocalizedText, isLocale } from "@/lib/i18n";
import { newsCategoryTone } from "@/lib/utils";

export default async function TalentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  const talent = snapshot.talents.find((item) => item.slug === slug);
  if (!talent) {
    notFound();
  }

  const relatedSessions = snapshot.sessions.filter((session) =>
    session.talentIds.includes(talent.id),
  );
  const relatedNews = snapshot.news
    .filter((news) => news.relatedTalentIds.includes(talent.id))
    .slice(0, 3);
  const moreTalents = snapshot.talents.filter((item) => item.id !== talent.id).slice(0, 3);

  return (
    <PageShell
      locale={locale}
      eyebrow={talent.unit}
      title={getLocalizedText(talent.name, locale)}
      description={getLocalizedText(talent.shortBio, locale)}
    >
      <TalentDetailTracker talentId={talent.id} />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <img
          src={talent.imageUrl}
          alt={getLocalizedText(talent.name, locale)}
          className="h-full w-full rounded-[2rem] border border-[var(--line-soft)] object-cover"
        />
        <div className="space-y-6">
          <div className="site-panel-violet rounded-[2rem] p-6">
            <p className="site-muted text-sm leading-8">
              {getLocalizedText(talent.fullBio, locale)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {talent.tags.map((tag) => (
                <span key={tag} className="site-tag rounded-full px-3 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={talent.xUrl}
                target="_blank"
                rel="noreferrer"
                className="site-outline-action rounded-full px-4 py-2 text-sm"
              >
                X
              </a>
              <a
                href={talent.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="site-outline-action rounded-full px-4 py-2 text-sm"
              >
                YouTube
              </a>
            </div>
          </div>
          <div className="site-panel-elevated rounded-[2rem] p-6">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "出演セッション" : "Sessions"}
            </h2>
            <div className="mt-4 space-y-4">
              {relatedSessions.map((session) => (
                <div key={session.id} className="site-panel-subtle rounded-2xl p-4">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(session.title, locale)}
                  </h3>
                  <p className="site-time mt-2 text-sm">
                    {formatDateTime(session.startAt, locale)}
                  </p>
                  <p className="site-muted mt-2 text-sm leading-7">
                    {getLocalizedText(session.description, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            {locale === "ja" ? "関連ニュース" : "Related News"}
          </h2>
          {relatedNews.map((item) => (
            <SiteLink
              key={item.id}
              href={`/${locale}/news/${item.slug}`}
              className="site-panel block rounded-[2rem] p-5 transition hover:border-[rgba(229,140,115,0.28)]"
            >
              <p
                className={`${newsCategoryTone(item.category)} inline-flex rounded-full px-3 py-1 text-xs tracking-[0.24em] uppercase`}
              >
                {item.category}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
                {getLocalizedText(item.title, locale)}
              </h3>
            </SiteLink>
          ))}
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
            {locale === "ja" ? "他の出演者" : "More Talents"}
          </h2>
          {moreTalents.map((item) => (
            <SiteLink
              key={item.id}
              href={`/${locale}/talents/${item.slug}`}
              className="site-panel-violet block rounded-[2rem] p-5 transition hover:border-[rgba(229,140,115,0.3)]"
            >
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {getLocalizedText(item.name, locale)}
              </h3>
              <p className="site-muted mt-2 text-sm leading-7">
                {getLocalizedText(item.shortBio, locale)}
              </p>
            </SiteLink>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
