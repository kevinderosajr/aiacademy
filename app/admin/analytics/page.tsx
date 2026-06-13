import { PageShell } from "@/components/page-shell";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DepartmentBar, PipelinePie, UsageLine } from "@/components/analytics-charts";
import { getAnalytics } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default async function AdminAnalyticsPage() {
  const { metrics, useCases, departments } = await getAnalytics();
  const totals = metrics.reduce((acc, m) => ({
    activeUsers: acc.activeUsers + m.activeUsers,
    moduleCompletions: acc.moduleCompletions + m.moduleCompletions,
    promptAttempts: acc.promptAttempts + m.promptAttempts,
    tutorConversations: acc.tutorConversations + m.tutorConversations,
    useCasesSubmitted: acc.useCasesSubmitted + m.useCasesSubmitted,
    useCasesAdopted: acc.useCasesAdopted + m.useCasesAdopted,
    estimatedHoursSaved: acc.estimatedHoursSaved + m.estimatedHoursSaved,
    satisfactionScore: acc.satisfactionScore + m.satisfactionScore
  }), { activeUsers: 0, moduleCompletions: 0, promptAttempts: 0, tutorConversations: 0, useCasesSubmitted: 0, useCasesAdopted: 0, estimatedHoursSaved: 0, satisfactionScore: 0 });
  const byDate = Object.values(metrics.reduce<Record<string, { date: string; activeUsers: number; completions: number }>>((acc, m) => {
    const key = m.date.toISOString().slice(5, 10);
    acc[key] ??= { date: key, activeUsers: 0, completions: 0 };
    acc[key].activeUsers += m.activeUsers;
    acc[key].completions += m.moduleCompletions;
    return acc;
  }, {})).slice(-30);
  const byDept = departments.map((dept) => ({ name: dept.name, completions: metrics.filter((m) => m.departmentId === dept.id).reduce((s, m) => s + m.moduleCompletions, 0) }));
  const pipeline = Object.values(useCases.reduce<Record<string, { name: string; value: number }>>((acc, item) => {
    const key = item.status.replaceAll("_", " ");
    acc[key] ??= { name: key, value: 0 };
    acc[key].value++;
    return acc;
  }, {}));

  return (
    <PageShell title="Admin Analytics" description="Adoption metrics for active users, completions, prompt practice, tutor usage, submitted use cases, adopted use cases, hours saved, and satisfaction.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active users" value={formatNumber(totals.activeUsers)} note="Cumulative seeded activity" />
        <MetricCard label="Module completions" value={formatNumber(totals.moduleCompletions)} note="Learning engagement" />
        <MetricCard label="Prompt lab attempts" value={formatNumber(totals.promptAttempts)} note="Hands-on practice" />
        <MetricCard label="AI tutor conversations" value={formatNumber(totals.tutorConversations)} note="Beginner coaching" />
        <MetricCard label="Use cases submitted" value={formatNumber(totals.useCasesSubmitted)} note="Workflow discovery" />
        <MetricCard label="Use cases adopted" value={formatNumber(totals.useCasesAdopted)} note="Impact pipeline" />
        <MetricCard label="Estimated hours saved" value={formatNumber(totals.estimatedHoursSaved)} note="Synthetic benefit estimate" />
        <MetricCard label="Satisfaction score" value={(totals.satisfactionScore / metrics.length).toFixed(1)} note="Average survey rating" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>Usage Over Time</CardTitle></CardHeader><CardContent><UsageLine data={byDate} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Completion by Department</CardTitle></CardHeader><CardContent><DepartmentBar data={byDept} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Use Case Pipeline</CardTitle></CardHeader><CardContent><PipelinePie data={pipeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Responsible AI Completion</CardTitle></CardHeader><CardContent><DepartmentBar data={departments.map((d) => ({ name: d.name, completions: Math.round(metrics.filter((m) => m.departmentId === d.id).at(-1)?.responsibleAiCompletionRate ?? 0) }))} /></CardContent></Card>
      </div>
    </PageShell>
  );
}
