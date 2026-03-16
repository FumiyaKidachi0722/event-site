export function getDataSource() {
  return process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";
}

export function isFirebaseEnabled() {
  return Boolean(
    getDataSource() === "firebase" &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  );
}

export function getEventId() {
  return process.env.NEXT_PUBLIC_EVENT_ID ?? "astraflow-2026";
}

export function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL?.replace(/^/, "https://") ??
    "http://localhost:3000"
  );
}

export function getGaMeasurementId() {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
}

export function getFirebaseConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
  };
}
