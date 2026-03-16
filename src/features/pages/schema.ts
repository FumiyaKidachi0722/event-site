import { z } from "zod";

export const pageSchema = z.object({
  id: z.string(),
  key: z.enum(["about", "ticket", "guidelines"]),
  title: z.object({ ja: z.string().min(1), en: z.string().optional() }),
  body: z.object({ ja: z.string().min(1), en: z.string().optional() }),
});
