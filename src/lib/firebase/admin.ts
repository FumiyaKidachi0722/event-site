import { isFirebaseEnabled } from "@/lib/env";

export function getFirebaseAdminRuntime() {
  return {
    enabled: isFirebaseEnabled(),
    mode: "client-sdk-and-rest-hybrid" as const,
  };
}
