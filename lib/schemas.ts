import { z } from "zod";

export const tutorSchema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) })).min(1)
});

export const promptFeedbackSchema = z.object({
  exerciseTitle: z.string().min(2),
  weakPrompt: z.string().min(2),
  improvedPrompt: z.string().min(10)
});

export const useCaseSchema = z.object({
  title: z.string().min(4),
  department: z.string().min(2),
  currentWorkflow: z.string().min(10),
  painPoint: z.string().min(5),
  timeSpentPerWeek: z.coerce.number().min(1).max(80),
  dataSensitivity: z.enum(["PUBLIC", "INTERNAL", "CONFIDENTIAL", "REGULATED"]),
  expectedBenefit: z.string().min(5),
  feasibilityNotes: z.string().min(5)
});

export const adminModuleSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(4).regex(/^[a-z0-9-]+$/),
  level: z.string().min(3),
  duration: z.coerce.number().min(5).max(180),
  summary: z.string().min(10),
  content: z.string().min(20)
});

export const playbookSchema = z.object({
  title: z.string().min(4),
  type: z.enum(["GUIDE", "PROMPT_TEMPLATE", "WORKFLOW_RECIPE", "TOOL_COMPARISON", "FAQ", "CHECKLIST"]),
  audience: z.string().min(3),
  summary: z.string().min(10),
  body: z.string().min(20),
  tags: z.string().min(2)
});
