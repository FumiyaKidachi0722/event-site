"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge, Card } from "@/components/admin/form-fields";
import { deleteCollectionItem, fetchCollection, saveCollectionItem } from "@/lib/admin-api";
import { newId } from "@/lib/content/defaults";
import type { NewsDoc } from "@/types/content";

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsDoc[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCollection<NewsDoc[]>("/api/admin/news")
      .then(setItems)
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load news.");
      });
  }, []);

  return (
    <AdminShell
      title="News"
      description="Manage multilingual news posts, publication state, and related content links."
    >
      {error ? <Card>{error}</Card> : null}
      <div className="flex justify-end">
        <Link
          href="/admin/news/new"
          className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          New article
        </Link>
      </div>
      <Card className="overflow-auto p-0">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-white/10 text-slate-400">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Published</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5">
                <td className="px-5 py-4">{item.title.ja}</td>
                <td className="px-5 py-4">{item.category}</td>
                <td className="px-5 py-4">
                  <Badge>{item.status}</Badge>
                </td>
                <td className="px-5 py-4">{new Date(item.publishedAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/news/${item.id}`}
                      className="rounded-full border border-white/10 px-3 py-1 hover:border-cyan-200/60"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        const clone: NewsDoc = {
                          ...item,
                          id: newId("news"),
                          slug: `${item.slug}-copy`,
                          title: { ...item.title, ja: `${item.title.ja} Copy` },
                          status: "draft",
                          createdAt: new Date().toISOString(),
                          updatedAt: new Date().toISOString(),
                        };
                        const saved = await saveCollectionItem(
                          `/api/admin/news/${clone.id}`,
                          clone,
                        );
                        setItems((current) => [saved, ...current]);
                      }}
                      className="rounded-full border border-white/10 px-3 py-1 hover:border-cyan-200/60"
                    >
                      Duplicate
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteCollectionItem(`/api/admin/news/${item.id}`);
                        setItems((current) => current.filter((entry) => entry.id !== item.id));
                      }}
                      className="rounded-full border border-rose-400/30 px-3 py-1 text-rose-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AdminShell>
  );
}
