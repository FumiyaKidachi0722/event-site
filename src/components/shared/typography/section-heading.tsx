export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-[0.28em] text-cyan-200 uppercase">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold text-white">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
