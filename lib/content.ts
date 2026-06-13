export const moduleBlueprints = [
  {
    slug: "ai-in-plain-english",
    title: "AI in Plain English",
    level: "Beginner",
    duration: 22,
    summary: "Learn what AI is, what it is good at, what it is not good at, and how to use it as a safe drafting partner.",
    content: `## What AI Means at Work

Artificial intelligence is software that can recognize patterns and generate useful outputs such as text, summaries, classifications, plans, and recommendations. The most important beginner idea is simple: AI is not a decision owner. It is a fast drafting partner that still needs a person to define the goal, provide safe context, and review the result.

Think of AI like a new teammate who has read a huge amount of public information but does not automatically know your company policy, customer context, or risk tolerance. If you give that teammate a vague request, you will get a vague answer. If you give the teammate a clear role, safe background, constraints, and an output format, the result becomes much more useful.

In an enterprise setting, the best AI use cases usually reduce repetitive drafting, summarize approved material, prepare first-pass analysis, or help teams structure work. The safest starting point is low-risk work where a human can easily review the output before anyone acts on it.`,
    examples: [
      "A support manager asks AI to turn approved help-center notes into a first-draft response checklist.",
      "An operations leader asks AI to summarize non-sensitive shift notes into themes and follow-up questions.",
      "A program manager asks AI to create a first-pass project plan from approved goals, milestones, and constraints."
    ],
    takeaways: [
      "AI is best treated as a drafting and reasoning assistant, not an accountable owner.",
      "Clear context and a specific output format usually matter more than clever wording.",
      "Sensitive data, credentials, regulated data, and confidential customer details need approved handling.",
      "Human review is required before using AI output in high-impact decisions."
    ],
    lessons: [
      {
        title: "The mental model",
        body: "AI predicts and generates likely useful output based on patterns. It can sound confident even when it is wrong, so your job is to give it safe context and review the result."
      },
      {
        title: "Good first use cases",
        body: "Start with drafts, summaries, brainstorming, checklists, and structured plans. Avoid final decisions, sensitive records, and anything that could affect rights, safety, employment, or legal outcomes without governance review."
      },
      {
        title: "How to ask",
        body: "Use this pattern: role, task, context, constraints, output format, and safety boundary. For example: 'Act as an enablement coach. Turn these approved notes into a manager checklist. Use plain language. Do not infer facts not present in the notes.'"
      },
      {
        title: "Review before use",
        body: "Check facts, tone, policy alignment, missing assumptions, and data sensitivity. Treat the answer as a draft, then decide what a human should approve."
      }
    ],
    quiz: [
      {
        prompt: "What is the safest beginner mindset for using AI at work?",
        options: ["AI output is always correct", "AI is a draft partner that needs human review", "AI should make final policy decisions", "AI can receive any data if the prompt is good"],
        answer: "AI is a draft partner that needs human review"
      },
      {
        prompt: "Which task is usually a good first AI use case?",
        options: ["Store API keys", "Make an employment decision", "Draft a summary from approved notes", "Approve a legal contract"],
        answer: "Draft a summary from approved notes"
      }
    ]
  },
  {
    slug: "what-are-llms",
    title: "What Are LLMs?",
    level: "Beginner",
    duration: 24,
    summary: "Understand large language models, why they sound fluent, and where they need grounding and verification.",
    content: `## Large Language Models

A large language model, or LLM, is an AI system trained to generate language. It learns statistical patterns across text and uses those patterns to predict useful next words, paragraphs, lists, or code. This is why an LLM can explain a concept, draft an email, summarize a passage, or convert messy notes into a structured plan.

The fluency can be impressive, but fluency is not the same as truth. LLMs can hallucinate, omit context, or create plausible-sounding details. For business use, this means you should ask the model to stay within supplied context, identify uncertainty, and show assumptions.

LLMs are strongest when the task is language-heavy and the answer can be reviewed. They are weaker when the work requires private context they do not have, current facts they cannot access, or final judgment in sensitive situations.`,
    examples: [
      "Rewrite a technical note for a nontechnical audience.",
      "Extract owners, dates, and risks from meeting notes.",
      "Compare two approved policy excerpts and list differences for human review."
    ],
    takeaways: [
      "LLMs generate language from patterns; they do not guarantee truth.",
      "Ground important answers in approved source material.",
      "Ask for assumptions, uncertainty, and citations when facts matter.",
      "Use human review before relying on generated output."
    ],
    lessons: [
      { title: "Why LLMs sound smart", body: "They are trained on enormous text patterns and can produce fluent responses. That fluency can help with drafting, but it can also hide mistakes." },
      { title: "What LLMs do not know", body: "They do not automatically know your internal policies, current priorities, or sensitive context. You must provide approved context or connect them to approved sources." },
      { title: "How to reduce errors", body: "Ask the model to cite supplied text, list assumptions, separate facts from recommendations, and say when it is uncertain." }
    ],
    quiz: [
      { prompt: "Why should fluent AI answers still be reviewed?", options: ["They may contain plausible errors", "They are always too short", "They cannot write lists", "They only work on images"], answer: "They may contain plausible errors" },
      { prompt: "What helps an LLM answer company-specific questions?", options: ["Approved context or retrieval", "A shorter prompt only", "Secret credentials", "No human review"], answer: "Approved context or retrieval" }
    ]
  },
  {
    slug: "prompt-engineering-basics",
    title: "Prompt Engineering Basics",
    level: "Beginner",
    duration: 26,
    summary: "Practice the prompt formula: role, task, context, constraints, output format, examples, and safety boundaries.",
    content: `## Prompting Is Work Design

Prompt engineering is the practice of turning a vague request into a clear work order. A useful prompt tells AI who to act as, what to do, what context is approved, what constraints matter, and what format the output should use.

Weak prompt: "Summarize this."

Stronger prompt: "Act as an operations enablement coach. Summarize the approved shift handoff notes below for a supervisor. Use five bullets: incidents, staffing, blockers, follow-ups, and risks. Do not include names or sensitive details. If information is missing, list questions instead of guessing."

The second prompt is better because it narrows the role, audience, output, and safety boundary.`,
    examples: [
      "Turn meeting notes into decisions, owners, deadlines, and open questions.",
      "Draft a customer update in a calm professional tone with no unapproved commitments.",
      "Ask for a table comparing workflow options by effort, risk, and expected value."
    ],
    takeaways: [
      "A prompt is a work order, not a magic phrase.",
      "Constraints and format reduce rework.",
      "Safety boundaries belong inside the prompt.",
      "Examples help the model match the desired style."
    ],
    lessons: [
      { title: "Role and task", body: "Define the lens and the job. 'Act as a training designer' is more useful than 'help me' because it frames the output." },
      { title: "Context and constraints", body: "Provide only approved context. Add constraints such as audience, tone, length, policies, and what not to include." },
      { title: "Output format", body: "Ask for a table, checklist, email draft, JSON object, or numbered plan. A clear format makes review easier." },
      { title: "Safety boundary", body: "Tell AI to avoid secrets, regulated data, customer-sensitive details, and unsupported claims. Ask it to flag uncertainty." }
    ],
    quiz: [
      { prompt: "Which prompt element makes review easier?", options: ["Output format", "More adjectives", "A secret", "A vague deadline"], answer: "Output format" },
      { prompt: "What should you include when data sensitivity matters?", options: ["A safety boundary", "Customer records", "Credentials", "Nothing"], answer: "A safety boundary" }
    ]
  },
  {
    slug: "writing-and-summarization",
    title: "Using AI for Writing and Summarization",
    level: "Applied",
    duration: 28,
    summary: "Use AI to draft, rewrite, and summarize approved information while preserving accuracy and tone.",
    content: `## Writing With Human Ownership

AI can speed up first drafts, rewrite dense material in plain language, and summarize approved content. The human still owns accuracy, tone, commitments, and final approval.

For summaries, tell AI what to preserve, what to omit, and what uncertainty to flag. For writing, define audience, tone, purpose, and boundaries. The best workflow is draft, review, revise, approve.`,
    examples: [
      "Summarize a non-sensitive policy update for frontline managers.",
      "Draft a project status note without making new commitments.",
      "Rewrite technical release notes into plain-English enablement copy."
    ],
    takeaways: [
      "Summaries can omit nuance; compare against source material.",
      "Customer-facing drafts need review for commitments and tone.",
      "Ask AI to separate facts from recommendations.",
      "Keep sensitive details out unless the tool and use case are approved."
    ],
    lessons: [
      { title: "Summarize safely", body: "Use approved source text, ask for key points and open questions, and tell AI not to infer missing facts." },
      { title: "Draft responsibly", body: "Define audience, purpose, tone, and boundaries. Require review before sending externally." },
      { title: "Revise with intent", body: "Ask for specific edits: shorter, clearer, calmer, more executive-ready, or more action-oriented." }
    ],
    quiz: [
      { prompt: "What should happen before sending an AI-drafted customer update?", options: ["Human review", "Auto-send", "Add unverified promises", "Paste credentials"], answer: "Human review" },
      { prompt: "What should a summarization prompt ask AI not to do?", options: ["Infer missing facts", "Use bullets", "Be concise", "Flag open questions"], answer: "Infer missing facts" }
    ]
  },
  {
    slug: "data-analysis",
    title: "Using AI for Data Analysis",
    level: "Applied",
    duration: 30,
    summary: "Ask better questions of spreadsheet-style data, spot patterns, and validate findings before acting.",
    content: `## AI as an Analysis Partner

AI can help frame analysis, identify trends, draft formulas, explain anomalies, and generate follow-up questions. It should not replace the source of truth, statistical validation, or expert review.

When working with data, start by classifying sensitivity. Use synthetic, aggregated, or approved data whenever possible. Ask AI to show assumptions, calculations, and caveats.`,
    examples: [
      "Identify top drivers in monthly support volume using aggregated counts.",
      "Draft a variance-analysis narrative from approved finance totals.",
      "Generate follow-up questions for an operations dashboard."
    ],
    takeaways: [
      "Use approved or aggregated data.",
      "Ask AI to show assumptions and calculation logic.",
      "Validate findings against the source system.",
      "Do not use AI alone for regulated or high-impact decisions."
    ],
    lessons: [
      { title: "Frame the analysis", body: "Tell AI the business question, columns, definitions, and what decision the analysis supports." },
      { title: "Find patterns", body: "Ask for trends, outliers, segments, and hypotheses. Treat those as leads, not conclusions." },
      { title: "Validate", body: "Check formulas, source data, time windows, missing values, and whether the explanation fits the business reality." }
    ],
    quiz: [
      { prompt: "What data is safest for early AI analysis practice?", options: ["Aggregated or approved data", "Raw regulated records", "Passwords", "Private HR notes"], answer: "Aggregated or approved data" },
      { prompt: "What should AI-generated insights be treated as?", options: ["Hypotheses to validate", "Final truth", "A system of record", "Legal approval"], answer: "Hypotheses to validate" }
    ]
  },
  {
    slug: "intro-to-rag",
    title: "Intro to RAG",
    level: "Applied",
    duration: 32,
    summary: "Learn how retrieval augmented generation grounds AI answers in approved knowledge sources.",
    content: `## Retrieval Augmented Generation

RAG means retrieval augmented generation. In plain English, the AI looks up relevant approved documents before drafting an answer. It is like asking an assistant to check the handbook before responding.

RAG is useful when people ask repeatable questions and answers should be grounded in trusted material: policies, product docs, playbooks, SOPs, or knowledge-base articles. It still needs source quality, permissions, and human review.`,
    examples: [
      "Support Q&A grounded in approved help articles.",
      "Employee training answers grounded in HR policy summaries.",
      "Sales enablement answers grounded in approved proposal language."
    ],
    takeaways: [
      "RAG grounds answers in retrieved sources.",
      "Bad or outdated source content creates bad answers.",
      "Permissions and data access controls matter.",
      "Ask the AI to cite the source material it used."
    ],
    lessons: [
      { title: "Retrieval first", body: "The system searches a controlled knowledge base for relevant chunks before the model drafts an answer." },
      { title: "Generation second", body: "The model uses retrieved context to respond in natural language, ideally with citations or source references." },
      { title: "Governance always", body: "Teams must manage source freshness, access permissions, feedback loops, and escalation paths." }
    ],
    quiz: [
      { prompt: "What does RAG help AI do?", options: ["Ground answers in approved sources", "Store passwords", "Avoid review forever", "Replace policies"], answer: "Ground answers in approved sources" },
      { prompt: "What is a key RAG risk?", options: ["Outdated or unauthorized source content", "Too many citations", "Clear ownership", "Human review"], answer: "Outdated or unauthorized source content" }
    ]
  },
  {
    slug: "intro-to-ai-agents",
    title: "Intro to AI Agents",
    level: "Applied",
    duration: 34,
    summary: "Understand agentic workflows, tool use, approval gates, and why supervision matters.",
    content: `## AI Agents

An AI agent is an AI workflow that can plan steps, use tools, remember task state, and iterate toward a goal. A simple chat prompt gives one answer. An agent may search, draft, check, update a ticket, and ask for approval.

Agents can create leverage, but they also increase risk because they can take actions. Strong agent design uses narrow scopes, tool permissions, logs, approval gates, and rollback plans.`,
    examples: [
      "Draft a Jira ticket from approved product notes and wait for human approval before creating it.",
      "Summarize a knowledge-base article, check style rules, and suggest updates for review.",
      "Prepare a weekly adoption report from approved metrics and route it to an owner."
    ],
    takeaways: [
      "Agents combine planning, tools, and state.",
      "Tool access should be least privilege.",
      "Approval gates are essential before external side effects.",
      "Logs and auditability help teams trust and improve agents."
    ],
    lessons: [
      { title: "From prompt to workflow", body: "Agents break work into steps. That makes them useful for repeatable workflows but riskier than simple drafting." },
      { title: "Tool permissions", body: "Only give an agent the tools and data it needs. Avoid broad access, credentials, or irreversible actions." },
      { title: "Approval gates", body: "Require a human checkpoint before sending messages, changing records, creating tickets, or taking external action." }
    ],
    quiz: [
      { prompt: "Why do agents need approval gates?", options: ["They may take actions", "They cannot write text", "They never use tools", "They are always offline"], answer: "They may take actions" },
      { prompt: "What permission model is safest for agents?", options: ["Least privilege", "Full admin access", "Shared passwords", "No logs"], answer: "Least privilege" }
    ]
  },
  {
    slug: "workflow-automation",
    title: "AI for Workflow Automation",
    level: "Applied",
    duration: 30,
    summary: "Identify repeatable workflows that can become practical, measurable AI pilots.",
    content: `## Finding Automation Opportunities

Good AI use cases usually sit at the intersection of frequency, friction, reviewability, and safe data access. The work happens often, takes meaningful time, has clear examples, and can be reviewed by a human.

Start with workflow discovery before buying or building. Map the current process, pain points, inputs, outputs, systems, risks, and success metrics. Then prototype with synthetic or approved data.`,
    examples: [
      "Turn meeting notes into action items for recurring governance meetings.",
      "Draft status reports from approved project updates.",
      "Classify incoming requests and route them to the right team."
    ],
    takeaways: [
      "Frequency plus pain equals opportunity.",
      "Data sensitivity shapes feasibility.",
      "Prototype with safe examples before connecting systems.",
      "Measure time saved, quality, cycle time, and satisfaction."
    ],
    lessons: [
      { title: "Map the workflow", body: "Document trigger, inputs, actors, systems, decisions, outputs, and exceptions." },
      { title: "Score the idea", body: "Estimate impact, feasibility, and risk. High-risk ideas may still matter, but they need governance first." },
      { title: "Pilot small", body: "Use a narrow workflow, approved data, clear success metrics, and a named human owner." }
    ],
    quiz: [
      { prompt: "What makes a workflow a better AI candidate?", options: ["Frequent, painful, reviewable work", "Rare work with unclear owners", "Secrets-only data", "No success metric"], answer: "Frequent, painful, reviewable work" },
      { prompt: "What should a pilot use first?", options: ["Synthetic or approved data", "Production credentials", "Unreviewed customer data", "No owner"], answer: "Synthetic or approved data" }
    ]
  },
  {
    slug: "responsible-ai-data-safety",
    title: "Responsible AI and Data Safety",
    level: "Responsible AI",
    duration: 35,
    summary: "Apply data classification, human review, and policy-aware decision-making before using AI.",
    content: `## Responsible AI Is an Operating Practice

Responsible AI is not a one-time policy. It is a set of habits: classify data, minimize what you share, choose the approved tool, verify output, document review, and escalate high-impact use cases.

The core safety question is: what could go wrong if the answer is wrong, leaked, biased, or used without context? The higher the impact, the more governance and human review you need.`,
    examples: [
      "Use AI to draft a checklist from public guidance, then have an owner approve it.",
      "Decline to paste regulated employee records into an unapproved tool.",
      "Escalate a high-impact eligibility workflow before prototyping."
    ],
    takeaways: [
      "Classify data before prompting.",
      "Minimize sensitive details.",
      "Verify facts and assumptions.",
      "Use human review for high-impact decisions."
    ],
    lessons: [
      { title: "Classify first", body: "Know whether data is public, internal, confidential, or regulated before using an AI tool." },
      { title: "Minimize context", body: "Share the smallest approved context that can accomplish the task. Remove names, secrets, and unnecessary identifiers." },
      { title: "Review and escalate", body: "When output could affect safety, rights, finances, employment, legal risk, or customer commitments, involve the right human owner." }
    ],
    quiz: [
      { prompt: "What should you do before pasting data into AI?", options: ["Classify the data", "Assume it is public", "Add credentials", "Skip review"], answer: "Classify the data" },
      { prompt: "When should high-impact use cases be escalated?", options: ["Before prototyping", "After deployment", "Never", "Only after a failure"], answer: "Before prototyping" }
    ]
  },
  {
    slug: "vibe-coding-safety",
    title: "Vibe Coding Safety Basics",
    level: "Responsible AI",
    duration: 34,
    summary: "Use AI coding tools productively without skipping understanding, testing, security, or license review.",
    content: `## Coding With AI Safely

AI can help write examples, explain code, draft tests, find bugs, and suggest refactors. It can also introduce insecure patterns, outdated dependencies, license issues, and code you do not understand.

Safe AI coding means you remain the engineer of record. You review generated code, run tests, understand dependencies, validate licenses, avoid secrets, and never blindly deploy.`,
    examples: [
      "Ask AI to explain a function before modifying it.",
      "Generate unit-test cases for edge conditions.",
      "Review a patch for insecure input handling without pasting secrets."
    ],
    takeaways: [
      "Never paste secrets, credentials, tokens, or private keys.",
      "Read and understand generated code.",
      "Add and run tests.",
      "Check dependencies, licenses, and security patterns."
    ],
    lessons: [
      { title: "Keep secrets out", body: "Use placeholders for tokens, credentials, customer data, and private infrastructure details." },
      { title: "Understand the patch", body: "Ask AI to explain the code, but verify it yourself. If you cannot explain it, do not ship it." },
      { title: "Test and scan", body: "Add tests, run the suite, check dependency health, and look for common security issues." }
    ],
    quiz: [
      { prompt: "What should you never paste into an AI coding tool?", options: ["Secrets or credentials", "A small public example", "A test name", "A generic error message"], answer: "Secrets or credentials" },
      { prompt: "Who owns generated code before it ships?", options: ["The human reviewer", "The AI model", "No one", "The package manager"], answer: "The human reviewer" }
    ]
  }
];

export const playbookBlueprints = [
  {
    title: "Prompting 101",
    type: "GUIDE",
    audience: "All employees",
    summary: "A plain-English starter guide to role, task, context, constraints, and format.",
    tags: "prompting, beginner, safety",
    body: `# Prompting 101

## When to use this

Use this guide when you need AI to draft, summarize, brainstorm, compare, or organize approved information.

## The formula

1. **Role:** Tell AI what perspective to use.
2. **Task:** State the exact job.
3. **Context:** Provide only approved background.
4. **Constraints:** Add tone, length, audience, policy, and boundaries.
5. **Output format:** Ask for bullets, a table, a checklist, or a draft.
6. **Safety:** Tell AI what not to include and when to flag uncertainty.

## Template

\`\`\`text
Act as [role]. Your task is [task].
Audience: [audience].
Context: [approved context only].
Constraints: [tone, length, must include, must avoid].
Output format: [table, checklist, email, plan].
Safety: Do not include secrets, regulated data, or unsupported claims. Flag assumptions.
\`\`\`

## Review checklist

- Does the output match the source context?
- Did the model invent facts?
- Is the tone appropriate?
- Is sensitive data removed?
- Does a human owner need to approve it?`
  },
  {
    title: "Meeting Notes to Action Plan",
    type: "PROMPT_TEMPLATE",
    audience: "Managers",
    summary: "A reusable prompt for turning notes into accountable next steps.",
    tags: "meetings, action items, managers",
    body: `# Meeting Notes to Action Plan

## Prompt

\`\`\`text
Act as a program manager. Convert the approved meeting notes below into an action plan.

Use this format:
- Decisions made
- Action items with owner, due date, and dependency
- Risks or blockers
- Open questions
- Follow-up agenda

Rules:
- Do not invent owners or dates. Mark missing items as "needs owner" or "needs date."
- Keep customer-sensitive, employee-sensitive, and confidential details out of the summary.
- Use concise, professional language.

Notes:
[paste approved notes]
\`\`\`

## How to review

Confirm every owner, date, and decision against the meeting record. Send the result as a draft for attendee review before treating it as final.`
  },
  {
    title: "Summarizing Documents Safely",
    type: "CHECKLIST",
    audience: "Operations",
    summary: "How to summarize documents without sharing sensitive data.",
    tags: "summarization, data safety, operations",
    body: `# Summarizing Documents Safely

## Before you paste

- Confirm the tool is approved for the document classification.
- Remove secrets, credentials, personal data, and customer-sensitive details.
- Use excerpts instead of full documents when possible.
- Prefer synthetic examples for practice.

## Prompt pattern

Ask AI to summarize only the supplied text, separate facts from assumptions, and list anything that needs human review.

## Do not use AI when

- The document contains regulated data and the tool is not approved.
- The summary would become a final legal, HR, safety, or financial decision.
- You cannot verify the output against the source.`
  },
  {
    title: "Using AI for Jira Ticket Drafting",
    type: "WORKFLOW_RECIPE",
    audience: "Product and Engineering",
    summary: "Convert product notes into testable tickets with acceptance criteria.",
    tags: "product, engineering, jira",
    body: `# Using AI for Jira Ticket Drafting

## Workflow

1. Start with approved product notes.
2. Ask AI to draft a ticket with problem, user story, acceptance criteria, test cases, dependencies, and open questions.
3. Review for technical accuracy and scope.
4. Remove unsupported commitments.
5. Create the ticket only after owner approval.

## Prompt

\`\`\`text
Act as a product manager. Draft a Jira ticket from the approved notes below.
Include: summary, user story, acceptance criteria, edge cases, test notes, dependencies, and open questions.
Do not invent requirements. Mark uncertainty clearly.
\`\`\`

## Safety notes

Do not paste credentials, private repo details, vulnerable code, customer data, or unapproved roadmap information.`
  },
  {
    title: "Using AI for Sales Follow-up Drafts",
    type: "PROMPT_TEMPLATE",
    audience: "Sales",
    summary: "Draft follow-ups that preserve relationship context and require review.",
    tags: "sales, email, follow-up",
    body: `# Using AI for Sales Follow-up Drafts

## Prompt

\`\`\`text
Act as a sales enablement assistant. Draft a follow-up email from the approved call notes below.
Tone: helpful, concise, and professional.
Include: recap, agreed next step, owner, date, and resources promised.
Do not make pricing, legal, security, or roadmap commitments not present in the notes.
\`\`\`

## Review

Check every commitment, date, and resource. Human review is required before sending externally.`
  },
  {
    title: "Using AI for Legal/Policy Review: Cautions",
    type: "FAQ",
    audience: "Legal and HR",
    summary: "Where AI can help with first-pass review and where human experts must decide.",
    tags: "legal, policy, cautions",
    body: `# Legal and Policy Review: Cautions

## Good uses

- Create a first-pass checklist from approved policy text.
- Compare two approved excerpts and identify differences.
- Rewrite dense policy language into plain-language training material for review.

## Do not use AI to

- Provide final legal advice.
- Make employment, eligibility, disciplinary, or compliance decisions.
- Process regulated or privileged information in an unapproved tool.

## Human review

A qualified owner must review outputs before they are shared, relied on, or used in a decision.`
  },
  {
    title: "RAG Explained for Business Users",
    type: "GUIDE",
    audience: "Business leaders",
    summary: "Why grounded AI answers are safer for knowledge-intensive teams.",
    tags: "rag, knowledge base, governance",
    body: `# RAG Explained for Business Users

RAG stands for retrieval augmented generation. The AI retrieves relevant approved source material before drafting an answer.

## Why it matters

RAG can reduce hallucinations for knowledge-base questions because the answer is grounded in documents your organization controls.

## What to govern

- Source freshness
- Access permissions
- Citation behavior
- Feedback and correction process
- Escalation paths for uncertain answers`
  },
  {
    title: "AI Agents Explained for Business Users",
    type: "GUIDE",
    audience: "Program teams",
    summary: "What agents can automate, how to supervise them, and where to start.",
    tags: "agents, automation, governance",
    body: `# AI Agents Explained for Business Users

AI agents can plan steps, use tools, and work through multi-step tasks. They are powerful because they can do more than draft text. They are risky for the same reason.

## Start with

- Narrow workflows
- Read-only data access
- Human approval gates
- Logs and audit trails
- Reversible actions

## Avoid

Broad permissions, unattended external actions, hidden tool use, and unclear ownership.`
  },
  {
    title: "Data Classification Before Prompting",
    type: "CHECKLIST",
    audience: "All employees",
    summary: "A quick safety gate before using any AI tool.",
    tags: "data classification, safety, governance",
    body: `# Data Classification Before Prompting

## Ask these questions

1. Is the data public, internal, confidential, or regulated?
2. Is this AI tool approved for that classification?
3. Can I minimize or anonymize the data?
4. Could a wrong answer affect people, safety, legal, financial, or customer outcomes?
5. Who reviews the result?

When in doubt, stop and ask the data owner or responsible AI contact.`
  },
  {
    title: "Tool Comparison: Chat, Search, RAG, Agents",
    type: "TOOL_COMPARISON",
    audience: "AI champions",
    summary: "A lightweight chooser for common AI solution patterns.",
    tags: "tools, champions, comparison",
    body: `# Tool Comparison

| Pattern | Best for | Watch out for |
| --- | --- | --- |
| Chat | Drafting, brainstorming, rewriting | Hallucinations and sensitive data |
| Search | Finding current public information | Source quality and relevance |
| RAG | Answering from approved knowledge | Permissions and stale content |
| Agents | Multi-step workflows | Tool access, approvals, audit logs |

Choose the simplest pattern that safely solves the workflow.`
  }
];
