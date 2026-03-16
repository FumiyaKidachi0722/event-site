import { getStorage } from "firebase/storage";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFirebaseStorage() {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}
