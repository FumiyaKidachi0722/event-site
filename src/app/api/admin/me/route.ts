import { type NextRequest, NextResponse } from "next/server";

import { getBearerToken } from "@/lib/api-auth";
import { requireAdmin } from "@/lib/content/repository";

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    const admin = await requireAdmin(token);
    return NextResponse.json({ admin });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unauthorized", {
      status: 401,
    });
  }
}
