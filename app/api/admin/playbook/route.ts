import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { playbookSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = playbookSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const entry = await prisma.playbookEntry.create({ data: parsed.data });
  return NextResponse.json(entry);
}
