import { prisma } from "@/lib/prisma";
import {
  staticChampionProfiles,
  staticDepartments,
  staticMetrics,
  staticModule,
  staticModules,
  staticPlaybookEntries,
  staticPlaybookEntry,
  staticPromptExercises,
  staticSuccessStories,
  staticUseCases,
  staticUser
} from "@/lib/static-data";

async function withFallback<T>(query: () => Promise<T>, fallback: () => unknown): Promise<any> {
  try {
    return await query();
  } catch {
    return fallback();
  }
}

export async function getCurrentUser() {
  const user = await withFallback(
    () => prisma.user.findFirst({ where: { email: "maya.chen@example.com" }, include: { department: true } }),
    () => staticUser
  );
  return user ?? staticUser;
}

export async function getDashboardData() {
  const user = await getCurrentUser();
  const [progress, useCases, attempts, modules] = await withFallback(
    () =>
      Promise.all([
        prisma.moduleProgress.findMany({ where: { userId: user!.id }, include: { module: true }, orderBy: { module: { createdAt: "asc" } } }),
        prisma.useCase.findMany({ where: { submitterId: user!.id }, include: { department: true }, take: 5 }),
        prisma.promptAttempt.findMany({ where: { userId: user!.id }, take: 5 }),
        prisma.learningModule.findMany({ orderBy: { createdAt: "asc" } })
      ]),
    () => {
      const modules = staticModules();
      return [
        modules.map((module, index) => ({ id: `progress-${index}`, userId: staticUser.id, moduleId: module.id, module, percent: Math.max(20, 88 - index * 6), completedAt: null })),
        staticUseCases().slice(0, 5),
        [],
        modules
      ];
    }
  );
  return { user, progress, useCases, attempts, modules };
}

export async function getAnalytics() {
  const [metrics, useCases, playbook, departments] = await withFallback(
    () =>
      Promise.all([
        prisma.adoptionMetric.findMany({ include: { department: true }, orderBy: { date: "asc" } }),
        prisma.useCase.findMany({ include: { department: true } }),
        prisma.playbookEntry.findMany(),
        prisma.department.findMany({ include: { users: true } })
      ]),
    () => [staticMetrics(), staticUseCases(), staticPlaybookEntries(), staticDepartments()]
  );
  return { metrics, useCases, playbook, departments };
}

export async function getLearningModules() {
  return withFallback(() => prisma.learningModule.findMany({ orderBy: { createdAt: "asc" } }), staticModules);
}

export async function getLearningModule(slug: string) {
  return withFallback(
    () =>
      prisma.learningModule.findUnique({
        where: { slug },
        include: { lessons: { orderBy: { order: "asc" } }, quiz: { include: { questions: true } } }
      }),
    () => staticModule(slug)
  );
}

export async function getPlaybookEntries() {
  return withFallback(() => prisma.playbookEntry.findMany({ orderBy: { createdAt: "asc" } }), staticPlaybookEntries);
}

export async function getPlaybookEntry(id: string) {
  return withFallback(() => prisma.playbookEntry.findUnique({ where: { id } }), () => staticPlaybookEntry(id));
}

export async function getPromptExercises() {
  return withFallback(() => prisma.promptExercise.findMany({ orderBy: { createdAt: "asc" } }), staticPromptExercises);
}

export async function getUseCasePageData() {
  return withFallback(
    () =>
      Promise.all([
        prisma.department.findMany({ orderBy: { name: "asc" } }),
        prisma.useCase.findMany({ include: { department: true }, orderBy: { createdAt: "desc" }, take: 10 })
      ]),
    () => [staticDepartments(), staticUseCases()]
  );
}

export async function getChampions() {
  return withFallback(() => prisma.championProfile.findMany({ include: { user: { include: { department: true } }, officeHours: true } }), staticChampionProfiles);
}

export async function getSuccessStories() {
  return withFallback(() => prisma.successStory.findMany({ orderBy: { hoursSaved: "desc" } }), staticSuccessStories);
}

export async function getAdminContentCounts() {
  return withFallback(
    () => Promise.all([prisma.learningModule.count(), prisma.playbookEntry.count(), prisma.promptExercise.count(), prisma.successStory.count()]),
    () => [staticModules().length, staticPlaybookEntries().length, staticPromptExercises().length, staticSuccessStories().length]
  );
}
