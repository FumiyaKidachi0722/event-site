"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge, Card } from "@/components/admin/form-fields";
import { fetchCollection } from "@/lib/admin-api";
import type { TalentDoc } from "@/types/content";

export default function AdminTalentsPage() {
  const [items, setItems] = useState<TalentDoc[]>([]);

  useEffect(() => {
    fetchCollection<TalentDoc[]>("/api/admin/talents").then(setItems);
  }, []);

  return (
    <AdminShell
      title="Talents"
      description="Manage cast cards, profiles, links, sort order, and visibility."
    >
      <div className="flex justify-end">
        <Link
          href="/admin/talents/new-entry"
          className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          New talent
        </Link>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} className="grid gap-4 md:grid-cols-[88px_1fr_auto] md:items-center">
            <img
              src={item.imageUrl}
              alt={item.name.ja}
              className="h-22 w-22 rounded-2xl object-cover"
            />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold">{item.name.ja}</h2>
                <Badge>{item.unit}</Badge>
                <Badge>{item.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-400">Sort {item.sortOrder}</p>
            </div>
            <Link
              href={`/admin/talents/${item.id}`}
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
