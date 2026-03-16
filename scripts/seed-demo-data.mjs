import { cp } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

await cp(path.join(root, "data", "mock-db.seed.json"), path.join(root, "data", "mock-db.json"));

console.log("Seeded data/mock-db.json from data/mock-db.seed.json");
