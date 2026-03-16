import { notFound } from "next/navigation";

import { PageShell } from "@/components/public/page-shell";
import { RichText } from "@/components/public/rich-text";
import { getPublicSnapshot } from "@/lib/content/repository";
import { getLocalizedText, isLocale } from "@/lib/i18n";

export default async function GuidelinesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  const page = snapshot.pages.find((item) => item.key === "guidelines");
  if (!page) {
    notFound();
  }

  return (
    <PageShell
      locale={locale}
      eyebrow="Guidelines"
      title={locale === "ja" ? "注意事項" : "Guidelines"}
      description={
        locale === "ja"
          ? "視聴ルール、禁止事項、SNS 投稿ルールをまとめています。"
          : "Viewing rules, prohibited actions, and social posting guidance."
      }
    >
      <div className="site-panel rounded-[2rem] p-6">
        <RichText value={getLocalizedText(page.body, locale)} />
      </div>
    </PageShell>
  );
}
