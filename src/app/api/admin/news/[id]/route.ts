import { type NextRequest, NextResponse } from "next/server";

import { getBearerToken } from "@/lib/api-auth";
import {
  deleteAdminCollectionItem,
  getAdminSnapshot,
  requireAdmin,
  saveAdminCollectionItem,
} from "@/lib/content/repository";
import { validateNews } from "@/lib/validation";
import type { NewsDoc } from "@/types/content";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const snapshot = await getAdminSnapshot(token);
    const { id } = await context.params;
    const item = snapshot.news.find((entry) => entry.id === id);
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

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const body = (await request.json()) as NewsDoc;
    const { normalized, errors } = validateNews(body);
    if (errors.length) {
      return new NextResponse(errors.join(" "), { status: 400 });
    }
    const { id } = await context.params;
    const saved = await saveAdminCollectionItem("news", { ...normalized, id }, token);
    return NextResponse.json(saved);
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Failed to save", {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = getBearerToken(request);
  try {
    await requireAdmin(token);
    const { id } = await context.params;
    await deleteAdminCollectionItem("news", id, token);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : "Failed to delete", {
      status: 400,
    });
  }
}
