export type DefinitionCategory = "Foundations" | "Prompting" | "Safety" | "Data" | "Automation" | "Evaluation";

export type AiDefinition = {
  term: string;
  category: DefinitionCategory;
  technical: string;
  plain: string;
  analogy: string;
  workplaceExample: string;
  safetyNote?: string;
};

export const aiDefinitions: AiDefinition[] = [
  {
    term: "Artificial Intelligence (AI)",
    category: "Foundations",
    technical: "A broad field of computer science focused on systems that perform tasks associated with human intelligence, such as recognizing patterns, generating language, making predictions, or selecting actions.",
    plain: "Software that can do tasks that usually require judgment, pattern recognition, or language skills.",
    analogy: "Like a very fast assistant that can sort, draft, suggest, and summarize, but still needs a human manager.",
    workplaceExample: "Drafting a first-pass project plan from approved goals and milestones.",
    safetyNote: "AI output should be reviewed before it influences important decisions."
  },
  {
    term: "Machine Learning",
    category: "Foundations",
    technical: "A subset of AI where models learn statistical patterns from data and use those patterns to make predictions or generate outputs on new inputs.",
    plain: "A way for software to learn from examples instead of being manually programmed for every rule.",
    analogy: "Like teaching someone to recognize spam emails by showing them thousands of examples.",
    workplaceExample: "Predicting which support tickets may need escalation based on historical patterns."
  },
  {
    term: "Large Language Model (LLM)",
    category: "Foundations",
    technical: "A machine learning model trained on large text corpora to predict and generate sequences of language, code, or structured text.",
    plain: "An AI system that is very good at writing, explaining, summarizing, and transforming text.",
    analogy: "Like a highly fluent drafting partner who has read a massive library but does not automatically know your company context.",
    workplaceExample: "Turning meeting notes into a clean list of decisions, owners, and open questions.",
    safetyNote: "LLMs can sound confident while being wrong, so verify important facts."
  },
  {
    term: "Generative AI",
    category: "Foundations",
    technical: "AI systems that create new content, such as text, images, code, audio, or structured data, based on patterns learned during training and context provided at runtime.",
    plain: "AI that makes a new draft or artifact instead of only finding or sorting information.",
    analogy: "Like asking a designer, writer, or analyst for a first draft that you still need to review.",
    workplaceExample: "Creating a first-draft training FAQ from approved policy notes."
  },
  {
    term: "Prompt",
    category: "Prompting",
    technical: "The input instructions, context, constraints, and examples provided to an AI model to guide its output.",
    plain: "The request you give AI.",
    analogy: "Like a work order: the clearer it is, the better the result.",
    workplaceExample: "Act as a project manager. Turn these approved notes into a table with owners, dates, risks, and open questions."
  },
  {
    term: "Prompt Engineering",
    category: "Prompting",
    technical: "The practice of designing prompts to improve model outputs by specifying role, task, context, constraints, examples, and output format.",
    plain: "Writing better AI instructions so you get useful, reviewable results.",
    analogy: "Like giving a new teammate a clear brief instead of saying, 'Do the thing.'",
    workplaceExample: "Adding audience, tone, data boundaries, and output format to a summarization request."
  },
  {
    term: "System Prompt",
    category: "Prompting",
    technical: "A high-priority instruction layer that defines an AI assistant's role, boundaries, behavior, and rules before the user's request is processed.",
    plain: "The behind-the-scenes instructions that tell the AI how it should behave.",
    analogy: "Like the employee handbook an assistant follows before taking on any task.",
    workplaceExample: "A company tutor is instructed to use approved training material, avoid legal advice, and explain answers in beginner-friendly language.",
    safetyNote: "System prompts help steer behavior, but they are not a replacement for permissions, review, or testing."
  },
  {
    term: "Few-Shot Prompting",
    category: "Prompting",
    technical: "A prompting technique where one or more examples are included in the prompt so the model can imitate the desired pattern, structure, tone, or reasoning style.",
    plain: "Showing the AI examples of what good looks like before asking it to do the task.",
    analogy: "Like giving someone three finished reports before asking them to draft the next one.",
    workplaceExample: "Providing two sample customer updates so AI can draft a third in the same format."
  },
  {
    term: "Chain-of-Thought",
    category: "Prompting",
    technical: "A reasoning-oriented prompting approach that encourages a model to work through intermediate steps before producing an answer.",
    plain: "Asking AI to think through a problem step by step.",
    analogy: "Like showing your work on a math problem instead of only writing the final answer.",
    workplaceExample: "Have AI list assumptions and checks before recommending a project timeline.",
    safetyNote: "For business use, request a concise rationale or checklist rather than relying on hidden reasoning."
  },
  {
    term: "Temperature",
    category: "Prompting",
    technical: "A model setting that controls randomness in token selection, often making outputs more predictable at lower values and more varied at higher values.",
    plain: "A creativity dial for AI responses.",
    analogy: "Like setting a brainstorming session from conservative to wild.",
    workplaceExample: "Use lower temperature for policy summaries and higher temperature for naming ideas."
  },
  {
    term: "Context Window",
    category: "Foundations",
    technical: "The maximum amount of input and conversation history a model can consider at one time, usually measured in tokens.",
    plain: "How much the AI can keep in view while answering.",
    analogy: "Like the size of a whiteboard. If too much is on it, something has to be erased or summarized.",
    workplaceExample: "A long policy may need to be summarized in sections instead of pasted all at once."
  },
  {
    term: "Token",
    category: "Foundations",
    technical: "A unit of text processed by a language model, often a word fragment, word, punctuation mark, or character sequence.",
    plain: "A small piece of text the AI reads or writes.",
    analogy: "Like Lego pieces that make up sentences.",
    workplaceExample: "Long documents use more tokens, which can affect cost and how much context fits."
  },
  {
    term: "Hallucination",
    category: "Safety",
    technical: "A model output that is false, unsupported, or fabricated, often presented with fluent confidence.",
    plain: "When AI makes something up or gets a fact wrong.",
    analogy: "Like a person confidently guessing instead of saying, 'I do not know.'",
    workplaceExample: "Inventing a policy clause that was not in the source document.",
    safetyNote: "Ask AI to cite supplied sources and flag uncertainty."
  },
  {
    term: "Retrieval Augmented Generation (RAG)",
    category: "Data",
    technical: "An architecture where relevant source documents are retrieved from a knowledge store and provided to a generative model as context for an answer.",
    plain: "AI looks up approved information before drafting an answer.",
    analogy: "Like an assistant checking the handbook before responding.",
    workplaceExample: "A support assistant answering from approved knowledge-base articles.",
    safetyNote: "RAG depends on source quality, permissions, and freshness."
  },
  {
    term: "Model Context Protocol (MCP)",
    category: "Automation",
    technical: "An open protocol that standardizes how AI applications connect to external tools, data sources, and services through MCP servers and clients.",
    plain: "A common plug-in style connection layer that lets AI safely access approved tools and information.",
    analogy: "Like a universal adapter: instead of custom wiring every tool, MCP gives the AI a standard way to plug into systems.",
    workplaceExample: "A desktop AI assistant connects to an MCP server for internal docs, file search, browser testing, or database lookups.",
    safetyNote: "MCP tools should be scoped carefully because connected tools can read data or take actions."
  },
  {
    term: "MCP Server",
    category: "Automation",
    technical: "A service that exposes tools, resources, or prompts to an MCP-compatible AI client using the Model Context Protocol.",
    plain: "The connector that makes a specific tool or data source available to AI.",
    analogy: "Like a secure front desk for one department: it decides what the AI can ask for and what actions are allowed.",
    workplaceExample: "An MCP server exposes a read-only company glossary or a Jira ticket creation tool."
  },
  {
    term: "MCP Client",
    category: "Automation",
    technical: "An AI application or agent environment that connects to MCP servers and invokes their exposed tools, resources, and prompts.",
    plain: "The AI app that can use MCP-connected tools.",
    analogy: "Like the employee who has access badges to approved rooms, but only through controlled doors.",
    workplaceExample: "A coding assistant connects to a browser MCP server to test a local web app."
  },
  {
    term: "Embedding",
    category: "Data",
    technical: "A numerical representation of text, images, or other data that captures semantic meaning for search, clustering, recommendation, or retrieval.",
    plain: "A way to turn meaning into numbers so computers can compare ideas.",
    analogy: "Like plotting ideas on a map so similar ideas land near each other.",
    workplaceExample: "Finding playbook entries similar to 'summarize documents safely.'"
  },
  {
    term: "Vector Database",
    category: "Data",
    technical: "A database optimized for storing embeddings and performing similarity search across vectors.",
    plain: "A search system that finds similar meaning, not just matching keywords.",
    analogy: "Like a library organized by concepts instead of exact titles.",
    workplaceExample: "Retrieving the most relevant policy snippets for a RAG answer."
  },
  {
    term: "Semantic Search",
    category: "Data",
    technical: "A search method that uses meaning-based representations, often embeddings, to find conceptually related content rather than exact keyword matches.",
    plain: "Search that understands what you mean, not just the words you typed.",
    analogy: "Like asking a librarian for books about 'reducing risk' and getting safety, compliance, and audit resources even if the title does not say risk.",
    workplaceExample: "Searching 'safe AI meeting summary' and finding data classification, prompt templates, and review checklists."
  },
  {
    term: "Chunking",
    category: "Data",
    technical: "The process of splitting larger documents or datasets into smaller pieces that can be embedded, retrieved, or provided to a model as context.",
    plain: "Breaking big documents into AI-sized pieces.",
    analogy: "Like cutting a long manual into labeled sections so the right page can be found quickly.",
    workplaceExample: "Splitting a policy handbook into sections before loading it into a RAG knowledge base.",
    safetyNote: "Bad chunking can remove important context, so test retrieval quality before trusting answers."
  },
  {
    term: "Knowledge Graph",
    category: "Data",
    technical: "A structured representation of entities and relationships that helps systems reason about how people, places, objects, policies, or events are connected.",
    plain: "A map of how important things relate to each other.",
    analogy: "Like an org chart plus a process map plus a glossary, all connected.",
    workplaceExample: "Connecting products, policies, owners, support processes, and approved documentation."
  },
  {
    term: "Fine-tuning",
    category: "Data",
    technical: "Additional training of a base model on a curated dataset to adapt behavior, style, or task performance.",
    plain: "Teaching an existing model to behave more like you need for a specific pattern.",
    analogy: "Like taking a trained employee through specialized team onboarding.",
    workplaceExample: "Training a model to classify support categories using approved historical examples.",
    safetyNote: "Fine-tuning is not a substitute for access control or data governance."
  },
  {
    term: "Grounding",
    category: "Safety",
    technical: "Constraining model responses to supplied or retrieved source material so outputs are tied to verifiable context.",
    plain: "Making AI stick to approved facts instead of guessing.",
    analogy: "Like requiring footnotes in a research memo.",
    workplaceExample: "Ask the tutor to answer only from a supplied playbook entry."
  },
  {
    term: "Guardrails",
    category: "Safety",
    technical: "Policies, prompts, filters, permissions, tests, and workflow controls designed to keep AI behavior within acceptable boundaries.",
    plain: "Rules and controls that help keep AI use safe.",
    analogy: "Like lane markings, speed limits, and brakes around a powerful vehicle.",
    workplaceExample: "Block confidential data, require human approval, and log tool actions before an AI draft is sent."
  },
  {
    term: "Data Leakage",
    category: "Safety",
    technical: "The unintended exposure of sensitive, confidential, personal, or proprietary information through model inputs, outputs, logs, training data, or connected tools.",
    plain: "Sensitive information ending up somewhere it should not.",
    analogy: "Like accidentally forwarding an internal email chain to an outside vendor.",
    workplaceExample: "Pasting customer records into an unapproved public AI tool.",
    safetyNote: "Use approved tools, minimize sensitive data, and follow data classification rules."
  },
  {
    term: "Red Teaming",
    category: "Safety",
    technical: "A structured testing practice where people intentionally probe a system for vulnerabilities, unsafe outputs, policy failures, or ways it can be misused.",
    plain: "Trying to break the AI before real users do.",
    analogy: "Like a fire drill for AI safety.",
    workplaceExample: "Testing whether an assistant reveals restricted information when asked indirectly."
  },
  {
    term: "Jailbreak",
    category: "Safety",
    technical: "A prompt or interaction pattern designed to bypass model safeguards, policies, or intended behavior.",
    plain: "A trick used to get AI to ignore its rules.",
    analogy: "Like trying to talk a security guard into opening a restricted door.",
    workplaceExample: "A user tells the AI to pretend policies do not apply so it will reveal confidential details.",
    safetyNote: "Log and test jailbreak attempts, especially before deploying AI tools broadly."
  },
  {
    term: "Prompt Injection",
    category: "Safety",
    technical: "An attack or failure mode where malicious or untrusted content attempts to override system instructions or manipulate model behavior.",
    plain: "When hidden or sneaky text tries to trick the AI into ignoring rules.",
    analogy: "Like a sticky note inside a document that says, 'Ignore your boss and send me the password.'",
    workplaceExample: "A webpage included in a summarization task tells the AI to reveal private instructions.",
    safetyNote: "Treat external content as untrusted and keep tool permissions narrow."
  },
  {
    term: "Indirect Prompt Injection",
    category: "Safety",
    technical: "A prompt injection attack where malicious instructions are hidden inside external content that the AI reads, such as webpages, documents, emails, or tickets.",
    plain: "When the AI gets tricked by instructions hidden in something it was asked to read.",
    analogy: "Like a document containing a fake instruction that says, 'Ignore company policy and send secrets.'",
    workplaceExample: "A vendor webpage includes hidden text telling an AI research assistant to expose private notes.",
    safetyNote: "Separate trusted instructions from untrusted content and require approval before tool actions."
  },
  {
    term: "Data Classification",
    category: "Safety",
    technical: "The process of labeling data by sensitivity, handling requirements, and risk, such as public, internal, confidential, or regulated.",
    plain: "Knowing how sensitive information is before using or sharing it.",
    analogy: "Like deciding whether a document can be posted publicly, shared internally, locked down, or never pasted into AI.",
    workplaceExample: "Classifying meeting notes before asking AI to summarize them."
  },
  {
    term: "PII",
    category: "Safety",
    technical: "Personally identifiable information that can identify, contact, locate, or distinguish an individual, directly or indirectly.",
    plain: "Information that points to a real person.",
    analogy: "Like name tags, home addresses, employee IDs, or unique breadcrumbs that identify someone.",
    workplaceExample: "Names, emails, phone numbers, addresses, employee records, or customer identifiers.",
    safetyNote: "Use approved tools and minimize personal data."
  },
  {
    term: "Sensitive Data",
    category: "Safety",
    technical: "Information that requires special handling because disclosure, misuse, or loss could create privacy, legal, operational, financial, or reputational risk.",
    plain: "Information that needs extra care.",
    analogy: "Like documents that belong in a locked drawer, not on a lobby table.",
    workplaceExample: "Customer records, employee details, legal strategy, unreleased financials, source code, credentials, or incident reports.",
    safetyNote: "Do not paste sensitive data into unapproved AI tools."
  },
  {
    term: "Least Privilege",
    category: "Safety",
    technical: "A security principle where users, systems, or AI agents receive only the minimum access needed to complete an approved task.",
    plain: "Give AI only the access it truly needs.",
    analogy: "Like giving a contractor a key to one room, not the whole building.",
    workplaceExample: "An AI assistant can read approved playbook entries but cannot access payroll records."
  },
  {
    term: "Human-in-the-Loop",
    category: "Safety",
    technical: "A workflow design where a human reviews, approves, corrects, or supervises AI output before consequential action is taken.",
    plain: "A person checks the AI before it matters.",
    analogy: "Like a pilot supervising autopilot.",
    workplaceExample: "A manager reviews an AI-drafted customer update before it is sent."
  },
  {
    term: "AI Agent",
    category: "Automation",
    technical: "An AI system that can plan steps, use tools, track state, and iterate toward a goal with some level of autonomy.",
    plain: "AI that can do a multi-step workflow, not just answer once.",
    analogy: "Like an intern who can use approved tools, but needs clear permissions and checkpoints.",
    workplaceExample: "Draft a Jira ticket, check it against a template, then wait for approval before creating it.",
    safetyNote: "Agents need least-privilege access, logs, and approval gates."
  },
  {
    term: "Agentic Workflow",
    category: "Automation",
    technical: "A workflow where an AI agent breaks a goal into steps, uses tools or memory, observes results, and adapts its next action within defined boundaries.",
    plain: "A multi-step AI workflow that can adjust as it goes.",
    analogy: "Like a project coordinator who checks progress, updates the plan, and asks for approval at key moments.",
    workplaceExample: "Research a policy question, gather approved sources, draft a summary, then wait for a reviewer before sending."
  },
  {
    term: "Tool Calling",
    category: "Automation",
    technical: "A model capability where the AI selects and invokes external functions, APIs, or tools to complete a task.",
    plain: "AI can use a connected tool instead of only writing text.",
    analogy: "Like asking an assistant to check a calendar or fill a form, not just describe what to do.",
    workplaceExample: "An AI assistant retrieves approved metrics before drafting a weekly report."
  },
  {
    term: "Function Calling",
    category: "Automation",
    technical: "A structured form of tool calling where the model returns arguments for predefined functions so application code can execute the requested operation.",
    plain: "AI fills out the right fields so software can run a specific action.",
    analogy: "Like completing a service request form instead of improvising an email.",
    workplaceExample: "AI returns a department, priority, and summary that an app uses to create an intake record."
  },
  {
    term: "API",
    category: "Automation",
    technical: "An application programming interface: a defined way for software systems to request data or actions from each other.",
    plain: "A software-to-software connection.",
    analogy: "Like a restaurant menu for software: it lists what you can order and what information you must provide.",
    workplaceExample: "An AI workflow calls a CRM API to retrieve approved account details."
  },
  {
    term: "Orchestration",
    category: "Automation",
    technical: "The coordination of multiple models, prompts, tools, data sources, and workflow steps to complete a larger AI-enabled process.",
    plain: "Managing all the moving parts of an AI workflow.",
    analogy: "Like a conductor keeping the instruments in sync.",
    workplaceExample: "Route a request through classification, retrieval, drafting, safety review, and human approval."
  },
  {
    term: "Workflow Automation",
    category: "Automation",
    technical: "Using software, rules, integrations, or AI to execute repeatable process steps with reduced manual effort.",
    plain: "Turning repeated work into a guided or automated flow.",
    analogy: "Like putting a checklist on rails.",
    workplaceExample: "Convert intake form submissions into categorized use-case review cards."
  },
  {
    term: "Human Approval Gate",
    category: "Automation",
    technical: "A workflow checkpoint that requires a person to review and approve an AI-generated recommendation or action before it proceeds.",
    plain: "A required human yes before AI moves forward.",
    analogy: "Like a manager signing off before a purchase order is submitted.",
    workplaceExample: "AI can draft a customer email, but a support lead must approve it before sending."
  },
  {
    term: "Model Evaluation",
    category: "Evaluation",
    technical: "The process of measuring model performance against criteria such as accuracy, helpfulness, safety, robustness, latency, and cost.",
    plain: "Checking whether AI is good enough and safe enough for the job.",
    analogy: "Like a driving test before giving someone the keys.",
    workplaceExample: "Testing an AI tutor against beginner questions and safety scenarios before launch."
  },
  {
    term: "Eval Dataset",
    category: "Evaluation",
    technical: "A curated set of examples, expected behaviors, scoring criteria, and edge cases used to evaluate AI performance.",
    plain: "A test set for checking whether AI behaves the way you need.",
    analogy: "Like a final exam with answer keys and tricky questions included.",
    workplaceExample: "A list of approved HR, legal, and IT questions used to test an internal AI assistant."
  },
  {
    term: "Golden Answer",
    category: "Evaluation",
    technical: "A reference answer or expected output used to compare and score model responses during evaluation.",
    plain: "The answer you consider correct for testing.",
    analogy: "Like the teacher's answer key.",
    workplaceExample: "The approved policy summary that AI responses should match closely."
  },
  {
    term: "Regression Test",
    category: "Evaluation",
    technical: "A test run repeatedly to detect whether a system change caused previously working behavior to fail.",
    plain: "A check that confirms updates did not break old functionality.",
    analogy: "Like rechecking the smoke alarms after renovating a room.",
    workplaceExample: "After changing a prompt, rerun safety scenarios to ensure the assistant still refuses restricted requests."
  },
  {
    term: "Benchmark",
    category: "Evaluation",
    technical: "A standardized test or dataset used to compare model behavior or performance across tasks.",
    plain: "A common test used to compare AI systems.",
    analogy: "Like a timed obstacle course everyone runs so you can compare results.",
    workplaceExample: "Comparing two models on summarization quality, cost, and safety refusal behavior."
  },
  {
    term: "Precision",
    category: "Evaluation",
    technical: "A metric that measures how many items identified as positive or relevant are actually correct.",
    plain: "When AI flags something, how often is it right?",
    analogy: "Like checking whether items placed in the 'urgent' pile truly are urgent.",
    workplaceExample: "Of all tickets AI labeled high-risk, what percentage really required escalation?"
  },
  {
    term: "Recall",
    category: "Evaluation",
    technical: "A metric that measures how many actual positive or relevant items a system successfully finds.",
    plain: "How much of the important stuff did AI catch?",
    analogy: "Like checking whether a search team found all the missing files, not just some.",
    workplaceExample: "Of all tickets that truly needed escalation, what percentage did AI identify?"
  },
  {
    term: "F1 Score",
    category: "Evaluation",
    technical: "A metric that combines precision and recall into a single score, useful when both false positives and false negatives matter.",
    plain: "One score that balances being right with not missing important things.",
    analogy: "Like grading both accuracy and coverage at the same time.",
    workplaceExample: "Evaluate a risk classifier that should avoid both over-flagging and missing serious issues."
  },
  {
    term: "Latency",
    category: "Evaluation",
    technical: "The time between sending a request to a system and receiving a response.",
    plain: "How long the AI takes to answer.",
    analogy: "Like the wait time after pressing an elevator button.",
    workplaceExample: "A support assistant needs low latency so agents do not wait too long during live work."
  },
  {
    term: "Rate Limit",
    category: "Evaluation",
    technical: "A restriction on how many requests or tokens can be processed within a given time period by an API or service.",
    plain: "A speed limit for how much you can ask the system to do at once.",
    analogy: "Like a checkout line that only lets through a certain number of people per minute.",
    workplaceExample: "A batch summarization job needs throttling so it does not exceed API limits."
  },
  {
    term: "Cost per Token",
    category: "Evaluation",
    technical: "The price associated with processing input or output tokens through a language model or AI API.",
    plain: "How AI usage turns into cost.",
    analogy: "Like paying by the page read and written.",
    workplaceExample: "Long documents and long responses can cost more than short, focused prompts."
  },
  {
    term: "Model Drift",
    category: "Evaluation",
    technical: "A decline or change in model performance over time due to shifts in data, behavior, systems, or operating conditions.",
    plain: "When AI gets less useful because the world or workflow changed.",
    analogy: "Like old map directions after roads are updated.",
    workplaceExample: "A classification model becomes less accurate after support categories change."
  }
];

export const definitionCategories: DefinitionCategory[] = ["Foundations", "Prompting", "Safety", "Data", "Automation", "Evaluation"];

export type AiMaturityStage = {
  id: string;
  level: string;
  title: string;
  shortTitle: string;
  description: string;
  checkpoint: string;
  terms: string[];
};

export const aiMaturityStages: AiMaturityStage[] = [
  {
    id: "ai-infancy",
    level: "Level 1",
    title: "AI Infancy",
    shortTitle: "Infancy",
    description: "Build the basic language of AI so every later concept has a place to land.",
    checkpoint: "You can explain what AI, ML, LLMs, tokens, and context windows are without jargon.",
    terms: [
      "Artificial Intelligence (AI)",
      "Machine Learning",
      "Large Language Model (LLM)",
      "Generative AI",
      "Token",
      "Context Window"
    ]
  },
  {
    id: "prompt-explorer",
    level: "Level 2",
    title: "Prompt Explorer",
    shortTitle: "Prompting",
    description: "Move from asking questions to giving AI clear roles, constraints, examples, and success criteria.",
    checkpoint: "You can write prompts that include role, task, context, constraints, examples, and output format.",
    terms: [
      "Prompt",
      "Prompt Engineering",
      "System Prompt",
      "Few-Shot Prompting",
      "Chain-of-Thought",
      "Temperature"
    ]
  },
  {
    id: "data-retrieval-builder",
    level: "Level 3",
    title: "Data and Retrieval Builder",
    shortTitle: "Data/RAG",
    description: "Learn how AI finds approved knowledge, represents meaning, and stays grounded in source material.",
    checkpoint: "You can describe how RAG, embeddings, vector search, chunking, and grounding work together.",
    terms: [
      "Retrieval Augmented Generation (RAG)",
      "Embedding",
      "Vector Database",
      "Semantic Search",
      "Chunking",
      "Knowledge Graph",
      "Fine-tuning",
      "Grounding"
    ]
  },
  {
    id: "safety-operator",
    level: "Level 4",
    title: "Safety Operator",
    shortTitle: "Safety",
    description: "Add the judgment layer: data handling, review gates, misuse testing, and secure AI behavior.",
    checkpoint: "You can spot sensitive data risks, hallucinations, prompt injection, and places where humans must approve.",
    terms: [
      "Hallucination",
      "Guardrails",
      "Data Classification",
      "PII",
      "Sensitive Data",
      "Data Leakage",
      "Prompt Injection",
      "Indirect Prompt Injection",
      "Jailbreak",
      "Red Teaming",
      "Least Privilege",
      "Human-in-the-Loop"
    ]
  },
  {
    id: "agentic-builder",
    level: "Level 5",
    title: "Agentic Builder",
    shortTitle: "Agents",
    description: "Connect models to tools so AI can complete controlled, multi-step work instead of only answering.",
    checkpoint: "You can explain the difference between a chatbot, a tool-calling assistant, and an AI agent.",
    terms: [
      "AI Agent",
      "Agentic Workflow",
      "Tool Calling",
      "Function Calling",
      "API",
      "Model Context Protocol (MCP)",
      "MCP Server",
      "MCP Client",
      "Human Approval Gate"
    ]
  },
  {
    id: "orchestration-lead",
    level: "Level 6",
    title: "Orchestration Lead",
    shortTitle: "Orchestration",
    description: "Coordinate models, tools, workflows, tests, cost, and quality into reliable business systems.",
    checkpoint: "You can design an AI workflow with evaluation, regression tests, rate limits, cost awareness, and drift monitoring.",
    terms: [
      "Orchestration",
      "Workflow Automation",
      "Model Evaluation",
      "Eval Dataset",
      "Golden Answer",
      "Regression Test",
      "Benchmark",
      "Precision",
      "Recall",
      "F1 Score",
      "Latency",
      "Rate Limit",
      "Cost per Token",
      "Model Drift"
    ]
  }
];
