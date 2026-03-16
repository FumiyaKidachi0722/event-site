import { type NextRequest, NextResponse } from "next/server";

import { getBaseUrl, getFirebaseConfig } from "@/lib/env";

export async function POST(request: NextRequest) {
  const { credential } = (await request.json()) as { credential?: string };
  const firebase = getFirebaseConfig();

  if (!firebase.apiKey || !firebase.projectId) {
    return new NextResponse("Firebase is not configured.", { status: 400 });
  }

  if (!credential) {
    return new NextResponse("Google credential is required.", { status: 400 });
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${encodeURIComponent(firebase.apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestUri: `${getBaseUrl()}/admin/login`,
        returnSecureToken: true,
        returnIdpCredential: true,
        postBody: `id_token=${credential}&providerId=google.com`,
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return new NextResponse(await response.text(), { status: 400 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
