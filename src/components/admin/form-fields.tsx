"use client";

import { Badge as UiBadge } from "@/components/ui/badge";
import { Card as UiCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { translationCompletionScore } from "@/lib/validation";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <UiCard className={cn("p-6", className)}>{children}</UiCard>;
}

export function Label({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-100">{title}</span>
        {description ? <span className="text-xs text-slate-400">{description}</span> : null}
      </div>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <Input {...props} className={cn(props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Textarea {...props} className={cn(props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white",
        props.className,
      )}
    />
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return <UiBadge>{children}</UiBadge>;
}

export function TranslationMeter({ ja, en }: { ja?: string; en?: string }) {
  const score = translationCompletionScore({ ja, en });
  return <span className="text-xs text-slate-400">Translation {score}%</span>;
}
