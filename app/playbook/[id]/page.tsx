import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function PlaybookEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await prisma.playbookEntry.findUnique({ where: { id } });
  if (!entry) notFound();

  return (
    <PageShell title={entry.title} description={entry.summary}>
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card>
          <CardContent className="p-6">
            <Link href="/playbook" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900">
              <ArrowLeft size={16} /> Back to playbook
            </Link>
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge className="border-blue-200 bg-blue-50 text-blue-800">{entry.type.replaceAll("_", " ")}</Badge>
              <Badge className="border-slate-200 bg-slate-50 text-slate-700">{entry.audience}</Badge>
            </div>
            <div className="prose-lite max-w-none">
              <ReactMarkdown>{entry.body}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
        <aside className="space-y-4">
          <div className="rounded-lg border border-slate-800 bg-[#070b16] p-5 text-white shadow-soft">
            <div className="flex size-10 items-center justify-center rounded-md bg-blue-600">
              <BookOpen size={19} />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Review workflow</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>1. Confirm the use case and audience.</li>
              <li>2. Copy only the parts that fit your workflow.</li>
              <li>3. Replace examples with approved context.</li>
              <li>4. Route sensitive or high-impact uses for review.</li>
            </ol>
          </div>
          <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-cyan-950">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck size={18} />
              Safety reminder
            </div>
            <p className="mt-2 text-sm leading-6">Do not paste secrets, credentials, regulated data, or customer-sensitive data into AI tools unless the tool and use case are approved.</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
