import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

export async function POST() {
  const root = process.cwd();
  const source = path.join(root, "data", "mock-db.seed.json");
  const target = path.join(root, "data", "mock-db.json");

  const raw = await readFile(source, "utf8");
  await writeFile(target, raw, "utf8");

  return NextResponse.json({ ok: true });
}
