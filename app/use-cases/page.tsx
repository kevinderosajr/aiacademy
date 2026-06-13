import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { UseCaseClient } from "./use-case-client";

export default async function UseCasesPage() {
  const [departments, useCases] = await Promise.all([
    prisma.department.findMany({ orderBy: { name: "asc" } }),
    prisma.useCase.findMany({ include: { department: true }, orderBy: { createdAt: "desc" }, take: 10 })
  ]);
  return (
    <PageShell title="Use Case Discovery" description="A structured intake flow for identifying workflow automation opportunities and routing them through impact, feasibility, and risk review.">
      <UseCaseClient departments={departments.map((d) => d.name)} />
      <Card className="mt-6">
        <CardHeader><CardTitle>Sample Use Case Pipeline</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.id} className="rounded-md border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{item.title}</p>
                <Badge className="bg-slate-50">{item.status.replaceAll("_", " ")}</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.department.name} · {item.timeSpentPerWeek} hrs/week · Risk {item.riskLevel}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  );
}
