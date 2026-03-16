"use client";

import { readAdminSession } from "@/lib/auth/admin-session";
import type {
  EventDoc,
  FaqDoc,
  NewsDoc,
  PageDoc,
  SessionDoc,
  StageDoc,
  TalentDoc,
} from "@/types/content";

export type AdminSnapshot = {
  event: EventDoc;
  news: NewsDoc[];
  talents: TalentDoc[];
  sessions: SessionDoc[];
  faqs: FaqDoc[];
  pages: PageDoc[];
  stages: StageDoc[];
};

async function request<T>(input: string, init?: RequestInit) {
  const session = readAdminSession();
  const headers = new Headers(init?.headers);

  if (session?.token) {
    headers.set("Authorization", `Bearer ${session.token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error((await response.text()) || "Request failed");
  }

  return (await response.json()) as T;
}

export function fetchAdminMe() {
  return request<{ admin: { uid: string; name: string; email: string; role: "owner" | "editor" } }>(
    "/api/admin/me",
  );
}

export function fetchAdminSnapshot() {
  return request<AdminSnapshot>("/api/admin/settings");
}

export function saveSettings(event: EventDoc) {
  return request<EventDoc>("/api/admin/settings", {
    method: "PATCH",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function fetchCollection<T>(path: string) {
  return request<T>(path);
}

export function saveCollectionItem<T>(path: string, item: T, method = "PUT") {
  return request<T>(path, {
    method,
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function deleteCollectionItem(path: string) {
  return request<{ ok: boolean }>(path, { method: "DELETE" });
}
