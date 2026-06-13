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
    term: "Prompt Injection",
    category: "Safety",
    technical: "An attack or failure mode where malicious or untrusted content attempts to override system instructions or manipulate model behavior.",
    plain: "When hidden or sneaky text tries to trick the AI into ignoring rules.",
    analogy: "Like a sticky note inside a document that says, 'Ignore your boss and send me the password.'",
    workplaceExample: "A webpage included in a summarization task tells the AI to reveal private instructions.",
    safetyNote: "Treat external content as untrusted and keep tool permissions narrow."
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
    term: "Tool Calling",
    category: "Automation",
    technical: "A model capability where the AI selects and invokes external functions, APIs, or tools to complete a task.",
    plain: "AI can use a connected tool instead of only writing text.",
    analogy: "Like asking an assistant to check a calendar or fill a form, not just describe what to do.",
    workplaceExample: "An AI assistant retrieves approved metrics before drafting a weekly report."
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
    term: "Model Evaluation",
    category: "Evaluation",
    technical: "The process of measuring model performance against criteria such as accuracy, helpfulness, safety, robustness, latency, and cost.",
    plain: "Checking whether AI is good enough and safe enough for the job.",
    analogy: "Like a driving test before giving someone the keys.",
    workplaceExample: "Testing an AI tutor against beginner questions and safety scenarios before launch."
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
    term: "Latency",
    category: "Evaluation",
    technical: "The time between sending a request to a system and receiving a response.",
    plain: "How long the AI takes to answer.",
    analogy: "Like the wait time after pressing an elevator button.",
    workplaceExample: "A support assistant needs low latency so agents do not wait too long during live work."
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
