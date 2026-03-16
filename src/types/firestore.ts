export type FirestoreTimestampString = string;

export type FirestoreDocumentBase = {
  id: string;
  createdAt?: FirestoreTimestampString;
  updatedAt?: FirestoreTimestampString;
};
