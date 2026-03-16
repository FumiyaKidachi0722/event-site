import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  dayKey: z.string().min(1),
  stageId: z.string().min(1),
  title: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  description: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  startAt: z.string(),
  endAt: z.string(),
});
