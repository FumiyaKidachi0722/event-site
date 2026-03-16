import { getFirestore } from "firebase/firestore";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFirebaseFirestore() {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}
