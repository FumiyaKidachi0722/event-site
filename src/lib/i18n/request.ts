import { routing } from "@/lib/i18n/routing";

export function resolveRequestLocale(locale: string) {
  return routing.locales.includes(locale as (typeof routing.locales)[number])
    ? (locale as (typeof routing.locales)[number])
    : routing.defaultLocale;
}
