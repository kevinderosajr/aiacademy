import OpenAI from "openai";

type ChatMessage = { role: "user" | "assistant"; content: string };

const tutorSystemPrompt = `You are the AI Enablement Studio tutor for novice employees.
Use beginner-friendly language, explain jargon, use analogies, give concrete business examples, and ask one follow-up question when useful.
Mention safety considerations when relevant: do not paste secrets, credentials, customer-sensitive data, or regulated data into AI tools unless approved.
Treat AI output as a draft and encourage human review for important decisions.`;

export async function answerTutor(messages: ChatMessage[]) {
  if (!process.env.OPENAI_API_KEY) return mockTutor(messages.at(-1)?.content ?? "");

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [{ role: "system", content: tutorSystemPrompt }, ...messages]
  });

  return response.choices[0]?.message.content ?? mockTutor(messages.at(-1)?.content ?? "");
}

export async function scorePrompt(exerciseTitle: string, weakPrompt: string, improvedPrompt: string) {
  if (!process.env.OPENAI_API_KEY) return mockPromptScore(improvedPrompt);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "Score prompt engineering attempts as JSON with clarity, context, constraints, safety, format integers 1-100 and feedback string." },
      { role: "user", content: JSON.stringify({ exerciseTitle, weakPrompt, improvedPrompt }) }
    ]
  });

  try {
    return JSON.parse(response.choices[0]?.message.content ?? "");
  } catch {
    return mockPromptScore(improvedPrompt);
  }
}

export function scoreUseCase(input: {
  timeSpentPerWeek: number;
  dataSensitivity: "PUBLIC" | "INTERNAL" | "CONFIDENTIAL" | "REGULATED";
  currentWorkflow: string;
  painPoint: string;
  expectedBenefit: string;
}) {
  const sensitivityPenalty = { PUBLIC: 0, INTERNAL: 8, CONFIDENTIAL: 22, REGULATED: 40 }[input.dataSensitivity];
  const impactScore = Math.min(95, Math.round(input.timeSpentPerWeek * 5 + input.painPoint.length / 3 + input.expectedBenefit.length / 5));
  const feasibilityScore = Math.max(25, Math.min(92, 88 - sensitivityPenalty + (input.currentWorkflow.length > 80 ? 6 : 0)));
  const riskLevel = input.dataSensitivity === "REGULATED" ? "HIGH" : input.dataSensitivity === "CONFIDENTIAL" ? "MEDIUM" : "LOW";
  const suggestedNextStep =
    riskLevel === "HIGH"
      ? "Start with governance review, approved sample data, and a narrow discovery workshop."
      : impactScore > 70
        ? "Prioritize a discovery workshop and prototype with sanitized examples."
        : "Capture more examples and validate the workflow frequency before prototyping.";

  return { impactScore, feasibilityScore, riskLevel, suggestedNextStep };
}

function mockTutor(question: string) {
  const q = question.toLowerCase();
  if (q.includes("rag")) {
    return "RAG means retrieval augmented generation. Think of it like asking an assistant to check an approved library before drafting an answer. The AI still writes in natural language, but it first retrieves relevant source material so the answer is more grounded. For example, a support team might use RAG to answer from approved help articles. Safety note: the source library still needs access controls, and people should verify important answers. What kind of knowledge base are you imagining?";
  }
  if (q.includes("large language model") || q.includes("llm")) {
    return "A large language model is AI trained to predict and generate text. A simple analogy: it is like a very well-read drafting partner that can spot patterns in language, but it does not truly know your company context unless you provide safe context. Use it for drafts, summaries, and brainstorming, then verify facts before acting.";
  }
  if (q.includes("never paste") || q.includes("secrets")) {
    return "Never paste passwords, API keys, credentials, customer-sensitive data, regulated data, private employee data, or confidential strategy into an AI tool unless your company has explicitly approved that tool and use case. When in doubt, remove or generalize the details first.";
  }
  return "A good way to think about AI at work is: it is a drafting and reasoning assistant, not an accountable owner. Give it a role, a clear task, safe context, constraints, and the output format you want. Then review the result like you would review a smart colleague's first draft. What workflow are you hoping to improve?";
}

function mockPromptScore(prompt: string) {
  const hasRole = /act as|you are|role/i.test(prompt);
  const hasFormat = /format|table|bullets|json|sections/i.test(prompt);
  const hasSafety = /do not|avoid|sensitive|secret|confidential|approved/i.test(prompt);
  const hasContext = prompt.length > 180;
  const hasConstraints = /must|limit|include|exclude|tone|audience/i.test(prompt);

  return {
    clarity: hasRole ? 82 : 64,
    context: hasContext ? 86 : 58,
    constraints: hasConstraints ? 80 : 55,
    safety: hasSafety ? 88 : 50,
    format: hasFormat ? 84 : 57,
    feedback: `Strong prompts name the role, task, audience, safe context, constraints, and desired format. ${hasSafety ? "Good safety boundary." : "Add a safety boundary such as avoiding confidential or regulated data."}`
  };
}
