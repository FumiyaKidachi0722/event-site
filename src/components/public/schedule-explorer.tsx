"use client";

import { useMemo, useState } from "react";

import { FilterSelect } from "@/components/public/filter-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trackEvent } from "@/lib/analytics";
import { formatDateTime, getLocalizedText } from "@/lib/i18n";
import type { Locale, SessionDoc, StageDoc, TalentDoc } from "@/types/content";

type Props = {
  locale: Locale;
  sessions: SessionDoc[];
  talents: TalentDoc[];
  stages: StageDoc[];
};

export function ScheduleExplorer({ locale, sessions, talents, stages }: Props) {
  const dayKeys = Array.from(new Set(sessions.map((session) => session.dayKey)));
  const [dayKey, setDayKey] = useState(dayKeys[0] ?? "day1");
  const [stageFilter, setStageFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const stageMap = new Map(stages.map((stage) => [stage.id, stage]));
  const talentMap = new Map(talents.map((talent) => [talent.id, talent]));
  const tags = Array.from(new Set(sessions.flatMap((session) => session.tags)));

  const filtered = useMemo(
    () =>
      sessions.filter((session) => {
        if (session.dayKey !== dayKey) {
          return false;
        }
        if (stageFilter !== "all" && session.stageId !== stageFilter) {
          return false;
        }
        if (tagFilter !== "all" && !session.tags.includes(tagFilter)) {
          return false;
        }
        return true;
      }),
    [dayKey, sessions, stageFilter, tagFilter],
  );

  const stageOptions = [
    { label: "All stages", value: "all" },
    ...stages.map((stage) => ({
      label: getLocalizedText(stage.name, locale),
      value: stage.id,
    })),
  ];
  const tagOptions = [
    { label: "All tags", value: "all" },
    ...tags.map((tag) => ({ label: tag, value: tag })),
  ];
  const badgeVariants = ["secondary", "outline", "default"] as const;

  return (
    <div className="space-y-5">
      <Tabs value={dayKey} onValueChange={setDayKey}>
        <TabsList>
          {dayKeys.map((key) => (
            <TabsTrigger key={key} value={key}>
              {key.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-2">
          <span className="site-label text-xs uppercase tracking-[0.24em]">Stage</span>
          <FilterSelect
            value={stageFilter}
            onValueChange={(value) => {
              setStageFilter(value);
              trackEvent("schedule_filter_use", { filter: "stage", value });
            }}
            placeholder="All stages"
            options={stageOptions}
            triggerClassName="w-full"
            contentClassName="w-[var(--radix-select-trigger-width)]"
          />
        </label>
        <label className="space-y-2">
          <span className="site-label text-xs uppercase tracking-[0.24em]">Tag</span>
          <FilterSelect
            value={tagFilter}
            onValueChange={(value) => {
              setTagFilter(value);
              trackEvent("schedule_filter_use", { filter: "tag", value });
            }}
            placeholder="All tags"
            options={tagOptions}
            triggerClassName="w-full"
            contentClassName="w-[var(--radix-select-trigger-width)]"
          />
        </label>
      </div>
      <div className="space-y-4">
        {filtered.map((session) => {
          const stage = stageMap.get(session.stageId);
          const lineup = session.talentIds
            .map((id) => talentMap.get(id))
            .filter(Boolean)
            .map((talent) => getLocalizedText(talent!.name, locale));

          return (
            <Card key={session.id} className="grid gap-4 p-5 md:grid-cols-[180px_1fr_auto]">
              <CardContent className="contents">
                <div>
                  <p className="site-time text-sm font-semibold">
                    {formatDateTime(session.startAt, locale)}
                  </p>
                  <p className="site-label text-sm">
                    {formatDateTime(session.endAt, locale)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="site-label text-xs uppercase tracking-[0.24em]">
                    {stage ? getLocalizedText(stage.name, locale) : session.stageId}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {getLocalizedText(session.title, locale)}
                  </h3>
                  <p className="site-muted text-sm leading-7">
                    {getLocalizedText(session.description, locale)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lineup.map((name, index) => (
                      <Badge key={name} variant={badgeVariants[index % badgeVariants.length]}>
                        {name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild variant="outline">
                  <a href={session.watchUrl} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
