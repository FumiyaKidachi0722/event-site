"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge, Card } from "@/components/admin/form-fields";
import { fetchCollection } from "@/lib/admin-api";
import type { FaqDoc } from "@/types/content";

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqDoc[]>([]);

  useEffect(() => {
    fetchCollection<FaqDoc[]>("/api/admin/faqs").then(setItems);
  }, []);

  return (
    <AdminShell
      title="FAQs"
      description="Manage FAQ categories, multilingual answers, order, and publication state."
    >
      <div className="flex justify-end">
        <Link
          href="/admin/faqs/new-entry"
          className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          New FAQ
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{item.category}</Badge>
                <Badge>{item.status}</Badge>
              </div>
              <h2 className="mt-3 text-xl font-semibold">{item.question.ja}</h2>
            </div>
            <Link
              href={`/admin/faqs/${item.id}`}
              className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-cyan-200/60"
            >
              Edit
            </Link>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
