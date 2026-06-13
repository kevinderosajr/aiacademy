import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { AdminContentClient } from "./admin-content-client";

export default async function AdminContentPage() {
  const [modules, playbook, exercises, stories] = await Promise.all([
    prisma.learningModule.count(),
    prisma.playbookEntry.count(),
    prisma.promptExercise.count(),
    prisma.successStory.count()
  ]);
  return (
    <PageShell title="Admin Content" description="Simple content management for modules, playbook entries, prompt exercises, FAQs, and success stories.">
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-sm">Modules</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{modules}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Playbook</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{playbook}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Prompt exercises</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{exercises}</CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm">Success stories</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{stories}</CardContent></Card>
      </div>
      <AdminContentClient />
    </PageShell>
  );
}
