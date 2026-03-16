import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

import { getFirebaseConfig, isFirebaseEnabled } from "@/lib/env";

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseEnabled()) {
    return null;
  }

  const config = getFirebaseConfig();

  if (!config.apiKey || !config.projectId || !config.appId) {
    return null;
  }

  return getApps().length ? getApp() : initializeApp(config);
}
