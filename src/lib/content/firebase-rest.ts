import { fromFirestoreDocument, toFirestoreDocument } from "@/lib/content/firestore-format";
import { getEventId, getFirebaseConfig } from "@/lib/env";
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

const DATABASE = "(default)";

function getBasePath() {
  const { projectId, apiKey } = getFirebaseConfig();

  if (!projectId || !apiKey) {
    throw new Error("Firebase project env is incomplete.");
  }

  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${DATABASE}/documents`;
}

function getQueryString() {
  const { apiKey } = getFirebaseConfig();
  return `key=${encodeURIComponent(apiKey)}`;
}

async function firestoreRequest<T>({
  path,
  method = "GET",
  body,
  idToken,
}: {
  path: string;
  method?: string;
  body?: unknown;
  idToken?: string;
}) {
  const response = await fetch(`${getBasePath()}${path}?${getQueryString()}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Firestore request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

function collectionPath(collection: string, eventId = getEventId()) {
  return `/events/${eventId}/${collection}`;
}

export async function listPublishedCollection<T>(collection: string) {
  const data = await firestoreRequest<{
    documents?: Array<{ name: string; fields?: Record<string, unknown> }>;
  }>({
    path: collectionPath(collection),
  });

  return (data.documents ?? [])
    .map((doc) => fromFirestoreDocument<T>(doc as never))
    .filter((doc) => (doc as { status?: string }).status === "published");
}

export async function listAdminCollection<T>(collection: string, idToken: string) {
  const data = await firestoreRequest<{
    documents?: Array<{ name: string; fields?: Record<string, unknown> }>;
  }>({
    path: collectionPath(collection),
    idToken,
  });

  return (data.documents ?? []).map((doc) => fromFirestoreDocument<T>(doc as never));
}

export async function getEventDocument() {
  const data = await firestoreRequest<{ name: string; fields?: Record<string, unknown> }>({
    path: `/events/${getEventId()}`,
  });
  return fromFirestoreDocument<EventDoc>(data as never);
}

export async function getEventDocumentAdmin(idToken: string) {
  const data = await firestoreRequest<{ name: string; fields?: Record<string, unknown> }>({
    path: `/events/${getEventId()}`,
    idToken,
  });
  return fromFirestoreDocument<EventDoc>(data as never);
}

export async function saveEventDocument(event: EventDoc, idToken: string) {
  await firestoreRequest({
    path: `/events/${getEventId()}`,
    method: "PATCH",
    body: toFirestoreDocument(event),
    idToken,
  });
  return event;
}

export async function saveCollectionDocument<T extends { id: string }>(
  collection: string,
  item: T,
  idToken: string,
) {
  await firestoreRequest({
    path: `${collectionPath(collection)}/${item.id}`,
    method: "PATCH",
    body: toFirestoreDocument(item),
    idToken,
  });
  return item;
}

export async function deleteCollectionDocument(collection: string, id: string, idToken: string) {
  await firestoreRequest({
    path: `${collectionPath(collection)}/${id}`,
    method: "DELETE",
    idToken,
  });
}

export async function getAdminDoc(uid: string, idToken: string) {
  const data = await firestoreRequest<{ name: string; fields?: Record<string, unknown> }>({
    path: `/admins/${uid}`,
    idToken,
  });

  return fromFirestoreDocument<AdminDoc>(data as never);
}

export async function lookupFirebaseUser(idToken: string) {
  const { apiKey } = getFirebaseConfig();
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = (await response.json()) as {
    users?: Array<{ localId: string; email: string; displayName?: string }>;
  };

  return data.users?.[0] ?? null;
}

export type FirebaseCollections = {
  news: NewsDoc;
  talents: TalentDoc;
  sessions: SessionDoc;
  faqs: FaqDoc;
  pages: PageDoc;
  stages: StageDoc;
};
