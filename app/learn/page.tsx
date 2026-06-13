import Link from "next/link";
import { ArrowRight, ScrollText } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export default async function LearnPage() {
  const modules = await prisma.learningModule.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <PageShell title="Learning Modules" description="Structured, beginner-friendly lessons covering AI foundations, prompt engineering, RAG, agents, workflow automation, and responsible use.">
      <Link href="/definitions" className="mb-5 flex items-center justify-between gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950 hover:border-blue-400">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-blue-600 text-white">
            <ScrollText size={18} />
          </div>
          <div>
            <p className="font-semibold">Need a quick translation?</p>
            <p className="text-sm text-blue-900">Open the AI Definitions glossary for technical terms, plain-English explanations, and analogies.</p>
          </div>
        </div>
        <ArrowRight size={18} className="shrink-0" />
      </Link>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <Link key={module.id} href={`/learn/${module.slug}`}>
            <Card className="h-full hover:border-teal-300 hover:shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge className="bg-teal-50 text-teal-700">{module.level}</Badge>
                  <span className="text-xs text-slate-500">{module.duration} min</span>
                </div>
                <CardTitle className="pt-3">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">{module.summary}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
