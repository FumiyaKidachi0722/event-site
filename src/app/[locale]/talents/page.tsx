import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { TalentsBrowser } from "@/components/public/talents-browser";
import { getPublicSnapshot } from "@/lib/content/repository";
import { isLocale } from "@/lib/i18n";

export default async function TalentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();

  return (
    <PageShell
      locale={locale}
      eyebrow="Talents"
      title={locale === "ja" ? "出演者一覧" : "Talents"}
      description={
        locale === "ja"
          ? "ユニットや出演日をもとに、イベント全体の出演者を把握できます。"
          : "Browse the full cast by unit and appearance day."
      }
    >
      <TalentsBrowser locale={locale} talents={snapshot.talents} />
    </PageShell>
  );
}
