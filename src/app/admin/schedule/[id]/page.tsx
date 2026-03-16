"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Card, Label, Select, TextArea, TextInput } from "@/components/admin/form-fields";
import { fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { createEmptySession } from "@/lib/content/defaults";
import { findOverlappingSessions } from "@/lib/schedule";
import { validateSession } from "@/lib/validation";
import type { SessionDoc, StageDoc, TalentDoc } from "@/types/content";

export default function AdminSessionEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<SessionDoc | null>(null);
  const [talents, setTalents] = useState<TalentDoc[]>([]);
  const [stages, setStages] = useState<StageDoc[]>([]);
  const [existingSessions, setExistingSessions] = useState<SessionDoc[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    params
      .then(async ({ id }) => {
        const [talentData, stageData, sessionData] = await Promise.all([
          fetchCollection<TalentDoc[]>("/api/admin/talents"),
          fetchCollection<StageDoc[]>("/api/admin/stages"),
          fetchCollection<SessionDoc[]>("/api/admin/schedule"),
        ]);
        setTalents(talentData);
        setStages(stageData);
        setExistingSessions(sessionData);

        if (id === "new-entry") {
          setItem(createEmptySession());
          return;
        }
        setItem(await fetchCollection<SessionDoc>(`/api/admin/schedule/${id}`));
      })
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load session.");
      });
  }, [params]);

  const overlaps = useMemo(
    () => (item ? findOverlappingSessions(existingSessions, item) : []),
    [existingSessions, item],
  );

  return (
    <AdminShell
      title="Session Editor"
      description="Edit schedule entries with overlap warnings for the same stage and day."
    >
      {!item ? (
        <Card>{error || "Loading editor..."}</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const errors = validateSession(item);
            if (errors.length) {
              setError(errors.join(" "));
              return;
            }
            await saveCollectionItem(`/api/admin/schedule/${item.id}`, item);
            router.replace(`/admin/schedule/${item.id}`);
          }}
        >
          {overlaps.length ? (
            <Card className="border-amber-400/30 bg-amber-400/10">
              Warning: overlapping session(s) detected on the same stage and time slot.
            </Card>
          ) : null}
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Title (ja)">
              <TextInput
                value={item.title.ja}
                onChange={(e) => setItem({ ...item, title: { ...item.title, ja: e.target.value } })}
              />
            </Label>
            <Label title="Title (en)">
              <TextInput
                value={item.title.en || ""}
                onChange={(e) => setItem({ ...item, title: { ...item.title, en: e.target.value } })}
              />
            </Label>
            <Label title="Description (ja)">
              <TextArea
                value={item.description.ja}
                onChange={(e) =>
                  setItem({ ...item, description: { ...item.description, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Description (en)">
              <TextArea
                value={item.description.en || ""}
                onChange={(e) =>
                  setItem({ ...item, description: { ...item.description, en: e.target.value } })
                }
              />
            </Label>
            <Label title="Day Key">
              <Select
                value={item.dayKey}
                onChange={(e) => setItem({ ...item, dayKey: e.target.value })}
              >
                <option value="day1">day1</option>
                <option value="day2">day2</option>
              </Select>
            </Label>
            <Label title="Stage">
              <Select
                value={item.stageId}
                onChange={(e) => setItem({ ...item, stageId: e.target.value })}
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name.ja}
                  </option>
                ))}
              </Select>
            </Label>
            <Label title="Start At">
              <TextInput
                type="datetime-local"
                value={item.startAt.slice(0, 16)}
                onChange={(e) =>
                  setItem({ ...item, startAt: new Date(e.target.value).toISOString() })
                }
              />
            </Label>
            <Label title="End At">
              <TextInput
                type="datetime-local"
                value={item.endAt.slice(0, 16)}
                onChange={(e) =>
                  setItem({ ...item, endAt: new Date(e.target.value).toISOString() })
                }
              />
            </Label>
            <Label title="Watch URL">
              <TextInput
                value={item.watchUrl}
                onChange={(e) => setItem({ ...item, watchUrl: e.target.value })}
              />
            </Label>
            <Label title="Status">
              <Select
                value={item.status}
                onChange={(e) =>
                  setItem({ ...item, status: e.target.value as "draft" | "published" })
                }
              >
                <option value="draft">draft</option>
                <option value="published">published</option>
              </Select>
            </Label>
            <Label title="Tags">
              <TextInput
                value={item.tags.join(", ")}
                onChange={(e) =>
                  setItem({
                    ...item,
                    tags: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Label>
            <Label title="Sort Order">
              <TextInput
                type="number"
                value={String(item.sortOrder)}
                onChange={(e) => setItem({ ...item, sortOrder: Number(e.target.value) })}
              />
            </Label>
            <Label title="Talents">
              <Select
                multiple
                value={item.talentIds}
                onChange={(e) =>
                  setItem({
                    ...item,
                    talentIds: Array.from(e.target.selectedOptions).map((option) => option.value),
                  })
                }
                className="min-h-48"
              >
                {talents.map((talent) => (
                  <option key={talent.id} value={talent.id}>
                    {talent.name.ja}
                  </option>
                ))}
              </Select>
            </Label>
          </Card>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save session
            </button>
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
