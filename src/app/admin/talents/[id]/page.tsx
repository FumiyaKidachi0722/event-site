"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Card, Label, Select, TextArea, TextInput } from "@/components/admin/form-fields";
import { fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { createEmptyTalent } from "@/lib/content/defaults";
import { validateTalent } from "@/lib/validation";
import type { TalentDoc } from "@/types/content";

export default function AdminTalentEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<TalentDoc | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    params
      .then(async ({ id }) => {
        if (id === "new-entry") {
          setItem(createEmptyTalent());
          return;
        }
        const data = await fetchCollection<TalentDoc>(`/api/admin/talents/${id}`);
        setItem(data);
      })
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load talent.");
      });
  }, [params]);

  return (
    <AdminShell
      title="Talent Editor"
      description="Edit multilingual bios, social links, tags, and publication control."
    >
      {!item ? (
        <Card>{error || "Loading editor..."}</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const errors = validateTalent(item);
            if (errors.length) {
              setError(errors.join(" "));
              return;
            }
            await saveCollectionItem(`/api/admin/talents/${item.id}`, item);
            router.replace(`/admin/talents/${item.id}`);
          }}
        >
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Name (ja)">
              <TextInput
                value={item.name.ja}
                onChange={(e) => setItem({ ...item, name: { ...item.name, ja: e.target.value } })}
              />
            </Label>
            <Label title="Name (en)">
              <TextInput
                value={item.name.en || ""}
                onChange={(e) => setItem({ ...item, name: { ...item.name, en: e.target.value } })}
              />
            </Label>
            <Label title="Slug">
              <TextInput
                value={item.slug}
                onChange={(e) => setItem({ ...item, slug: e.target.value })}
              />
            </Label>
            <Label title="Unit">
              <TextInput
                value={item.unit}
                onChange={(e) => setItem({ ...item, unit: e.target.value })}
              />
            </Label>
            <Label title="Image URL">
              <TextInput
                value={item.imageUrl}
                onChange={(e) => setItem({ ...item, imageUrl: e.target.value })}
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
            <Label title="Sort Order">
              <TextInput
                type="number"
                value={String(item.sortOrder)}
                onChange={(e) => setItem({ ...item, sortOrder: Number(e.target.value) })}
              />
            </Label>
            <Label title="Appearance Days (comma separated)">
              <TextInput
                value={item.appearanceDayKeys.join(", ")}
                onChange={(e) =>
                  setItem({
                    ...item,
                    appearanceDayKeys: e.target.value
                      .split(",")
                      .map((v) => v.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Label>
            <Label title="X URL">
              <TextInput
                value={item.xUrl}
                onChange={(e) => setItem({ ...item, xUrl: e.target.value })}
              />
            </Label>
            <Label title="YouTube URL">
              <TextInput
                value={item.youtubeUrl}
                onChange={(e) => setItem({ ...item, youtubeUrl: e.target.value })}
              />
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
          </Card>
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Short Bio (ja)">
              <TextArea
                value={item.shortBio.ja}
                onChange={(e) =>
                  setItem({ ...item, shortBio: { ...item.shortBio, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Short Bio (en)">
              <TextArea
                value={item.shortBio.en || ""}
                onChange={(e) =>
                  setItem({ ...item, shortBio: { ...item.shortBio, en: e.target.value } })
                }
              />
            </Label>
            <Label title="Full Bio (ja)">
              <TextArea
                className="min-h-56"
                value={item.fullBio.ja}
                onChange={(e) =>
                  setItem({ ...item, fullBio: { ...item.fullBio, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Full Bio (en)">
              <TextArea
                className="min-h-56"
                value={item.fullBio.en || ""}
                onChange={(e) =>
                  setItem({ ...item, fullBio: { ...item.fullBio, en: e.target.value } })
                }
              />
            </Label>
          </Card>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save talent
            </button>
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
