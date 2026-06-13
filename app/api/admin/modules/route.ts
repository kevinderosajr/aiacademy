import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { adminModuleSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = adminModuleSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const module = await prisma.learningModule.create({
    data: {
      ...parsed.data,
      examples: "Add synthetic examples for the target audience.",
      takeaways: "Use approved data, define the output, and verify important decisions.",
      lessons: { create: [{ order: 1, title: "Overview", body: "Draft lesson created from admin content form." }] },
      quiz: { create: { questions: { create: [{ prompt: "What should AI output be treated as?", options: "Draft|Credential|Final decision", answer: "Draft" }] } } }
    }
  });
  return NextResponse.json(module);
}
