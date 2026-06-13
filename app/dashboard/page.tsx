import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/data";

export default async function DashboardPage() {
  const { user, progress, useCases } = await getDashboardData();
  const completed = progress.filter((p) => p.percent === 100).length;
  const avgProgress = Math.round(progress.reduce((sum, p) => sum + p.percent, 0) / progress.length);
  const next = progress.find((p) => p.percent < 100)?.module;

  return (
    <PageShell title={`Welcome back, ${user.name.split(" ")[0]}`} description="Your personal AI adoption dashboard with learning progress, safety training, prompt practice, and next best actions.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Completed modules" value={`${completed}/${progress.length}`} note="Foundations and applied skills" />
        <MetricCard label="Learning path" value={`${avgProgress}%`} note="Average progress across modules" />
        <MetricCard label="Prompt score" value="82" note="Latest practice attempt benchmark" />
        <MetricCard label="Responsible AI" value="Complete" note="Safety baseline satisfied" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Current Learning Path</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress.slice(0, 6).map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <Link href={`/learn/${item.module.slug}`} className="font-medium hover:text-teal-700">{item.module.title}</Link>
                  <span className="text-slate-500">{item.percent}%</span>
                </div>
                <Progress value={item.percent} />
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Module</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{next?.title ?? "Keep practicing"}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{next?.summary ?? "Try another prompt lab challenge or submit a workflow idea."}</p>
              <Link href={next ? `/learn/${next.slug}` : "/prompt-lab"} className="mt-4 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
                Continue
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Submitted Use Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {useCases.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 rounded-md border p-3">
                  <span className="text-sm font-medium">{item.title}</span>
                  <Badge className="bg-slate-50">{item.status.replaceAll("_", " ")}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
