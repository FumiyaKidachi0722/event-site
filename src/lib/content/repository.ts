import {
  deleteCollectionDocument,
  getAdminDoc,
  getEventDocument,
  getEventDocumentAdmin,
  listAdminCollection,
  listPublishedCollection,
  lookupFirebaseUser,
  saveCollectionDocument,
  saveEventDocument,
  type FirebaseCollections,
} from "@/lib/content/firebase-rest";
import {
  readDatabase,
  removeBundleItem,
  upsertBundleItem,
  withEventBundle,
  writeDatabase,
} from "@/lib/content/local-store";
import { isFirebaseEnabled } from "@/lib/env";
import { sortByDateDesc, sortByOrder } from "@/lib/utils";
import type {
  AdminDoc,
  EventDoc,
  FaqDoc,
  NewsDoc,
  PageDoc,
  SessionDoc,
  StageDoc,
  TalentDoc,
} from "@/types/content";

export async function getPublicContent() {
  if (isFirebaseEnabled()) {
    const [event, news, talents, sessions, faqs, pages, stages] = await Promise.all([
      getEventDocument(),
      listPublishedCollection<NewsDoc>("news"),
      listPublishedCollection<TalentDoc>("talents"),
      listPublishedCollection<SessionDoc>("sessions"),
      listPublishedCollection<FaqDoc>("faqs"),
      listPublishedCollection<PageDoc>("pages"),
      listPublishedCollection<StageDoc>("stages"),
    ]);

    return {
      event,
      news: sortByDateDesc(news),
      talents: sortByOrder(talents),
      sessions: sortByOrder(sessions),
      faqs: sortByOrder(faqs),
      pages,
      stages: sortByOrder(stages),
    };
  }

  return withEventBundle(async (_, bundle) => ({
    event: bundle.event,
    news: sortByDateDesc(bundle.news.filter((item) => item.status === "published")),
    talents: sortByOrder(bundle.talents.filter((item) => item.status === "published")),
    sessions: sortByOrder(bundle.sessions.filter((item) => item.status === "published")),
    faqs: sortByOrder(bundle.faqs.filter((item) => item.status === "published")),
    pages: bundle.pages.filter((item) => item.status === "published"),
    stages: sortByOrder(bundle.stages.filter((item) => item.status === "published")),
  }));
}

export async function getPublicSnapshot() {
  return getPublicContent();
}

export async function getAdminSnapshot(idToken?: string) {
  if (isFirebaseEnabled()) {
    if (!idToken) {
      throw new Error("Missing Firebase ID token.");
    }

    const [event, news, talents, sessions, faqs, pages, stages] = await Promise.all([
      getEventDocumentAdmin(idToken),
      listAdminCollection<NewsDoc>("news", idToken),
      listAdminCollection<TalentDoc>("talents", idToken),
      listAdminCollection<SessionDoc>("sessions", idToken),
      listAdminCollection<FaqDoc>("faqs", idToken),
      listAdminCollection<PageDoc>("pages", idToken),
      listAdminCollection<StageDoc>("stages", idToken),
    ]);

    return {
      event,
      news: sortByDateDesc(news),
      talents: sortByOrder(talents),
      sessions: sortByOrder(sessions),
      faqs: sortByOrder(faqs),
      pages,
      stages: sortByOrder(stages),
    };
  }

  return withEventBundle(async (_, bundle) => ({
    event: bundle.event,
    news: sortByDateDesc(bundle.news),
    talents: sortByOrder(bundle.talents),
    sessions: sortByOrder(bundle.sessions),
    faqs: sortByOrder(bundle.faqs),
    pages: bundle.pages,
    stages: sortByOrder(bundle.stages),
  }));
}

export async function requireAdmin(idToken?: string) {
  if (isFirebaseEnabled()) {
    if (!idToken) {
      throw new Error("Unauthorized");
    }

    const user = await lookupFirebaseUser(idToken);
    if (!user?.localId) {
      throw new Error("Unauthorized");
    }

    const admin = await getAdminDoc(user.localId, idToken);
    return {
      uid: user.localId,
      email: user.email,
      name: user.displayName || admin.name,
      role: admin.role,
    } as AdminDoc;
  }

  if (!idToken?.startsWith("demo:")) {
    throw new Error("Unauthorized");
  }

  const uid = idToken.replace("demo:", "");
  const database = await readDatabase();
  const admin = database.admins.find((entry) => entry.uid === uid);

  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}

export async function saveAdminEvent(event: EventDoc, idToken?: string) {
  if (isFirebaseEnabled()) {
    return saveEventDocument(event, idToken ?? "");
  }

  const database = await readDatabase();
  database.events[database.currentEventId].event = event;
  await writeDatabase(database);
  return event;
}

export async function saveAdminCollectionItem<K extends keyof FirebaseCollections>(
  key: K,
  item: FirebaseCollections[K],
  idToken?: string,
) {
  if (isFirebaseEnabled()) {
    return saveCollectionDocument(key, item, idToken ?? "");
  }

  await upsertBundleItem(key, item);
  return item;
}

export async function deleteAdminCollectionItem<K extends keyof FirebaseCollections>(
  key: K,
  id: string,
  idToken?: string,
) {
  if (isFirebaseEnabled()) {
    await deleteCollectionDocument(key, id, idToken ?? "");
    return;
  }

  await removeBundleItem(key, id);
}
