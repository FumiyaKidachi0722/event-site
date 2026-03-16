"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Card, Label, Select, TextArea, TextInput } from "@/components/admin/form-fields";
import { fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { createEmptyFaq } from "@/lib/content/defaults";
import { validateFaq } from "@/lib/validation";
import type { FaqDoc } from "@/types/content";

export default function AdminFaqEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<FaqDoc | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    params
      .then(async ({ id }) => {
        if (id === "new-entry") {
          setItem(createEmptyFaq());
          return;
        }
        setItem(await fetchCollection<FaqDoc>(`/api/admin/faqs/${id}`));
      })
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load FAQ.");
      });
  }, [params]);

  return (
    <AdminShell title="FAQ Editor" description="Edit multilingual FAQ entries and sort order.">
      {!item ? (
        <Card>{error || "Loading editor..."}</Card>
      ) : (
        <form
          className="grid gap-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const errors = validateFaq(item);
            if (errors.length) {
              setError(errors.join(" "));
              return;
            }
            await saveCollectionItem(`/api/admin/faqs/${item.id}`, item);
            router.replace(`/admin/faqs/${item.id}`);
          }}
        >
          <Card className="grid gap-4 lg:grid-cols-2">
            <Label title="Category">
              <Select
                value={item.category}
                onChange={(e) =>
                  setItem({ ...item, category: e.target.value as FaqDoc["category"] })
                }
              >
                <option value="ticket">ticket</option>
                <option value="streaming">streaming</option>
                <option value="rules">rules</option>
                <option value="access">access</option>
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
            <Label title="Question (ja)">
              <TextInput
                value={item.question.ja}
                onChange={(e) =>
                  setItem({ ...item, question: { ...item.question, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Question (en)">
              <TextInput
                value={item.question.en || ""}
                onChange={(e) =>
                  setItem({ ...item, question: { ...item.question, en: e.target.value } })
                }
              />
            </Label>
            <Label title="Answer (ja)">
              <TextArea
                value={item.answer.ja}
                onChange={(e) =>
                  setItem({ ...item, answer: { ...item.answer, ja: e.target.value } })
                }
              />
            </Label>
            <Label title="Answer (en)">
              <TextArea
                value={item.answer.en || ""}
                onChange={(e) =>
                  setItem({ ...item, answer: { ...item.answer, en: e.target.value } })
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
          </Card>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
            >
              Save FAQ
            </button>
            {error ? <span className="text-sm text-rose-300">{error}</span> : null}
          </div>
        </form>
      )}
    </AdminShell>
  );
}
