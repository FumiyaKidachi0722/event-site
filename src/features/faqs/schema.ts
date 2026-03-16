import { z } from "zod";

export const faqSchema = z.object({
  id: z.string(),
  category: z.string().min(1),
  question: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  answer: z.object({ ja: z.string().min(1), en: z.string().optional() }),
});
