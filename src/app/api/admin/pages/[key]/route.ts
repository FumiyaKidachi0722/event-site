import { type NextRequest, NextResponse } from "next/server";

import { getBearerToken } from "@/lib/api-auth";
import { getAdminSnapshot, requireAdmin, saveAdminCollectionItem } from "@/lib/content/repository";
import { validatePage } from "@/lib/validation";
import type { PageDoc } from "@/types/content";

export async function GET(request: NextRequest, context: { params: Promise<{ key: string }> }) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const snapshot = await getAdminSnapshot(token);
    const { key } = await context.params;
    const item = snapshot.pages.find((entry) => entry.key === key);
    if (!item) {
      return new NextResponse("Not found", { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Unauthorized", {
      status: 401,
    });
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ key: string }> }) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const body = (await request.json()) as PageDoc;
    const errors = validatePage(body);
    if (errors.length) {
      return new NextResponse(errors.join(" "), { status: 400 });
    }
    const { key } = await context.params;
    const saved = await saveAdminCollectionItem(
      "pages",
      {
        ...body,
        key: key as PageDoc["key"],
        id: `page-${key}`,
        updatedAt: new Date().toISOString(),
      },
      token,
    );
    return NextResponse.json(saved);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Failed to save", {
      status: 400,
    });
  }
}
