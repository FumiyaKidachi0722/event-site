import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-xs tracking-[0.28em] text-cyan-200 uppercase">404</p>
        <h1 className="font-display text-4xl font-semibold">Page not found</h1>
        <p className="text-sm leading-7 text-slate-300">
          The page does not exist or may have been moved. Use the main event page to continue.
        </p>
        <Link
          href="/ja"
          className="inline-flex rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Go to event top
        </Link>
      </div>
    </div>
  );
}
