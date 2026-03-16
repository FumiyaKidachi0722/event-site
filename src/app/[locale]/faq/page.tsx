import { notFound } from "next/navigation";

import { FaqAccordion } from "@/components/public/faq-accordion";
import { PageShell } from "@/components/public/page-shell";
import { getPublicSnapshot } from "@/lib/content/repository";
import { isLocale } from "@/lib/i18n";

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();

  return (
    <PageShell
      locale={locale}
      eyebrow="FAQ"
      title="FAQ"
      description={
        locale === "ja"
          ? "チケット、視聴、ルールに関する質問をカテゴリ別に確認できます。"
          : "Find ticket, streaming, and rule-related answers by category."
      }
    >
      <FaqAccordion locale={locale} faqs={snapshot.faqs} />
    </PageShell>
  );
}
