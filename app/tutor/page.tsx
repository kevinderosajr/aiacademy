import { PageShell } from "@/components/page-shell";
import { TutorClient } from "./tutor-client";

export default function TutorPage() {
  return (
    <PageShell title="AI Tutor" description="Ask beginner questions and get plain-English answers with analogies, business examples, and gentle safety reminders.">
      <TutorClient />
    </PageShell>
  );
}
