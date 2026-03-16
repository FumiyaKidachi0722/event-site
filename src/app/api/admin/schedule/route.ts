import { type NextRequest, NextResponse } from "next/server";

import { getBearerToken } from "@/lib/api-auth";
import { getAdminSnapshot, requireAdmin } from "@/lib/content/repository";

export async function GET(request: NextRequest) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const snapshot = await getAdminSnapshot(token);
    return NextResponse.json(snapshot.sessions);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unauthorized", {
      status: 401,
    });
  }
}
