import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { prisma } from "@/lib/prisma";
import { ModuleClient } from "./module-client";

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const module = await prisma.learningModule.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } }, quiz: { include: { questions: true } } }
  });
  if (!module) notFound();

  return (
    <PageShell title={module.title} description={module.summary}>
      <ModuleClient module={module} lessons={module.lessons} questions={module.quiz?.questions ?? []} />
    </PageShell>
  );
}
