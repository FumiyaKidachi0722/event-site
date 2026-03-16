import { z } from "zod";

export const newsSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  title: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  summary: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  body: z.object({ ja: z.string().min(1), en: z.string().optional() }),
});
