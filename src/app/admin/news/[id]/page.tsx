"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import {
  Card,
  Label,
  Select,
  TextArea,
  TextInput,
  TranslationMeter,
} from "@/components/admin/form-fields";
import { fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { createEmptyNews } from "@/lib/content/defaults";
import { validateNews } from "@/lib/validation";
import type { NewsDoc, SessionDoc, TalentDoc } from "@/types/content";

export default function AdminNewsEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<NewsDoc | null>(null);
  const [talents, setTalents] = useState<TalentDoc[]>([]);
  const [sessions, setSessions] = useState<SessionDoc[]>([]);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    params
      .then(async ({ id }) => {
        const [talentData, sessionData] = await Promise.all([
          fetchCollection<TalentDoc[]>("/api/admin/talents"),
          fetchCollection<SessionDoc[]>("/api/admin/schedule"),
        ]);
        setTalents(talentData);
        setSessions(sessionData);
        if (id === "new-entry") {
          setItem(createEmptyNews());
          return;
        }
        const data = await fetchCollection<NewsDoc>(`/api/admin/news/${id}`);
        setItem(data);
      })
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load editor.");
      });
  }, [params]);

  return (
    <AdminShell
      title="News Editor"
      description="Edit title, summary, Markdown body, relations, and publication timing."
    >
      {!item ? (
        <Card>{error || "Loading editor..."}</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const { normalized, errors } = validateNews(item);
            if (errors.length) {
              setError(errors.join(" "));
              return;
            }
            await saveCollectionItem(`/api/admin/news/${normalized.id}`, normalized);
            setNotice("Saved.");
            setError("");
            router.replace(`/admin/news/${normalized.id}`);
          }}
        >
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label
              title="Title (ja)"
              description={<TranslationMeter ja={item.title.ja} en={item.title.en} />}
            >
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
            <Label title="Summary (ja)">
              <TextArea
                value={item.summary.ja}
                onChange={(e) =>
                  setItem({ ...item, summary: { ...item.summary, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Summary (en)">
              <TextArea
                value={item.summary.en || ""}
                onChange={(e) =>
                  setItem({ ...item, summary: { ...item.summary, en: e.target.value } })
                }
              />
            </Label>
            <Label title="Slug">
              <TextInput
                value={item.slug}
                onChange={(e) => setItem({ ...item, slug: e.target.value })}
              />
            </Label>
            <Label title="Thumbnail URL">
              <TextInput
                value={item.thumbnailUrl}
                onChange={(e) => setItem({ ...item, thumbnailUrl: e.target.value })}
              />
            </Label>
            <Label title="Category">
              <Select
                value={item.category}
                onChange={(e) =>
                  setItem({ ...item, category: e.target.value as NewsDoc["category"] })
                }
              >
                <option value="announcement">announcement</option>
                <option value="ticket">ticket</option>
                <option value="streaming">streaming</option>
                <option value="goods">goods</option>
                <option value="campaign">campaign</option>
                <option value="report">report</option>
              </Select>
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
            <Label title="Published At">
              <TextInput
                type="datetime-local"
                value={item.publishedAt.slice(0, 16)}
                onChange={(e) =>
                  setItem({ ...item, publishedAt: new Date(e.target.value).toISOString() })
                }
              />
            </Label>
            <Label title="Pinned">
              <Select
                value={String(item.pinned)}
                onChange={(e) => setItem({ ...item, pinned: e.target.value === "true" })}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </Select>
            </Label>
          </Card>
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Body (ja)">
              <TextArea
                value={item.body.ja}
                className="min-h-72"
                onChange={(e) => setItem({ ...item, body: { ...item.body, ja: e.target.value } })}
              />
            </Label>
            <Label title="Body (en)">
              <TextArea
                value={item.body.en || ""}
                className="min-h-72"
                onChange={(e) => setItem({ ...item, body: { ...item.body, en: e.target.value } })}
              />
            </Label>
          </Card>
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Related Talents">
              <Select
                multiple
                value={item.relatedTalentIds}
                onChange={(e) =>
                  setItem({
                    ...item,
                    relatedTalentIds: Array.from(e.target.selectedOptions).map(
                      (option) => option.value,
                    ),
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
            <Label title="Related Sessions">
              <Select
                multiple
                value={item.relatedSessionIds}
                onChange={(e) =>
                  setItem({
                    ...item,
                    relatedSessionIds: Array.from(e.target.selectedOptions).map(
                      (option) => option.value,
                    ),
                  })
                }
                className="min-h-48"
              >
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.title.ja}
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
              Save
            </button>
            <button
              type="button"
              onClick={async () => {
                const nextItem = { ...item, status: "draft" as const };
                await saveCollectionItem(`/api/admin/news/${nextItem.id}`, nextItem);
                setItem(nextItem);
                setNotice("Saved as draft.");
              }}
              className="rounded-full border border-white/10 px-5 py-3 text-sm"
            >
              Save draft
            </button>
            {notice ? <span className="text-sm text-emerald-300">{notice}</span> : null}
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
