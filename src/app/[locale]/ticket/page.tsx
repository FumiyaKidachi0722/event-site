import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { RichText } from "@/components/public/rich-text";
import { TrackableLink } from "@/components/ui/trackable-link";
import { getPublicSnapshot } from "@/lib/content/repository";
import { getLocalizedText, getUiCopy, isLocale } from "@/lib/i18n";
import { phasePrimaryAction } from "@/lib/utils";

export default async function TicketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  const page = snapshot.pages.find((item) => item.key === "ticket");
  if (!page) {
    notFound();
  }
  const copy = getUiCopy(locale);

  return (
    <PageShell
      locale={locale}
      eyebrow="Ticket"
      title={locale === "ja" ? "視聴 / チケット案内" : "Ticket / Watch Guide"}
      description={getLocalizedText(snapshot.event.summary, locale)}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="site-panel rounded-[2rem] p-6">
            <RichText value={getLocalizedText(page.body, locale)} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="site-panel-elevated rounded-[2rem] p-6">
              <p className="site-kicker text-xs tracking-[0.24em] uppercase">
                {copy.phaseLabel[snapshot.event.phase]}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">
                {phasePrimaryAction(snapshot.event.phase, locale)}
              </h2>
              <p className="site-muted mt-3 text-sm leading-7">
                {locale === "ja"
                  ? "開催フェーズに応じて、チケット購入・視聴・アーカイブ案内を切り替えています。"
                  : "Calls to action change automatically depending on whether the event is before, live, or after."}
              </p>
            </div>
            <div className="site-panel-warm rounded-[2rem] p-6">
              <p className="site-kicker text-xs tracking-[0.24em] uppercase">
                {locale === "ja" ? "外部導線" : "External Flow"}
              </p>
              <p className="site-muted mt-3 text-sm leading-7">
                {locale === "ja"
                  ? "購入・視聴は外部プラットフォームを想定し、サイト内では案内と更新導線を整理しています。"
                  : "Purchase and viewing are assumed to happen on an external platform while this site organizes guidance and updates."}
              </p>
            </div>
          </div>
        </div>
        <aside className="site-panel-elevated space-y-4 rounded-[2rem] p-6">
          <TrackableLink
            href={snapshot.event.primaryCta.url}
            target="_blank"
            rel="noreferrer"
            eventName={snapshot.event.phase === "before" ? "ticket_cta_click" : "watch_cta_click"}
            className="site-cta-primary inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
          >
            {phasePrimaryAction(snapshot.event.phase, locale)}
          </TrackableLink>
          <TrackableLink
            href={snapshot.event.secondaryCta.url}
            target="_blank"
            rel="noreferrer"
            eventName="watch_cta_click"
            className="site-outline-action inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold"
          >
            {getLocalizedText(snapshot.event.secondaryCta.label, locale)}
          </TrackableLink>
        </aside>
      </div>
    </PageShell>
  );
}
