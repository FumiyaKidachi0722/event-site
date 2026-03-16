import { FaqAccordion } from "@/components/public/faq-accordion";
import { RouteReady } from "@/components/public/navigation-progress";
import { SiteLink } from "@/components/ui/site-link";
import { TrackableLink } from "@/components/ui/trackable-link";
import { formatDate, formatDateTime, getLocalizedText, getUiCopy } from "@/lib/i18n";
import { excerpt, newsCategoryTone, phasePrimaryAction } from "@/lib/utils";
import type { FaqDoc, Locale, NewsDoc, SessionDoc, StageDoc, TalentDoc } from "@/types/content";

type Props = {
  locale: Locale;
  event: {
    title: { ja: string; en?: string };
    subtitle: { ja: string; en?: string };
    summary: { ja: string; en?: string };
    startAt: string;
    endAt: string;
    heroImageUrl: string;
    primaryCta: { url: string };
    secondaryCta: { url: string; label: { ja: string; en?: string } };
    phase: "before" | "live" | "after";
    hashtags: string[];
    venue: { ja: string; en?: string };
    format: { ja: string; en?: string };
    participationSteps: Array<{ ja: string; en?: string }>;
    highlights: Array<{ ja: string; en?: string }>;
  };
  talents: TalentDoc[];
  sessions: SessionDoc[];
  news: NewsDoc[];
  faqs: FaqDoc[];
  stages: StageDoc[];
};

export function HomePage({ locale, event, talents, sessions, news, faqs, stages }: Props) {
  const copy = getUiCopy(locale);
  const featuredTalents = talents.slice(0, 3);
  const featuredSessions = sessions.slice(0, 4);
  const featuredNews = news.slice(0, 3);
  const featuredFaqs = faqs.slice(0, 4);
  const stageMap = new Map(stages.map((stage) => [stage.id, stage]));
  const talentCardStyles = ["site-panel-violet", "site-panel-warm", "site-panel"];
  const talentAccentStyles = ["site-chip-mint", "site-chip-champagne", "site-chip-berry"];

  return (
    <div className="space-y-16 pb-16">
      <RouteReady />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:py-16">
        <div className="space-y-6 lg:pr-4">
          <p className="site-kicker text-xs font-semibold uppercase tracking-[0.28em]">
            {formatDate(event.startAt, locale)} - {formatDate(event.endAt, locale)}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-tight text-[var(--text-primary)] sm:text-6xl">
            {getLocalizedText(event.title, locale)}
          </h1>
          <p className="site-muted max-w-2xl text-xl leading-9">
            {getLocalizedText(event.subtitle, locale)}
          </p>
          <p className="site-muted max-w-2xl text-base leading-8">
            {getLocalizedText(event.summary, locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="site-chip-champagne rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em]">
              {copy.phaseLabel[event.phase]}
            </span>
            <span className="site-tag-neutral rounded-full px-3 py-1 text-xs">
              {getLocalizedText(event.format, locale)}
            </span>
            <span className="site-tag rounded-full px-3 py-1 text-xs">
              {getLocalizedText(event.venue, locale)}
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackableLink
              href={event.primaryCta.url}
              target="_blank"
              rel="noreferrer"
              eventName={event.phase === "before" ? "ticket_cta_click" : "watch_cta_click"}
              className="site-cta-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              {phasePrimaryAction(event.phase, locale)}
            </TrackableLink>
            <TrackableLink
              href={event.secondaryCta.url}
              target="_blank"
              rel="noreferrer"
              eventName="watch_cta_click"
              className="site-outline-action inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              {getLocalizedText(event.secondaryCta.label, locale)}
            </TrackableLink>
          </div>
          <div className="site-panel-elevated grid gap-4 rounded-[2rem] p-6 sm:grid-cols-2">
            <div>
              <p className="site-label text-xs uppercase tracking-[0.24em]">
                {locale === "ja" ? "開催形式" : "Format"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                {getLocalizedText(event.format, locale)}
              </p>
            </div>
            <div>
              <p className="site-label text-xs uppercase tracking-[0.24em]">
                {locale === "ja" ? "会場" : "Venue"}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-primary)]">
                {getLocalizedText(event.venue, locale)}
              </p>
            </div>
          </div>
        </div>
        <div className="site-panel-hero overflow-hidden rounded-[2rem] p-3 sm:p-4">
          <img
            src={event.heroImageUrl}
            alt={getLocalizedText(event.title, locale)}
            className="h-full w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </section>

      <section className="site-section-overview mx-auto max-w-7xl space-y-6 rounded-[2.5rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="site-kicker text-xs uppercase tracking-[0.24em]">{copy.common.eventOverview}</p>
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              {copy.common.participate}
            </h2>
          </div>
          <SiteLink href={`/${locale}/about`} className="site-link text-sm">
            {copy.common.viewMore}
          </SiteLink>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="site-panel rounded-[2rem] p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "イベントの見どころ" : "Highlights"}
            </h3>
            <ul className="site-muted mt-4 space-y-3 text-sm leading-7">
              {event.highlights.map((item) => (
                <li key={item.ja} className="site-panel-subtle rounded-2xl px-4 py-3">
                  {getLocalizedText(item, locale)}
                </li>
              ))}
            </ul>
          </div>
          <div className="site-panel rounded-[2rem] p-6">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "参加までの流れ" : "How to Join"}
            </h3>
            <ol className="site-muted mt-4 space-y-3 text-sm leading-7">
              {event.participationSteps.map((item, index) => (
                <li key={item.ja} className="site-panel-subtle flex gap-3 rounded-2xl px-4 py-3">
                  <span className="site-chip-champagne mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{getLocalizedText(item, locale)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="site-section-talents mx-auto max-w-7xl space-y-6 rounded-[2.5rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="site-kicker text-xs uppercase tracking-[0.24em]">{copy.common.talents}</p>
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "出演者ピックアップ" : "Featured Talents"}
            </h2>
          </div>
          <SiteLink href={`/${locale}/talents`} className="site-link text-sm">
            {copy.common.viewMore}
          </SiteLink>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredTalents.map((talent, index) => (
            <SiteLink
              key={talent.id}
              href={`/${locale}/talents/${talent.slug}`}
              className={`${talentCardStyles[index % talentCardStyles.length]} group overflow-hidden rounded-[2rem] transition hover:-translate-y-1 hover:border-[rgba(226,184,87,0.3)]`}
            >
              <img src={talent.imageUrl} alt={getLocalizedText(talent.name, locale)} className="h-64 w-full object-cover" />
              <div className="space-y-3 p-5">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`${talentAccentStyles[index % talentAccentStyles.length]} rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em]`}
                  >
                    {talent.unit}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                  {getLocalizedText(talent.name, locale)}
                </h3>
                <p className="site-muted text-sm leading-7">{getLocalizedText(talent.shortBio, locale)}</p>
              </div>
            </SiteLink>
          ))}
        </div>
      </section>

      <section className="site-section-schedule mx-auto max-w-7xl space-y-6 rounded-[2.5rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="site-kicker text-xs uppercase tracking-[0.24em]">{copy.common.schedule}</p>
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "スケジュール抜粋" : "Schedule Highlights"}
            </h2>
          </div>
          <SiteLink href={`/${locale}/schedule`} className="site-link text-sm">
            {copy.common.viewMore}
          </SiteLink>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featuredSessions.map((session) => (
            <article key={session.id} className="site-panel-elevated rounded-[2rem] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="site-label text-xs uppercase tracking-[0.24em]">
                  {stageMap.get(session.stageId)?.name[locale] || stageMap.get(session.stageId)?.name.ja}
                </p>
                <p className="site-time text-sm font-semibold">{formatDateTime(session.startAt, locale)}</p>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                {getLocalizedText(session.title, locale)}
              </h3>
              <p className="site-muted mt-3 text-sm leading-7">
                {getLocalizedText(session.description, locale)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-section-news mx-auto max-w-7xl space-y-6 rounded-[2.5rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="site-kicker text-xs uppercase tracking-[0.24em]">{copy.common.latestNews}</p>
            <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
              {locale === "ja" ? "最新の更新" : "Latest Updates"}
            </h2>
          </div>
          <SiteLink href={`/${locale}/news`} className="site-link text-sm">
            {copy.common.viewMore}
          </SiteLink>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredNews.map((item) => (
            <SiteLink
              key={item.id}
              href={`/${locale}/news/${item.slug}`}
              className="site-panel rounded-[2rem] p-5 transition hover:border-[rgba(226,184,87,0.28)]"
            >
              <img src={item.thumbnailUrl} alt={getLocalizedText(item.title, locale)} className="h-44 w-full rounded-2xl border border-[rgba(207,196,182,0.42)] object-cover" />
              <p
                className={`${newsCategoryTone(item.category)} mt-4 inline-flex rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]`}
              >
                {item.category}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
                {getLocalizedText(item.title, locale)}
              </h3>
              <p className="site-muted mt-3 text-sm leading-7">
                {excerpt(getLocalizedText(item.summary, locale), 90)}
              </p>
            </SiteLink>
          ))}
        </div>
      </section>

      <section className="site-section-faq mx-auto max-w-7xl space-y-6 rounded-[2.5rem] px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <div>
              <p className="site-kicker text-xs uppercase tracking-[0.24em]">{copy.common.faq}</p>
              <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
                {locale === "ja" ? "よくある質問" : "Frequently Asked Questions"}
              </h2>
            </div>
            <FaqAccordion locale={locale} faqs={featuredFaqs} />
          </div>
          <aside className="site-panel-social space-y-5 rounded-[2rem] p-6">
            <div>
              <p className="site-kicker text-xs uppercase tracking-[0.24em]">Social</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                {locale === "ja" ? "SNS / ハッシュタグ導線" : "Social Hashtags"}
              </h3>
            </div>
            <p className="site-muted text-sm leading-7">
              {locale === "ja"
                ? "イベント感想や告知拡散には公式ハッシュタグを利用できます。ニュースやガイドラインも併せて確認してください。"
                : "Use the official hashtags for reactions and promotion. Pair them with the latest news and guidelines."}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {event.hashtags.map((tag) => (
                <span key={tag} className="site-tag rounded-full px-3 py-1 text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <SiteLink
              href={`/${locale}/guidelines`}
              className="site-outline-action inline-flex rounded-full px-4 py-2 text-sm font-semibold"
            >
              {locale === "ja" ? "投稿ガイドを見る" : "View posting guide"}
            </SiteLink>
          </aside>
        </div>
      </section>
    </div>
  );
}
