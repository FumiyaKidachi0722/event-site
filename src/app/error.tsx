"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-10">
        <p className="text-xs tracking-[0.28em] text-cyan-200 uppercase">Error</p>
        <h1 className="font-display text-4xl font-semibold">Unexpected error</h1>
        <p className="text-sm leading-7 text-slate-300">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
