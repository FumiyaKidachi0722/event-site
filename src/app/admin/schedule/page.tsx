"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge, Card } from "@/components/admin/form-fields";
import { fetchCollection } from "@/lib/admin-api";
import type { SessionDoc } from "@/types/content";

export default function AdminSchedulePage() {
  const [items, setItems] = useState<SessionDoc[]>([]);

  useEffect(() => {
    fetchCollection<SessionDoc[]>("/api/admin/schedule").then(setItems);
  }, []);

  return (
    <AdminShell
      title="Schedule"
      description="Manage sessions, stage assignments, watch URLs, and timeline visibility."
    >
      <div className="flex justify-end">
        <Link
          href="/admin/schedule/new-entry"
          className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          New session
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold">{item.title.ja}</h2>
                <Badge>{item.dayKey}</Badge>
                <Badge>{item.stageId}</Badge>
                <Badge>{item.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                {new Date(item.startAt).toLocaleString()} - {new Date(item.endAt).toLocaleString()}
              </p>
            </div>
            <Link
              href={`/admin/schedule/${item.id}`}
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
