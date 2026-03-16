"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge, Card } from "@/components/admin/form-fields";
import { fetchAdminSnapshot, type AdminSnapshot } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [snapshot, setSnapshot] = useState<AdminSnapshot | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminSnapshot()
      .then(setSnapshot)
      .catch((nextError) => {
        setError(nextError instanceof Error ? nextError.message : "Failed to load dashboard.");
      });
  }, []);

  return (
    <AdminShell
      title="Dashboard"
      description="Current event phase, content status, and frequently used operation links."
    >
      {error ? <Card>{error}</Card> : null}
      {!snapshot ? (
        <Card>Loading dashboard...</Card>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-4">
            <Card>
              <p className="text-sm text-slate-400">Event Phase</p>
              <p className="mt-3 text-3xl font-semibold">{snapshot.event.phase}</p>
            </Card>
            <Card>
              <p className="text-sm text-slate-400">Published News</p>
              <p className="mt-3 text-3xl font-semibold">
                {snapshot.news.filter((item) => item.status === "published").length}
              </p>
            </Card>
            <Card>
              <p className="text-sm text-slate-400">Draft Items</p>
              <p className="mt-3 text-3xl font-semibold">
                {
                  [
                    ...snapshot.news,
                    ...snapshot.talents,
                    ...snapshot.sessions,
                    ...snapshot.faqs,
                    ...snapshot.pages,
                  ].filter((item) => item.status === "draft").length
                }
              </p>
            </Card>
            <Card>
              <p className="text-sm text-slate-400">Last Update</p>
              <p className="mt-3 text-lg font-semibold">
                {new Date(snapshot.event.updatedAt).toLocaleString()}
              </p>
            </Card>
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <Card>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <div className="mt-4 grid gap-3">
                <Link
                  href="/admin/news/new"
                  className="rounded-2xl border border-white/10 px-4 py-3 hover:border-cyan-200/60"
                >
                  Add news post
                </Link>
                <Link
                  href="/admin/talents"
                  className="rounded-2xl border border-white/10 px-4 py-3 hover:border-cyan-200/60"
                >
                  Edit talents
                </Link>
                <Link
                  href="/admin/schedule"
                  className="rounded-2xl border border-white/10 px-4 py-3 hover:border-cyan-200/60"
                >
                  Edit schedule
                </Link>
                <Link
                  href="/admin/settings"
                  className="rounded-2xl border border-white/10 px-4 py-3 hover:border-cyan-200/60"
                >
                  Event settings
                </Link>
              </div>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold">Recent Updates</h2>
              <div className="mt-4 space-y-3">
                {snapshot.news.slice(0, 5).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{item.title.ja}</p>
                      <Badge>{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                      Updated {new Date(item.updatedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </AdminShell>
  );
}
