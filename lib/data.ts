import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  return prisma.user.findFirst({ where: { email: "maya.chen@example.com" }, include: { department: true } });
}

export async function getDashboardData() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Seed data missing. Run npm run prisma:seed.");
  const [progress, useCases, attempts, modules] = await Promise.all([
    prisma.moduleProgress.findMany({ where: { userId: user.id }, include: { module: true }, orderBy: { module: { createdAt: "asc" } } }),
    prisma.useCase.findMany({ where: { submitterId: user.id }, include: { department: true }, take: 5 }),
    prisma.promptAttempt.findMany({ where: { userId: user.id }, take: 5 }),
    prisma.learningModule.findMany({ orderBy: { createdAt: "asc" } })
  ]);
  return { user, progress, useCases, attempts, modules };
}

export async function getAnalytics() {
  const [metrics, useCases, playbook, departments] = await Promise.all([
    prisma.adoptionMetric.findMany({ include: { department: true }, orderBy: { date: "asc" } }),
    prisma.useCase.findMany({ include: { department: true } }),
    prisma.playbookEntry.findMany(),
    prisma.department.findMany({ include: { users: true } })
  ]);
  return { metrics, useCases, playbook, departments };
}
