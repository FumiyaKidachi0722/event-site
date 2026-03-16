"use client";

export type AdminSession = {
  token: string;
  uid: string;
  email: string;
  name: string;
  role: "owner" | "editor";
  mode: "demo" | "firebase";
};

const STORAGE_KEY = "astraflow-admin-session";

export function readAdminSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function writeAdminSession(session: AdminSession) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}
