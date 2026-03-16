import { readDatabase } from "@/lib/content/local-store";

export async function getAdminAllowlist() {
  const database = await readDatabase();
  return database.admins;
}
