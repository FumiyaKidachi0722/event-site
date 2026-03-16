import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { SiteLink } from "@/components/ui/site-link";
import { getPublicSnapshot } from "@/lib/content/repository";
import { formatDate, getLocalizedText, isLocale } from "@/lib/i18n";
import { newsCategoryTone } from "@/lib/utils";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();

  return (
    <PageShell
      locale={locale}
      eyebrow="News"
      title={locale === "ja" ? "ニュース一覧" : "News"}
      description={
        locale === "ja"
          ? "カテゴリ、公開日、サムネイル付きで最新情報を一覧表示します。"
          : "Browse recent updates by category with publication dates and thumbnails."
      }
    >
      <div className="space-y-5">
        {snapshot.news.map((item) => (
          <SiteLink
            key={item.id}
            href={`/${locale}/news/${item.slug}`}
            className="site-panel grid gap-5 rounded-[2rem] p-5 transition hover:border-[rgba(229,140,115,0.28)] md:grid-cols-[220px_1fr]"
          >
            <img
              src={item.thumbnailUrl}
              alt={getLocalizedText(item.title, locale)}
              className="h-full w-full rounded-2xl object-cover"
            />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`${newsCategoryTone(item.category)} rounded-full px-3 py-1 text-xs`}
                >
                  {item.category}
                </span>
                <span className="site-label text-sm">{formatDate(item.publishedAt, locale)}</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                {getLocalizedText(item.title, locale)}
              </h2>
              <p className="site-muted text-sm leading-7">
                {getLocalizedText(item.summary, locale)}
              </p>
            </div>
          </SiteLink>
        ))}
      </div>
    </PageShell>
  );
}
