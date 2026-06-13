import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";
import { PlaybookClient } from "./playbook-client";

export default async function PlaybookPage() {
  const entries = await prisma.playbookEntry.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <PageShell title="AI Playbook" description="Search, filter, open, and review reusable guides, prompt templates, workflow recipes, FAQs, comparisons, and safety checklists.">
      <PlaybookClient entries={entries} />
    </PageShell>
  );
}
