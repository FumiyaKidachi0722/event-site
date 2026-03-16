"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { writeAdminSession } from "@/lib/auth/admin-session";

export function AdminLoginPanel() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="space-y-3">
        <p className="text-sm leading-7 text-slate-300">
          This build runs on local mock data. Admin changes are written to
          <code className="mx-1 rounded bg-white/10 px-1.5 py-0.5 text-xs">data/mock-db.json</code>
          for now.
        </p>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            setError("");
            writeAdminSession({
              token: "demo:demo-admin",
              uid: "demo-admin",
              email: "producer@astraflow.test",
              name: "AstraFlow Producer",
              role: "owner",
              mode: "demo",
            });
            toast.success("Signed in with local demo session");
            router.replace("/admin");
          }}
          className="w-full"
        >
          Continue with mock data
        </Button>
      </div>
      {loading ? <p className="text-sm text-slate-400">Signing in...</p> : null}
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
    </div>
  );
}
