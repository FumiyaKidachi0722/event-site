import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

import { getFirebaseApp } from "@/lib/firebase/client";

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error("Firebase Auth is not configured.");
  }

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, provider);
}

export async function getFirebaseIdToken() {
  const auth = getFirebaseAuth();
  const user = auth?.currentUser;
  if (!user) {
    return "";
  }

  return user.getIdToken();
}

export async function signOutFirebase() {
  const auth = getFirebaseAuth();
  if (!auth) {
    return;
  }

  await signOut(auth);
}
