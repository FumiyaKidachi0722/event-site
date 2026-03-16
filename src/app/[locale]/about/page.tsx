import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { RichText } from "@/components/public/rich-text";
import { SiteLink } from "@/components/ui/site-link";
import { getPublicSnapshot } from "@/lib/content/repository";
import { getLocalizedText, isLocale } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  const page = snapshot.pages.find((item) => item.key === "about");

  if (!page) {
    notFound();
  }

  return (
    <PageShell
      locale={locale}
      eyebrow="About"
      title={getLocalizedText(page.title, locale)}
      description={getLocalizedText(snapshot.event.summary, locale)}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="site-panel rounded-[2rem] p-6">
          <RichText value={getLocalizedText(page.body, locale)} />
        </div>
        <aside className="site-panel-elevated space-y-4 rounded-[2rem] p-6">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            {locale === "ja" ? "関連導線" : "Related Links"}
          </h2>
          <SiteLink
            href={`/${locale}/news`}
            className="site-outline-action block rounded-2xl px-4 py-3"
          >
            {locale === "ja" ? "関連ニュースを見る" : "Open related news"}
          </SiteLink>
          <SiteLink
            href={`/${locale}/ticket`}
            className="site-outline-action block rounded-2xl px-4 py-3"
          >
            {locale === "ja" ? "チケット情報へ" : "Go to ticket guide"}
          </SiteLink>
        </aside>
      </div>
    </PageShell>
  );
}
