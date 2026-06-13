import { PageShell } from "@/components/page-shell";
import { getPromptExercises } from "@/lib/data";
import { PromptLabClient } from "./prompt-lab-client";

export default async function PromptLabPage() {
  const exercises = (await getPromptExercises()) as any[];
  return (
    <PageShell title="Prompt Practice Lab" description="Improve weak prompts and receive feedback across clarity, context, constraints, safety, and output format.">
      <PromptLabClient exercises={exercises} />
    </PageShell>
  );
}
