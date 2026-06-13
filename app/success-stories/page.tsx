import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { prisma } from "@/lib/prisma";

export default async function SuccessStoriesPage() {
  const stories = await prisma.successStory.findMany({ orderBy: { hoursSaved: "desc" } });
  const total = stories.reduce((sum, story) => sum + story.hoursSaved, 0);
  return (
    <PageShell title="Success Stories" description="Synthetic before-and-after examples showing how AI enablement can reduce repetitive work and improve quality.">
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="Estimated hours saved" value={total} note="Across seeded stories" />
        <MetricCard label="Quality wins" value={stories.length} note="Documented process improvements" />
        <MetricCard label="Cycle-time impact" value="12-35%" note="Synthetic examples only" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <p className="text-sm text-slate-500">{story.department} · {story.hoursSaved} hours saved</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
              <p><span className="font-semibold text-slate-800">Before:</span> {story.beforeWorkflow}</p>
              <p><span className="font-semibold text-slate-800">After:</span> {story.afterWorkflow}</p>
              <p><span className="font-semibold text-slate-800">Quality:</span> {story.qualityImprovement}</p>
              <p><span className="font-semibold text-slate-800">Cycle time:</span> {story.cycleTimeReduction}</p>
              <p><span className="font-semibold text-slate-800">Satisfaction:</span> {story.employeeSatisfaction}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
