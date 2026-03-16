import Script from "next/script";

import { AppToaster } from "@/components/ui/sonner";
import { getGaMeasurementId } from "@/lib/env";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AstraFlow Dimensions 2026",
    template: "%s | AstraFlow Dimensions 2026",
  },
  description:
    "A fictional VTuber event special site and admin dashboard built with Next.js for portfolio use.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = getGaMeasurementId();

  return (
    <html lang="ja">
      <body className="antialiased">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });`}
            </Script>
          </>
        ) : null}
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
