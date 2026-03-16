export default function Loading() {
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-[rgba(247,243,236,0.92)] backdrop-blur-md" />
      <div className="absolute inset-x-0 top-0 h-1 overflow-hidden bg-[rgba(234,217,167,0.45)]">
        <div className="site-route-loading-bar h-full w-1/3 rounded-full bg-[linear-gradient(90deg,var(--accent-teal),var(--accent-gold),var(--accent-orange))]" />
      </div>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="site-panel-social flex items-center gap-4 rounded-full px-5 py-3 shadow-[0_18px_40px_rgba(23,25,34,0.1)]">
          <span className="site-route-loading-spinner h-9 w-9 rounded-full border-2 border-[rgba(99,184,176,0.2)] border-t-[var(--accent-teal)] border-r-[var(--accent-gold)]" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Loading</p>
            <p className="site-label text-xs uppercase tracking-[0.18em]">Preparing next page</p>
          </div>
        </div>
      </div>
    </div>
  );
}
