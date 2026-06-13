import { NextResponse } from "next/server";
import { answerTutor } from "@/lib/ai";
import { tutorSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = tutorSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const answer = await answerTutor(parsed.data.messages);
  return NextResponse.json({ answer });
}
