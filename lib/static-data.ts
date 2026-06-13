import { moduleBlueprints, playbookBlueprints } from "@/lib/content";

export const departments = ["Finance", "Sales", "Operations", "Legal", "HR", "Support", "Engineering", "Product"];

export const staticUser = {
  id: "user-kevin",
  name: "Kevin DeRosa",
  email: "maya.chen@example.com",
  role: "ADMIN",
  title: "AI Enablement Lead",
  departmentId: "dept-product",
  department: { id: "dept-product", name: "Product" },
  createdAt: new Date()
};

export function staticModules() {
  return moduleBlueprints.map((module, index) => ({
    id: `module-${module.slug}`,
    ...module,
    examples: module.examples.join("\n"),
    takeaways: module.takeaways.join("\n"),
    createdAt: new Date(Date.now() + index)
  }));
}

export function staticModule(slug: string) {
  const module = moduleBlueprints.find((item) => item.slug === slug);
  if (!module) return null;
  return {
    id: `module-${module.slug}`,
    ...module,
    examples: module.examples.join("\n"),
    takeaways: module.takeaways.join("\n"),
    createdAt: new Date(),
    lessons: module.lessons.map((lesson, index) => ({
      id: `lesson-${module.slug}-${index}`,
      title: lesson.title,
      body: lesson.body,
      order: index + 1,
      moduleId: `module-${module.slug}`
    })),
    quiz: {
      id: `quiz-${module.slug}`,
      moduleId: `module-${module.slug}`,
      questions: module.quiz.map((question, index) => ({
        id: `question-${module.slug}-${index}`,
        prompt: question.prompt,
        options: question.options.join("|"),
        answer: question.answer,
        quizId: `quiz-${module.slug}`
      }))
    }
  };
}

export function staticPlaybookEntries() {
  return playbookBlueprints.map((entry, index) => ({
    id: `playbook-${index}`,
    ...entry,
    createdAt: new Date(Date.now() + index)
  }));
}

export function staticPlaybookEntry(id: string) {
  return staticPlaybookEntries().find((entry) => entry.id === id || entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id) ?? null;
}

export function staticPromptExercises() {
  return [
    ["Summarize a long policy", "Summarize this policy.", "Summarize an internal policy for frontline managers without exposing confidential details."],
    ["Draft a customer update", "Write an update to the customer.", "Draft a customer-safe project status update with tone and approval constraints."],
    ["Analyze spreadsheet-style data", "Find insights in this table.", "Analyze monthly operational metrics and identify drivers, anomalies, and follow-up questions."],
    ["Create a project plan", "Make a plan for AI rollout.", "Create a phased adoption plan with owners, risks, milestones, and success metrics."],
    ["Meeting notes to action items", "Turn these notes into tasks.", "Extract decisions, owners, deadlines, and unresolved questions from meeting notes."],
    ["Review code safely", "Review this code.", "Ask AI to review code while avoiding secrets and requiring tests and security checks."]
  ].map(([title, weakPrompt, scenario], index) => ({
    id: `exercise-${index}`,
    title,
    weakPrompt,
    scenario,
    rubric: "Score clarity, context, constraints, safety, and output format.",
    createdAt: new Date(Date.now() + index)
  }));
}

export function staticUseCases() {
  return [
    ["Finance variance summary", "Finance", 12, "INTERNAL", "NEEDS_DISCOVERY"],
    ["Sales call follow-up drafts", "Sales", 8, "INTERNAL", "PROTOTYPE"],
    ["Operations shift handoff", "Operations", 10, "CONFIDENTIAL", "IN_PILOT"],
    ["Policy clause comparison", "Legal", 6, "CONFIDENTIAL", "NEW"],
    ["Support response assistant", "Support", 15, "INTERNAL", "ADOPTED"]
  ].map(([title, department, timeSpentPerWeek, risk, status], index) => ({
    id: `use-case-${index}`,
    title,
    departmentId: `dept-${department.toString().toLowerCase()}`,
    department: { id: `dept-${department.toString().toLowerCase()}`, name: department as string },
    submitterId: staticUser.id,
    submitter: staticUser,
    currentWorkflow: "Manual drafting and review across repeated workflow steps.",
    painPoint: "Slow cycle time and inconsistent quality.",
    timeSpentPerWeek: timeSpentPerWeek as number,
    dataSensitivity: risk as string,
    expectedBenefit: "Reduce repetitive drafting and improve consistency.",
    feasibilityNotes: "Prototype with synthetic or approved data.",
    impactScore: 76,
    feasibilityScore: 68,
    riskLevel: risk === "CONFIDENTIAL" ? "MEDIUM" : "LOW",
    suggestedNextStep: "Run a discovery session with approved sample data.",
    status: status as string,
    createdAt: new Date(Date.now() + index)
  }));
}

export function staticDepartments() {
  return departments.map((name, index) => ({
    id: `dept-${name.toLowerCase()}`,
    name,
    users: index === 0 ? [staticUser] : []
  }));
}

export function staticChampionProfiles() {
  return ["Prompt coaching", "Safe summarization", "Workflow discovery", "AI coding safety", "RAG pilots"].map((specialty, index) => ({
    id: `champion-${index}`,
    userId: `champion-user-${index}`,
    specialty,
    bio: "Helps teams translate AI curiosity into safe, measurable experiments.",
    successStory: "Hosted an enablement session and helped identify practical pilots.",
    user: {
      ...staticUser,
      id: `champion-user-${index}`,
      name: ["Kevin DeRosa", "Jordan Ellis", "Priya Raman", "Sam Rivera", "Taylor Kim"][index],
      department: { id: `dept-${departments[index].toLowerCase()}`, name: departments[index] }
    },
    officeHours: [{ id: `office-${index}`, topic: "Prompt tune-up clinic", startsAt: new Date(), format: index % 2 ? "Virtual" : "Hybrid", championId: `champion-${index}` }]
  }));
}

export function staticSuccessStories() {
  return [
    ["Support team reduces first-draft response time", "Support", 220, "More consistent tone", "18% faster handling", "Agents report less repetitive writing"],
    ["Finance accelerates variance commentary", "Finance", 96, "Clearer month-end narratives", "Two-day reduction", "Analysts spend more time investigating drivers"],
    ["Product organizes feedback themes", "Product", 70, "Higher signal in roadmap discussions", "35% faster synthesis", "PMs feel better prepared for planning"]
  ].map(([title, department, hoursSaved, qualityImprovement, cycleTimeReduction, employeeSatisfaction], index) => ({
    id: `story-${index}`,
    title: title as string,
    department: department as string,
    hoursSaved: hoursSaved as number,
    qualityImprovement: qualityImprovement as string,
    cycleTimeReduction: cycleTimeReduction as string,
    employeeSatisfaction: employeeSatisfaction as string,
    beforeWorkflow: "Team members manually gathered notes, rewrote drafts, and chased consistency across documents.",
    afterWorkflow: "AI creates a structured first draft from approved inputs, then a human owner reviews and finalizes the output.",
    createdAt: new Date(Date.now() + index)
  }));
}

export function staticMetrics() {
  const rows = [];
  for (let day = 29; day >= 0; day--) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    for (const dept of staticDepartments()) {
      const base = departments.indexOf(dept.name) + 1;
      rows.push({
        id: `metric-${dept.id}-${day}`,
        date,
        departmentId: dept.id,
        department: dept,
        activeUsers: 12 + base + Math.floor((30 - day) / 3),
        moduleCompletions: (base + day) % 8,
        promptAttempts: 3 + ((base * 2 + day) % 10),
        tutorConversations: 2 + ((base + day) % 6),
        useCasesSubmitted: day % 9 === base % 9 ? 1 : 0,
        useCasesAdopted: day % 19 === base % 19 ? 1 : 0,
        estimatedHoursSaved: 8 + base * 2 + Math.floor((30 - day) / 2),
        satisfactionScore: 4.1 + ((base + day) % 6) / 10,
        responsibleAiCompletionRate: Math.min(98, 58 + Math.floor((30 - day) * 1.1) + base)
      });
    }
  }
  return rows;
}
