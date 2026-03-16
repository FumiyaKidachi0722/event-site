"use client";

import { useMemo, useState } from "react";

import { FilterSelect } from "@/components/public/filter-select";
import { SiteLink } from "@/components/ui/site-link";
import { getLocalizedText } from "@/lib/i18n";
import type { Locale, TalentDoc } from "@/types/content";

export function TalentsBrowser({ locale, talents }: { locale: Locale; talents: TalentDoc[] }) {
  const units = Array.from(new Set(talents.map((talent) => talent.unit)));
  const days = Array.from(new Set(talents.flatMap((talent) => talent.appearanceDayKeys)));
  const [unitFilter, setUnitFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");

  const filtered = useMemo(
    () =>
      talents.filter((talent) => {
        if (unitFilter !== "all" && talent.unit !== unitFilter) {
          return false;
        }
        if (dayFilter !== "all" && !talent.appearanceDayKeys.includes(dayFilter)) {
          return false;
        }
        return true;
      }),
    [dayFilter, talents, unitFilter],
  );

  const unitOptions = [
    { label: "All units", value: "all" },
    ...units.map((unit) => ({ label: unit, value: unit })),
  ];
  const dayOptions = [
    { label: "All days", value: "all" },
    ...days.map((day) => ({ label: day.toUpperCase(), value: day })),
  ];
  const cardStyles = ["site-panel-violet", "site-panel-warm", "site-panel"];
  const unitStyles = ["site-chip-mint", "site-chip-champagne", "site-chip-berry"];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <FilterSelect
          value={unitFilter}
          onValueChange={setUnitFilter}
          placeholder="All units"
          options={unitOptions}
          triggerClassName="w-auto min-w-[11rem]"
        />
        <FilterSelect
          value={dayFilter}
          onValueChange={setDayFilter}
          placeholder="All days"
          options={dayOptions}
          triggerClassName="w-auto min-w-[11rem]"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((talent, index) => (
          <SiteLink
            key={talent.id}
            href={`/${locale}/talents/${talent.slug}`}
            className={`${cardStyles[index % cardStyles.length]} overflow-hidden rounded-[2rem] transition hover:-translate-y-1 hover:border-[rgba(226,184,87,0.28)]`}
          >
            <img src={talent.imageUrl} alt={getLocalizedText(talent.name, locale)} className="h-72 w-full object-cover" />
            <div className="space-y-3 p-5">
              <div className="flex flex-wrap gap-2">
                <span className={`${unitStyles[index % unitStyles.length]} rounded-full px-3 py-1 text-xs`}>
                  {talent.unit}
                </span>
                {talent.appearanceDayKeys.map((day) => (
                  <span key={day} className="site-tag-neutral rounded-full px-3 py-1 text-xs">
                    {day.toUpperCase()}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                {getLocalizedText(talent.name, locale)}
              </h2>
              <p className="site-muted text-sm leading-7">{getLocalizedText(talent.shortBio, locale)}</p>
            </div>
          </SiteLink>
        ))}
      </div>
    </div>
  );
}
