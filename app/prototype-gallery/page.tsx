import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const demos = ["Policy summarizer", "Meeting action-item extractor", "Jira ticket drafter", "Support response assistant", "RFP answer helper", "Knowledge-base Q&A using RAG", "Code review assistant"];

export default function PrototypeGalleryPage() {
  return (
    <PageShell title="Prototype Gallery" description="Lightweight AI demo concepts that teams can discuss, scope, and safely prototype with synthetic or approved data.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {demos.map((demo, index) => (
          <Card key={demo}>
            <CardHeader>
              <CardTitle>{demo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
              <p><span className="font-semibold text-slate-800">Problem:</span> Repetitive knowledge work slows teams down.</p>
              <p><span className="font-semibold text-slate-800">AI approach:</span> Use a guided prompt, RAG, or supervised assistant flow.</p>
              <p><span className="font-semibold text-slate-800">Demo workflow:</span> Upload approved sample input, generate a draft, review, revise, and export.</p>
              <p><span className="font-semibold text-slate-800">Safety:</span> Minimize data, block secrets, and require human review.</p>
              <p><span className="font-semibold text-slate-800">Value:</span> Estimated {20 + index * 6}% faster first draft cycle.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
