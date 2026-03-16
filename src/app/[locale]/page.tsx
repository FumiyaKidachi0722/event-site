import { notFound } from "next/navigation";

import { HomePage } from "@/components/public/home-page";
import { getPublicSnapshot } from "@/lib/content/repository";
import { isLocale } from "@/lib/i18n";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();
  return <HomePage locale={locale} {...snapshot} />;
}
