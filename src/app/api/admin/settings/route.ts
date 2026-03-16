import { type NextRequest, NextResponse } from "next/server";

import { getBearerToken } from "@/lib/api-auth";
import { getAdminSnapshot, requireAdmin, saveAdminEvent } from "@/lib/content/repository";
import { validateEvent } from "@/lib/validation";
import type { EventDoc } from "@/types/content";

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    await requireAdmin(token);
    const snapshot = await getAdminSnapshot(token);
    return NextResponse.json(snapshot);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unauthorized", {
      status: 401,
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = getBearerToken(request);
    await requireAdmin(token);
    const event = (await request.json()) as EventDoc;
    const errors = validateEvent(event);
    if (errors.length) {
      return new NextResponse(errors.join(" "), { status: 400 });
    }
    const saved = await saveAdminEvent({ ...event, updatedAt: new Date().toISOString() }, token);
    return NextResponse.json(saved);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Failed to save", {
      status: 400,
    });
  }
}
