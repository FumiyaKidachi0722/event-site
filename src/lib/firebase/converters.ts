import type { FirestoreDataConverter } from "firebase/firestore";

export function createConverter<T extends Record<string, unknown>>(): FirestoreDataConverter<T> {
  return {
    toFirestore(value) {
      return value;
    },
    fromFirestore(snapshot) {
      return { id: snapshot.id, ...snapshot.data() } as unknown as T;
    },
  };
}
