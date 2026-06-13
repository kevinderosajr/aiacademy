import { PrismaClient } from "@prisma/client";
import { moduleBlueprints, playbookBlueprints } from "../lib/content";

const prisma = new PrismaClient();

const departments = ["Finance", "Sales", "Operations", "Legal", "HR", "Support", "Engineering", "Product"];

const promptExercises = [
  ["Summarize a long policy", "Summarize this policy.", "Summarize an internal policy for frontline managers without exposing confidential details."],
  ["Draft a customer update", "Write an update to the customer.", "Draft a customer-safe project status update with tone and approval constraints."],
  ["Analyze spreadsheet-style data", "Find insights in this table.", "Analyze monthly operational metrics and identify drivers, anomalies, and follow-up questions."],
  ["Create a project plan", "Make a plan for AI rollout.", "Create a phased adoption plan with owners, risks, milestones, and success metrics."],
  ["Meeting notes to action items", "Turn these notes into tasks.", "Extract decisions, owners, deadlines, and unresolved questions from meeting notes."],
  ["Review code safely", "Review this code.", "Ask AI to review code while avoiding secrets and requiring tests and security checks."]
];

const useCases = [
  ["Finance variance summary", "Finance", "Monthly analysts manually write variance notes.", "Slow close-cycle commentary", 12, "INTERNAL"],
  ["Sales call follow-up drafts", "Sales", "Reps rewrite notes into follow-up emails.", "Inconsistent speed and tone", 8, "INTERNAL"],
  ["Operations shift handoff", "Operations", "Supervisors consolidate incident and staffing notes.", "Important context gets buried", 10, "CONFIDENTIAL"],
  ["Policy clause comparison", "Legal", "Teams compare policy versions manually.", "Review bottleneck", 6, "CONFIDENTIAL"],
  ["Candidate interview summaries", "HR", "Recruiters summarize interview panels.", "Time-consuming documentation", 7, "REGULATED"],
  ["Support response assistant", "Support", "Agents search docs and draft replies.", "Long average handle time", 15, "INTERNAL"],
  ["Code review checklist helper", "Engineering", "Reviewers manually scan for known patterns.", "Missed edge cases", 5, "CONFIDENTIAL"],
  ["Product feedback clustering", "Product", "PMs tag feedback themes by hand.", "Slow insight synthesis", 9, "INTERNAL"],
  ["Training FAQ chatbot", "HR", "Employees ask repeated benefits questions.", "Repeated support load", 11, "INTERNAL"],
  ["RFP answer helper", "Sales", "Proposal teams reuse approved answers manually.", "Cycle time pressure", 14, "CONFIDENTIAL"]
];

const successStories = [
  ["Support team reduces first-draft response time", "Support", 220, "More consistent tone", "18% faster handling", "Agents report less repetitive writing"],
  ["Finance accelerates variance commentary", "Finance", 96, "Clearer month-end narratives", "Two-day reduction", "Analysts spend more time investigating drivers"],
  ["Product organizes feedback themes", "Product", 70, "Higher signal in roadmap discussions", "35% faster synthesis", "PMs feel better prepared for planning"],
  ["Operations standardizes shift summaries", "Operations", 110, "Fewer missed handoff details", "22% faster supervisor prep", "Supervisors report clearer starts"],
  ["Sales improves follow-up consistency", "Sales", 140, "More complete recap emails", "Same-day follow-up rate up 28%", "Reps spend more time with customers"],
  ["Engineering strengthens review checklists", "Engineering", 64, "More complete test suggestions", "12% faster review cycles", "Developers cite better learning loops"]
];

async function main() {
  await prisma.adoptionMetric.deleteMany();
  await prisma.tutorMessage.deleteMany();
  await prisma.tutorConversation.deleteMany();
  await prisma.successStory.deleteMany();
  await prisma.officeHour.deleteMany();
  await prisma.championProfile.deleteMany();
  await prisma.useCase.deleteMany();
  await prisma.playbookEntry.deleteMany();
  await prisma.promptAttempt.deleteMany();
  await prisma.promptExercise.deleteMany();
  await prisma.moduleProgress.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.learningModule.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  const deptRecords = Object.fromEntries(
    await Promise.all(departments.map((name) => prisma.department.create({ data: { name } }).then((d) => [name, d] as const)))
  );

  const users = await Promise.all(
    [
      ["Kevin DeRosa", "maya.chen@example.com", "ADMIN", "AI Enablement Lead", "Product"],
      ["Jordan Ellis", "jordan.ellis@example.com", "CHAMPION", "Support Operations Manager", "Support"],
      ["Priya Raman", "priya.raman@example.com", "CHAMPION", "Finance Analyst", "Finance"],
      ["Alex Morgan", "alex.morgan@example.com", "LEARNER", "Account Executive", "Sales"],
      ["Sam Rivera", "sam.rivera@example.com", "CHAMPION", "Engineering Manager", "Engineering"],
      ["Nina Patel", "nina.patel@example.com", "LEARNER", "People Partner", "HR"],
      ["Owen Brooks", "owen.brooks@example.com", "LEARNER", "Operations Supervisor", "Operations"],
      ["Taylor Kim", "taylor.kim@example.com", "CHAMPION", "Product Manager", "Product"],
      ["Casey Nguyen", "casey.nguyen@example.com", "LEARNER", "Legal Operations", "Legal"],
      ["Riley Stone", "riley.stone@example.com", "CHAMPION", "Sales Enablement", "Sales"]
    ].map(([name, email, role, title, department]) =>
      prisma.user.create({ data: { name, email, role, title, departmentId: deptRecords[department].id } })
    )
  );

  const moduleRecords = await Promise.all(
    moduleBlueprints.map((module) =>
      prisma.learningModule.create({
        data: {
          slug: module.slug,
          title: module.title,
          level: module.level,
          duration: module.duration,
          summary: module.summary,
          content: module.content,
          examples: module.examples.join("\n"),
          takeaways: module.takeaways.join("\n"),
          lessons: {
            create: module.lessons.map((lesson, index) => ({ order: index + 1, title: lesson.title, body: lesson.body }))
          },
          quiz: {
            create: {
              questions: {
                create: module.quiz.map((question) => ({
                  prompt: question.prompt,
                  options: question.options.join("|"),
                  answer: question.answer
                }))
              }
            }
          }
        }
      })
    )
  );

  await Promise.all(
    moduleRecords.flatMap((module, moduleIndex) =>
      users.slice(0, 8).map((user, userIndex) => {
        const percent = Math.min(100, Math.max(10, 25 + userIndex * 9 - moduleIndex * 4));
        return prisma.moduleProgress.create({
          data: { userId: user.id, moduleId: module.id, percent, completedAt: percent === 100 ? new Date() : null }
        });
      })
    )
  );

  const exercises = await Promise.all(
    promptExercises.map(([title, weakPrompt, scenario]) =>
      prisma.promptExercise.create({
        data: {
          title: title as string,
          weakPrompt,
          scenario,
          rubric: "Score clarity, context, constraints, safety, and output format. Strong prompts define role, task, audience, boundaries, and deliverable."
        }
      })
    )
  );

  await Promise.all(
    playbookBlueprints.map((entry) =>
      prisma.playbookEntry.create({
        data: {
          title: entry.title,
          type: entry.type,
          audience: entry.audience,
          summary: entry.summary,
          tags: entry.tags,
          body: entry.body
        }
      })
    )
  );

  await Promise.all(
    useCases.map(([title, dept, workflow, painPoint, time, sensitivity], index) =>
      prisma.useCase.create({
        data: {
          title: title as string,
          departmentId: deptRecords[dept as string].id,
          submitterId: users[index % users.length].id,
          currentWorkflow: workflow as string,
          painPoint: painPoint as string,
          timeSpentPerWeek: time as number,
          dataSensitivity: sensitivity as string,
          expectedBenefit: "Reduce repetitive drafting and make expert review faster.",
          feasibilityNotes: "Good candidate for a discovery workshop using approved sample data.",
          impactScore: Math.min(95, 45 + (time as number) * 3),
          feasibilityScore: sensitivity === "REGULATED" ? 45 : sensitivity === "CONFIDENTIAL" ? 62 : 78,
          riskLevel: sensitivity === "REGULATED" ? "HIGH" : sensitivity === "CONFIDENTIAL" ? "MEDIUM" : "LOW",
          suggestedNextStep: sensitivity === "REGULATED" ? "Route to policy review before prototyping." : "Run a 30-minute discovery session with the workflow owner.",
          status: ["NEW", "NEEDS_DISCOVERY", "PROTOTYPE", "IN_PILOT", "ADOPTED"][index % 5]
        }
      })
    )
  );

  const championUsers = users.filter((u) => ["CHAMPION", "ADMIN"].includes(u.role)).slice(0, 5);
  await Promise.all(
    championUsers.map((user, index) =>
      prisma.championProfile.create({
        data: {
          userId: user.id,
          specialty: ["Prompt coaching", "Safe summarization", "Workflow discovery", "AI coding safety", "RAG pilots"][index],
          bio: "Helps teams translate curiosity about AI into safe, measurable experiments.",
          successStory: "Hosted a department enablement session and helped identify the first two practical pilots.",
          officeHours: {
            create: [
              { topic: ["Prompt tune-up clinic", "Responsible AI Q&A", "Use-case discovery jam", "AI coding review hour", "RAG for business teams"][index], startsAt: new Date(Date.now() + (index + 2) * 86400000), format: index % 2 ? "Virtual" : "Hybrid" }
            ]
          }
        }
      })
    )
  );

  await Promise.all(
    successStories.map(([title, department, hoursSaved, qualityImprovement, cycleTimeReduction, employeeSatisfaction]) =>
      prisma.successStory.create({
        data: {
          title: title as string,
          department: department as string,
          hoursSaved: hoursSaved as number,
          qualityImprovement: qualityImprovement as string,
          cycleTimeReduction: cycleTimeReduction as string,
          employeeSatisfaction: employeeSatisfaction as string,
          beforeWorkflow: "Team members manually gathered notes, rewrote drafts, and chased consistency across documents.",
          afterWorkflow: "AI creates a structured first draft from approved inputs, then a human owner reviews and finalizes the output."
        }
      })
    )
  );

  const today = new Date();
  const metricRows = [];
  for (let day = 74; day >= 0; day--) {
    const date = new Date(today);
    date.setDate(today.getDate() - day);
    for (const [deptName, dept] of Object.entries(deptRecords)) {
      const base = departments.indexOf(deptName) + 1;
      metricRows.push({
        date,
        departmentId: dept.id,
        activeUsers: 8 + base + Math.floor((75 - day) / 7),
        moduleCompletions: (base + day) % 9,
        promptAttempts: 2 + ((base * 3 + day) % 12),
        tutorConversations: 1 + ((base + day) % 7),
        useCasesSubmitted: day % 13 === base % 13 ? 1 : 0,
        useCasesAdopted: day % 29 === base % 29 ? 1 : 0,
        estimatedHoursSaved: 4 + base * 2 + Math.floor((75 - day) / 5),
        satisfactionScore: 3.7 + ((base + day) % 12) / 10,
        responsibleAiCompletionRate: Math.min(98, 42 + Math.floor((75 - day) * 0.7) + base)
      });
    }
  }
  await prisma.adoptionMetric.createMany({ data: metricRows });

  await prisma.tutorConversation.create({
    data: {
      userId: users[0].id,
      title: "What is RAG?",
      messages: {
        create: [
          { role: "user", content: "What is RAG?" },
          { role: "assistant", content: "RAG means retrieval augmented generation: the AI looks up approved source material before drafting an answer, like checking a company handbook before responding." }
        ]
      }
    }
  });

  console.log("Seeded AI Enablement Studio with synthetic demo data.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
