import { requireAdmin } from "@/lib/content/repository";

export async function requireAdminGuard(token?: string) {
  return requireAdmin(token);
}
