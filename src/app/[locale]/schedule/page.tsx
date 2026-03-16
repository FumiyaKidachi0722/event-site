import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { ScheduleExplorer } from "@/components/public/schedule-explorer";
import { getPublicSnapshot } from "@/lib/content/repository";
import { isLocale } from "@/lib/i18n";

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();

  return (
    <PageShell
      locale={locale}
      eyebrow="Schedule"
      title={locale === "ja" ? "スケジュール" : "Schedule"}
      description={
        locale === "ja"
          ? "日別タブと軽いフィルタで、スマートフォンでも追いやすいタイムテーブルにしています。"
          : "A mobile-friendly timetable with day tabs and lightweight filters."
      }
    >
      <ScheduleExplorer
        locale={locale}
        sessions={snapshot.sessions}
        talents={snapshot.talents}
        stages={snapshot.stages}
      />
    </PageShell>
  );
}
