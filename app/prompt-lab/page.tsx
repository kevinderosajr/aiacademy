import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";
import { PromptLabClient } from "./prompt-lab-client";

export default async function PromptLabPage() {
  const exercises = await prisma.promptExercise.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <PageShell title="Prompt Practice Lab" description="Improve weak prompts and receive feedback across clarity, context, constraints, safety, and output format.">
      <PromptLabClient exercises={exercises} />
    </PageShell>
  );
}
