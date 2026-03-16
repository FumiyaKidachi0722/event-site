import { AdminLoginPanel } from "@/components/admin/admin-login-panel";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(80,210,215,0.18),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0.03))] p-10">
          <p className="text-xs tracking-[0.28em] text-cyan-200 uppercase">Admin Login</p>
          <h1 className="font-display mt-4 text-4xl font-semibold">AstraFlow Operations Console</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">
            The current portfolio build runs entirely on local mock data so it can be reviewed
            without Firebase setup. Public pages and admin updates both use the same seeded content.
          </p>
        </section>
        <AdminLoginPanel />
      </div>
    </div>
  );
}
