import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getLearningModule } from "@/lib/data";
import { ModuleClient } from "./module-client";

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = await getLearningModule(slug);
  if (!module) notFound();

  return (
    <PageShell title={module.title} description={module.summary}>
      <ModuleClient module={module} lessons={module.lessons} questions={module.quiz?.questions ?? []} />
    </PageShell>
  );
}
