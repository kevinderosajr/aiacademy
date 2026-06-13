import { NextResponse } from "next/server";
import { scoreUseCase } from "@/lib/ai";
import { prisma } from "@/lib/prisma";
import { useCaseSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = useCaseSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const score = scoreUseCase(parsed.data);
  const { department: departmentName, ...useCaseData } = parsed.data;
  try {
    const [department, submitter] = await Promise.all([
      prisma.department.findUnique({ where: { name: departmentName } }),
      prisma.user.findFirst()
    ]);
    if (department && submitter) {
      await prisma.useCase.create({
        data: {
          ...useCaseData,
          departmentId: department.id,
          submitterId: submitter.id,
          impactScore: score.impactScore,
          feasibilityScore: score.feasibilityScore,
          riskLevel: score.riskLevel,
          suggestedNextStep: score.suggestedNextStep
        }
      });
    }
  } catch {
    // Portfolio deployments can run without a database; scoring still works.
  }
  return NextResponse.json(score);
}
