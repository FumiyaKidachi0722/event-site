import { markdownToHtml } from "@/lib/markdown";

export function RichText({ value }: { value: string }) {
  return (
    <div
      className="prose prose-invert max-w-none prose-a:text-[var(--accent-gold)] prose-strong:text-[var(--text-primary)] prose-li:marker:text-[var(--accent-amber)]"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
    />
  );
}
