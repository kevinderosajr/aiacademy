import { NextResponse } from "next/server";
import { scorePrompt } from "@/lib/ai";
import { promptFeedbackSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = promptFeedbackSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const result = await scorePrompt(parsed.data.exerciseTitle, parsed.data.weakPrompt, parsed.data.improvedPrompt);
  return NextResponse.json(result);
}
