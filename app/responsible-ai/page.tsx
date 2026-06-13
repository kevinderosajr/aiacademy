import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const topics = ["Data classification", "Secrets management", "Prompt injection", "Hallucinations", "Human review", "Compliance-aware AI usage", "AI-generated code risks", "Data minimization", "Model selection", "Auditability"];
const matrix = [
  ["Safe", "Brainstorming public campaign ideas, drafting internal outlines, summarizing approved non-sensitive content."],
  ["Caution", "Using internal data, drafting customer-facing communications, analyzing decisions that affect people."],
  ["Do Not Use", "Pasting secrets, credentials, regulated records, private employee data, or unapproved customer-sensitive data."]
];

export default function ResponsibleAiPage() {
  return (
    <PageShell title="Responsible AI Center" description="Plain-English guardrails for using AI safely, reviewing outputs, minimizing data exposure, and avoiding common failure modes.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {topics.map((topic) => (
          <Card key={topic}>
            <CardHeader>
              <CardTitle className="text-sm">{topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs leading-5 text-slate-600">Use AI with approved data, verify important claims, and document human review for high-impact workflows.</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Should I use AI for this?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-700">
            {["Is the data approved for this tool?", "Can a human review the output?", "Would a wrong answer create customer, legal, safety, or employee impact?", "Can you test with synthetic or minimized data first?"].map((step, index) => (
              <div key={step} className="rounded-md border p-3"><span className="font-semibold">Step {index + 1}:</span> {step}</div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safe / Caution / Do Not Use Matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {matrix.map(([label, text]) => (
              <div key={label} className="rounded-md border p-3">
                <Badge className={label === "Safe" ? "bg-emerald-50 text-emerald-700" : label === "Caution" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"}>{label}</Badge>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vibe Coding Safety Guide</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {["Never paste secrets or credentials.", "Review generated code before using it.", "Add tests and run them.", "Understand dependencies and validate licenses.", "Watch for insecure patterns.", "Do not blindly deploy generated code.", "Use least-privilege tokens.", "Document human ownership."].map((rule) => (
            <div key={rule} className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{rule}</div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
