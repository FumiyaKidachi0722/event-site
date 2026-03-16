import { z } from "zod";

export const talentSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  name: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  shortBio: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  fullBio: z.object({ ja: z.string().min(1), en: z.string().optional() }),
});
