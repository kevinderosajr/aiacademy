import { PageShell } from "@/components/page-shell";
import { DefinitionsClient } from "./definitions-client";

export default function DefinitionsPage() {
  return (
    <PageShell
      title="AI Definitions"
      description="A glossary of AI terms with technical definitions, simplified explanations, analogies, workplace examples, and safety notes."
    >
      <DefinitionsClient />
    </PageShell>
  );
}
