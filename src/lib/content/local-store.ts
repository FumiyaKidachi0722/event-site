import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { getEventId } from "@/lib/env";
import type {
  EventBundle,
  EventDoc,
  FaqDoc,
  LocalDatabase,
  NewsDoc,
  PageDoc,
  SessionDoc,
  StageDoc,
  TalentDoc,
} from "@/types/content";

const DATA_PATH = path.join(process.cwd(), "data", "mock-db.json");
const SEED_PATH = path.join(process.cwd(), "data", "mock-db.seed.json");

async function ensureDatabase() {
  try {
    await readFile(DATA_PATH, "utf8");
  } catch {
    const seed = await readFile(SEED_PATH, "utf8");
    await writeFile(DATA_PATH, seed, "utf8");
  }
}

export async function readDatabase() {
  await ensureDatabase();
  const raw = await readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as LocalDatabase;
}

export async function writeDatabase(data: LocalDatabase) {
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
}

export async function withEventBundle<T>(
  callback: (database: LocalDatabase, bundle: EventBundle, eventId: string) => Promise<T> | T,
) {
  const database = await readDatabase();
  const eventId = database.currentEventId || getEventId();
  const bundle = database.events[eventId];

  if (!bundle) {
    throw new Error(`Event bundle not found for ${eventId}`);
  }

  return callback(database, bundle, eventId);
}

export async function updateEventBundle(updater: (bundle: EventBundle) => EventBundle) {
  const database = await readDatabase();
  const eventId = database.currentEventId || getEventId();
  const bundle = database.events[eventId];

  database.events[eventId] = updater(bundle);
  await writeDatabase(database);
  return database.events[eventId];
}

export type BundleCollectionMap = {
  news: NewsDoc;
  talents: TalentDoc;
  sessions: SessionDoc;
  faqs: FaqDoc;
  pages: PageDoc;
  stages: StageDoc;
};

export async function upsertBundleItem<K extends keyof BundleCollectionMap>(
  key: K,
  item: BundleCollectionMap[K],
) {
  return updateEventBundle((bundle) => {
    const collection = [...bundle[key]];
    const index = collection.findIndex((entry) => entry.id === item.id);

    if (index >= 0) {
      collection[index] = item;
    } else {
      collection.push(item);
    }

    return {
      ...bundle,
      [key]: collection,
      event: {
        ...bundle.event,
        updatedAt: new Date().toISOString(),
      } as EventDoc,
    };
  });
}

export async function removeBundleItem<K extends keyof BundleCollectionMap>(key: K, id: string) {
  return updateEventBundle((bundle) => ({
    ...bundle,
    [key]: bundle[key].filter((entry) => entry.id !== id),
    event: {
      ...bundle.event,
      updatedAt: new Date().toISOString(),
    },
  }));
}
