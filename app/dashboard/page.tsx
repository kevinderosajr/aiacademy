import { PageShell } from "@/components/page-shell";
import { DefinitionsClient } from "@/app/definitions/definitions-client";

export default function DashboardPage() {
  return (
    <PageShell
      title="AI Maturity Dashboard"
      description="Your guided board for moving from AI fundamentals to prompting, data grounding, safety, agents, and orchestration."
    >
      <DefinitionsClient />
    </PageShell>
  );
}
