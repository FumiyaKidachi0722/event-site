"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { adminNavigation } from "@/config/admin";
import { fetchAdminMe } from "@/lib/admin-api";
import { clearAdminSession, readAdminSession } from "@/lib/auth/admin-session";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [adminName, setAdminName] = useState("");
  const currentSession = useMemo(() => readAdminSession(), []);
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (!currentSession) {
      router.replace("/admin/login");
      return;
    }

    fetchAdminMe()
      .then((result) => {
        setAdminName(result.admin.name);
        setReady(true);
      })
      .catch(() => {
        clearAdminSession();
        router.replace("/admin/login");
      });
  }, [currentSession, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300">
          Checking admin session...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] lg:px-8">
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
          <div className="border-b border-white/10 pb-4">
            <p className="font-display text-xl font-semibold">AstraFlow Admin</p>
            <p className="mt-2 text-sm text-slate-400">{adminName}</p>
          </div>
          <nav className="mt-4 space-y-2">
            {adminNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-2xl px-4 py-3 text-sm transition",
                  isActive(item.href)
                    ? "bg-cyan-300 text-slate-950"
                    : "text-slate-200 hover:bg-white/10",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              clearAdminSession();
              router.replace("/admin/login");
            }}
            className="mt-6 w-full"
          >
            Sign out
          </Button>
        </aside>
        <main className="space-y-6">
          <header className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h1 className="font-display text-3xl font-semibold">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
