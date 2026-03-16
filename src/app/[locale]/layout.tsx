import { notFound } from "next/navigation";

import { PublicSiteLayout } from "@/components/public/public-site-layout";
import { getPublicSnapshot } from "@/lib/content/repository";
import { isLocale } from "@/lib/i18n";

import type { ReactNode } from "react";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const snapshot = await getPublicSnapshot();

  return (
    <PublicSiteLayout locale={locale} event={snapshot.event}>
      {children}
    </PublicSiteLayout>
  );
}

export function generateStaticParams() {
  return [{ locale: "ja" }, { locale: "en" }];
}
