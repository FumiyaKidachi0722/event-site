"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Card, Label, Select, TextArea, TextInput } from "@/components/admin/form-fields";
import { fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { createEmptyPage } from "@/lib/content/defaults";
import { validatePage } from "@/lib/validation";
import type { PageDoc } from "@/types/content";

export default function AdminPageEditor({ params }: { params: Promise<{ key: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<PageDoc | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    params
      .then(async ({ key }) => {
        const allowed = ["about", "ticket", "guidelines"] as const;
        if (!allowed.includes(key as (typeof allowed)[number])) {
          throw new Error("Invalid page key.");
        }
        const pages = await fetchCollection<PageDoc[]>("/api/admin/pages");
        setItem(pages.find((page) => page.key === key) ?? createEmptyPage(key as PageDoc["key"]));
      })
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load page.");
      });
  }, [params]);

  return (
    <AdminShell
      title="Page Editor"
      description="Edit fixed public pages such as About, Ticket, and Guidelines."
    >
      {!item ? (
        <Card>{error || "Loading page..."}</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const errors = validatePage(item);
            if (errors.length) {
              setError(errors.join(" "));
              return;
            }
            await saveCollectionItem(`/api/admin/pages/${item.key}`, item);
            router.refresh();
          }}
        >
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
          </Card>
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Body (ja)">
              <TextArea
                className="min-h-80"
                value={item.body.ja}
                onChange={(e) => setItem({ ...item, body: { ...item.body, ja: e.target.value } })}
              />
            </Label>
            <Label title="Body (en)">
              <TextArea
                className="min-h-80"
                value={item.body.en || ""}
                onChange={(e) => setItem({ ...item, body: { ...item.body, en: e.target.value } })}
              />
            </Label>
          </Card>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save page
            </button>
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
