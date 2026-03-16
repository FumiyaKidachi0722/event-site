import { z } from "zod";

export const localizedTextSchema = z.object({
  ja: z.string().min(1),
  en: z.string().optional(),
});

export const eventSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  status: z.enum(["draft", "published"]),
  phase: z.enum(["before", "live", "after"]),
  title: localizedTextSchema,
  subtitle: localizedTextSchema,
  summary: localizedTextSchema,
  startAt: z.string(),
  endAt: z.string(),
});
