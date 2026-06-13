import { PageShell } from "@/components/page-shell";
import { getPlaybookEntries } from "@/lib/data";
import { PlaybookClient } from "./playbook-client";

export default async function PlaybookPage() {
  const entries = (await getPlaybookEntries()) as any[];
  return (
    <PageShell title="AI Playbook" description="Search, filter, open, and review reusable guides, prompt templates, workflow recipes, FAQs, comparisons, and safety checklists.">
      <PlaybookClient entries={entries} />
    </PageShell>
  );
}
