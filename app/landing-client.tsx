"use client";

import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Fingerprint, Lock, Route, ShieldCheck, Sparkles, UserPlus } from "lucide-react";
import { aiDefinitions, aiMaturityStages } from "@/lib/definitions";
import { cn } from "@/lib/utils";

type Mode = "signup" | "login";
type Account = {
  username: string;
  password: string;
  createdAt: string;
};
type Session = {
  username: string;
  signedInAt: string;
};
type AssessmentResult = {
  stageId: string;
  score: number;
  answers: Record<string, number>;
  completedAt: string;
};
type AssessmentOption = {
  label: string;
  description: string;
  stageIndex: number;
};
type AssessmentQuestion = {
  id: string;
  prompt: string;
  options: AssessmentOption[];
};

const accountsKey = "ai-academy-users";
const sessionKey = "ai-academy-session";

const assessmentKey = (username: string) => `ai-academy-assessment:${username}`;

const stageActions: Record<string, { label: string; href: string; note: string }> = {
  "ai-infancy": {
    label: "Start AI foundations",
    href: "/learn/ai-in-plain-english",
    note: "Begin with plain-English AI concepts."
  },
  "prompt-explorer": {
    label: "Practice prompting",
    href: "/learn/prompt-engineering-basics",
    note: "Build better briefs, examples, and output formats."
  },
  "data-retrieval-builder": {
    label: "Explore RAG",
    href: "/learn/intro-to-rag",
    note: "Learn how approved knowledge reaches the model."
  },
  "safety-operator": {
    label: "Complete safety checks",
    href: "/learn/responsible-ai-data-safety",
    note: "Add guardrails, review gates, and data handling discipline."
  },
  "agentic-builder": {
    label: "Build agent fluency",
    href: "/learn/intro-to-ai-agents",
    note: "Understand tools, MCP, agents, and approval gates."
  },
  "orchestration-lead": {
    label: "Review orchestration playbook",
    href: "/playbook",
    note: "Connect evaluation, cost, quality, and workflow automation."
  }
};

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "language",
    prompt: "When someone says LLM, tokens, or context window, you feel...",
    options: [
      { label: "Still learning", description: "I want the plain-English basics first.", stageIndex: 0 },
      { label: "Mostly comfortable", description: "I can explain the common terms.", stageIndex: 1 },
      { label: "Advanced", description: "I can connect those terms to RAG, agents, and MCP.", stageIndex: 4 }
    ]
  },
  {
    id: "prompting",
    prompt: "How do you usually ask AI to do work?",
    options: [
      { label: "Simple requests", description: "I ask like I would ask a search engine.", stageIndex: 0 },
      { label: "Structured prompts", description: "I include role, task, context, and format.", stageIndex: 1 },
      { label: "Reusable patterns", description: "I build prompts others can repeat safely.", stageIndex: 2 }
    ]
  },
  {
    id: "knowledge",
    prompt: "How familiar are you with grounding AI in approved knowledge?",
    options: [
      { label: "Not yet", description: "I am not sure how AI finds trusted sources.", stageIndex: 1 },
      { label: "Somewhat", description: "I understand why source grounding matters.", stageIndex: 2 },
      { label: "Hands-on", description: "I can talk through RAG, embeddings, and vector search.", stageIndex: 3 }
    ]
  },
  {
    id: "safety",
    prompt: "Before using AI output at work, what do you do?",
    options: [
      { label: "Use if it sounds right", description: "I usually trust polished output.", stageIndex: 0 },
      { label: "Review and verify", description: "I check facts, data sensitivity, and fit.", stageIndex: 3 },
      { label: "Design guardrails", description: "I think in approvals, red teams, and audit trails.", stageIndex: 4 }
    ]
  },
  {
    id: "agents",
    prompt: "What is your comfort level with AI agents and orchestration?",
    options: [
      { label: "Chatbots only", description: "I mostly use AI for answers and drafts.", stageIndex: 2 },
      { label: "Tool calling", description: "I understand assistants that use tools and approval gates.", stageIndex: 4 },
      { label: "Workflow systems", description: "I can reason about evals, cost, drift, and automated workflows.", stageIndex: 5 }
    ]
  }
];

function loadAccounts(): Account[] {
  const raw = window.localStorage.getItem(accountsKey);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Account[];
  } catch {
    return [];
  }
}

function loadSession(): Session | null {
  const raw = window.localStorage.getItem(sessionKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

function loadAssessment(username: string): AssessmentResult | null {
  const raw = window.localStorage.getItem(assessmentKey(username));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AssessmentResult;
  } catch {
    return null;
  }
}

export function LandingClient() {
  const [mode, setMode] = useState<Mode>("signup");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [reviewedTerms, setReviewedTerms] = useState<string[]>([]);
  const [assessment, setAssessment] = useState<AssessmentResult | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [message, setMessage] = useState("");

  const journeyTerms = useMemo(() => Array.from(new Set(aiMaturityStages.flatMap((stage) => stage.terms))), []);
  const totalJourneyTerms = journeyTerms.length;
  const reviewedJourneyTerms = journeyTerms.filter((term) => reviewedTerms.includes(term)).length;
  const journeyProgress = totalJourneyTerms ? Math.round((reviewedJourneyTerms / totalJourneyTerms) * 100) : 0;
  const nextUncollectedStage = aiMaturityStages.find((stage) => stage.terms.some((term) => !reviewedTerms.includes(term))) ?? aiMaturityStages[aiMaturityStages.length - 1];
  const progressStageIndex = Math.max(0, aiMaturityStages.findIndex((stage) => stage.id === nextUncollectedStage.id));
  const assessmentStageIndex = assessment ? Math.max(0, aiMaturityStages.findIndex((stage) => stage.id === assessment.stageId)) : 0;
  const currentStageIndex = Math.max(progressStageIndex, assessmentStageIndex);
  const currentStage = aiMaturityStages[currentStageIndex];
  const currentStageReviewed = currentStage.terms.filter((term) => reviewedTerms.includes(term)).length;
  const currentAction = stageActions[currentStage.id];
  const isAssessing = Boolean(session && !assessment);
  const heroTitle = !session
    ? "Start your AI maturity journey."
    : isAssessing
      ? "Calibrate your AI path in under a minute."
      : "Your next AI move is ready.";
  const heroCopy = !session
    ? "Create a lightweight academy profile, return to saved progress, and get a clear next move across lessons, definitions, playbooks, and applied AI workflows."
    : isAssessing
      ? "Answer five quick checkpoints so the academy can place you at the right maturity level and recommend the first lesson that actually fits."
      : "Continue from your current maturity level with a guided path across definitions, lessons, playbooks, and applied workflows.";
  const heroStats = isAssessing
    ? [
        { value: assessmentQuestions.length.toString(), label: "quick taps" },
        { value: "<1", label: "minute" },
        { value: "1", label: "guided path" }
      ]
    : [
        { value: aiMaturityStages.length.toString(), label: "maturity levels" },
        { value: aiDefinitions.length.toString(), label: "AI terms" },
        { value: "0", label: "typing-heavy tasks" }
      ];

  useEffect(() => {
    const activeSession = loadSession();
    setSession(activeSession);
    if (activeSession) {
      setMode("login");
      loadReviewedTerms(activeSession.username);
      setAssessment(loadAssessment(activeSession.username));
    }
  }, []);

  const loadReviewedTerms = (activeUsername: string) => {
    const saved = window.localStorage.getItem(`ai-academy-reviewed-terms:${activeUsername}`);
    if (!saved) {
      setReviewedTerms([]);
      return;
    }
    try {
      setReviewedTerms(JSON.parse(saved) as string[]);
    } catch {
      setReviewedTerms([]);
    }
  };

  const activateSession = (activeUsername: string) => {
    const nextSession = { username: activeUsername, signedInAt: new Date().toISOString() };
    window.localStorage.setItem(sessionKey, JSON.stringify(nextSession));
    setSession(nextSession);
    loadReviewedTerms(activeUsername);
    setAssessment(loadAssessment(activeUsername));
    setAssessmentAnswers({});
    setPassword("");
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanUsername = username.trim();
    if (cleanUsername.length < 2) {
      setMessage("Use at least 2 characters for the username.");
      return;
    }
    if (password.length < 4) {
      setMessage("Use at least 4 characters for the password.");
      return;
    }

    const accounts = loadAccounts();
    const existing = accounts.find((account) => account.username.toLowerCase() === cleanUsername.toLowerCase());

    if (mode === "signup") {
      if (existing) {
        setMessage("That username already exists on this browser. Try existing user.");
        return;
      }
      const nextAccounts = [...accounts, { username: cleanUsername, password, createdAt: new Date().toISOString() }];
      window.localStorage.setItem(accountsKey, JSON.stringify(nextAccounts));
      window.localStorage.setItem(`ai-academy-reviewed-terms:${cleanUsername}`, JSON.stringify([]));
      window.localStorage.removeItem(assessmentKey(cleanUsername));
      activateSession(cleanUsername);
      return;
    }

    if (!existing || existing.password !== password) {
      setMessage("Those credentials do not match an account on this browser.");
      return;
    }
    activateSession(existing.username);
  };

  const signOut = () => {
    window.localStorage.removeItem(sessionKey);
    setSession(null);
    setReviewedTerms([]);
    setAssessment(null);
    setAssessmentAnswers({});
    setUsername("");
    setPassword("");
    setMessage("");
    setMode("login");
  };

  const completeAssessment = () => {
    if (!session || Object.keys(assessmentAnswers).length < assessmentQuestions.length) return;
    const average =
      Object.values(assessmentAnswers).reduce((total, stageIndex) => total + stageIndex, 0) / assessmentQuestions.length;
    const stageIndex = Math.min(aiMaturityStages.length - 1, Math.max(0, Math.round(average)));
    const result: AssessmentResult = {
      stageId: aiMaturityStages[stageIndex].id,
      score: Math.round((average / (aiMaturityStages.length - 1)) * 100),
      answers: assessmentAnswers,
      completedAt: new Date().toISOString()
    };
    window.localStorage.setItem(assessmentKey(session.username), JSON.stringify(result));
    setAssessment(result);
  };

  const retakeAssessment = () => {
    setAssessment(null);
    setAssessmentAnswers({});
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ai-command-center-hero.png')] bg-cover bg-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.94)_48%,rgba(0,22,54,0.82)_72%,rgba(4,143,184,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(91,221,245,0.18),transparent_26%),radial-gradient(circle_at_28%_78%,rgba(46,102,246,0.16),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/70" />

        <div className="relative mx-auto flex min-h-screen max-w-[1180px] flex-col px-5 py-6 sm:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-40 items-center justify-center rounded-sm bg-white px-5 shadow-[0_0_34px_rgba(0,164,255,0.22)] sm:h-14 sm:w-48">
                <img src="/axon-logo-cropped.png" alt="Axon" className="h-7 w-auto object-contain sm:h-9" />
              </div>
              <span className="hidden h-8 w-px bg-white/25 sm:block" />
              <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200 sm:text-base">AI Academy</span>
            </div>
            {session ? (
              <button onClick={signOut} className="rounded-sm border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:border-cyan-300 hover:bg-cyan-300/10">
                Sign out
              </button>
            ) : (
              <Link href="/definitions" className="rounded-sm border border-cyan-300/60 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-300 hover:text-black">
                Preview path
              </Link>
            )}
          </nav>

          <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:py-8">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300 sm:text-sm">Mission-ready AI fluency</p>
              <h1 className="text-4xl font-semibold leading-[0.98] sm:text-5xl lg:text-6xl">{heroTitle}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">{heroCopy}</p>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {heroStats.map((stat, index) => (
                  <div key={stat.label} className={cn("rounded-sm border bg-white/[0.055] p-4 backdrop-blur", index === 2 ? "border-cyan-300/30 bg-cyan-300/10" : "border-white/15")}>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
                {aiMaturityStages.slice(0, 4).map((stage) => (
                  <span key={stage.id} className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5">
                    {stage.shortTitle}
                  </span>
                ))}
              </div>
            </div>

            {!session ? (
              <section className="rounded-md border border-white/15 bg-[#0d1624]/85 p-5 shadow-[0_0_60px_rgba(0,163,255,0.16)] backdrop-blur-xl">
                <div className="mb-5 grid grid-cols-2 rounded-md border border-white/10 bg-black/40 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("signup");
                      setMessage("");
                    }}
                    className={cn("h-10 rounded-sm text-sm font-semibold", mode === "signup" ? "bg-cyan-300 text-black" : "text-slate-300 hover:text-white")}
                  >
                    New user
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setMessage("");
                    }}
                    className={cn("h-10 rounded-sm text-sm font-semibold", mode === "login" ? "bg-cyan-300 text-black" : "text-slate-300 hover:text-white")}
                  >
                    Existing user
                  </button>
                </div>

                <div className="mb-5">
                  <div className="flex size-11 items-center justify-center rounded-sm bg-cyan-300 text-black">
                    {mode === "signup" ? <UserPlus size={20} /> : <Fingerprint size={20} />}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold">{mode === "signup" ? "Create your academy profile" : "Welcome back"}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {mode === "signup"
                      ? "Use a simple username and password to start tracking your AI maturity path on this browser."
                      : "Enter your saved username and password to continue your path."}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Username</span>
                    <input
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      className="mt-2 h-11 w-full rounded-sm border border-white/15 bg-black/50 px-3 text-sm text-white outline-none focus:border-cyan-300"
                      placeholder="kevin"
                      autoComplete="username"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Password</span>
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="mt-2 h-11 w-full rounded-sm border border-white/15 bg-black/50 px-3 text-sm text-white outline-none focus:border-cyan-300"
                      placeholder="At least 4 characters"
                      type="password"
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    />
                  </label>
                  {message && <p className="rounded-sm border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100">{message}</p>}
                  <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-cyan-300 px-4 text-sm font-semibold text-black hover:bg-cyan-200">
                    {mode === "signup" ? "Create account" : "Log in"} <ArrowRight size={16} />
                  </button>
                </form>
              </section>
            ) : !assessment ? (
              <AssessmentPanel
                answers={assessmentAnswers}
                onAnswer={(questionId, stageIndex) => setAssessmentAnswers((current) => ({ ...current, [questionId]: stageIndex }))}
                onComplete={completeAssessment}
              />
            ) : (
              <section className="rounded-lg border border-white/15 bg-white/[0.08] p-5 shadow-[0_0_60px_rgba(0,163,255,0.16)] backdrop-blur-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Journey status</p>
                    <h2 className="mt-2 text-3xl font-semibold">Welcome, {session.username}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={retakeAssessment}
                    className="rounded-sm border border-white/20 px-3 py-2 text-xs font-semibold text-slate-100 hover:border-cyan-300 hover:bg-cyan-300/10"
                  >
                    Retake assessment
                  </button>
                </div>

                <div className="mt-5 rounded-md border border-white/10 bg-black/35 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Recommended starting level</p>
                      <p className="mt-1 text-xl font-semibold">{currentStage.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-semibold text-cyan-300">{assessment.score}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">readiness</p>
                    </div>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${journeyProgress}%` }} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Your assessment places you near {currentStage.shortTitle}. Your saved glossary progress is {journeyProgress}%, with {currentStageReviewed}/{currentStage.terms.length} cards collected in this level.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <JourneyLink href="/definitions" icon={<Sparkles size={17} />} title="Continue maturity board" note={`Collect remaining terms in ${currentStage.shortTitle}.`} />
                  <JourneyLink href={currentAction.href} icon={<CheckCircle2 size={17} />} title={currentAction.label} note={currentAction.note} />
                  <JourneyLink href="/playbook" icon={<ShieldCheck size={17} />} title="Review the AI playbook" note="Use approved recipes, templates, and safety checklists." />
                  <JourneyLink href="/dashboard" icon={<Lock size={17} />} title="Open full studio" note="See learning progress, submitted ideas, and recommended actions." />
                </div>
              </section>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function AssessmentPanel({
  answers,
  onAnswer,
  onComplete
}: {
  answers: Record<string, number>;
  onAnswer: (questionId: string, stageIndex: number) => void;
  onComplete: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = assessmentQuestions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === assessmentQuestions.length;
  const progress = Math.round((answeredCount / assessmentQuestions.length) * 100);

  const chooseAnswer = (questionId: string, stageIndex: number) => {
    onAnswer(questionId, stageIndex);
    if (currentIndex < assessmentQuestions.length - 1) {
      setCurrentIndex((index) => index + 1);
    }
  };

  return (
    <section className="rounded-md border border-white/15 bg-[#0d1624]/90 p-4 shadow-[0_0_60px_rgba(0,163,255,0.16)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">First-login assessment</p>
          <h2 className="mt-2 text-2xl font-semibold leading-tight">Find your AI starting point</h2>
          <p className="mt-1.5 text-sm leading-6 text-slate-300">Five taps. No typing required.</p>
        </div>
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-black">
          <Route size={22} />
        </div>
      </div>

      <div className="mt-4 rounded-md border border-white/10 bg-black/35 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Checkpoint {currentIndex + 1} of {assessmentQuestions.length}
          </p>
          <p className="text-sm font-semibold text-cyan-300">{progress}%</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold leading-7 text-white">{currentQuestion.prompt}</p>
          <div className="mt-3 grid gap-2.5">
            {currentQuestion.options.map((option) => {
              const selected = selectedAnswer === option.stageIndex;
              return (
                <button
                  key={`${currentQuestion.id}-${option.stageIndex}`}
                  type="button"
                  onClick={() => chooseAnswer(currentQuestion.id, option.stageIndex)}
                  className={cn(
                    "rounded-sm border p-3 text-left transition",
                    selected
                      ? "border-cyan-300 bg-cyan-300 text-black"
                      : "border-white/10 bg-white/[0.045] text-slate-200 hover:border-cyan-300/60 hover:bg-cyan-300/10"
                  )}
                >
                  <span className="block text-sm font-semibold">{option.label}</span>
                  <span className={cn("mt-1 block text-sm leading-5", selected ? "text-black/75" : "text-slate-400")}>{option.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
            disabled={currentIndex === 0}
            className="h-10 rounded-sm border border-white/15 px-4 text-sm font-semibold text-slate-200 hover:border-cyan-300 hover:bg-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>
          <div className="flex justify-center gap-1.5">
            {assessmentQuestions.map((question, index) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "size-2.5 rounded-full transition",
                  index === currentIndex ? "bg-cyan-300" : answers[question.id] !== undefined ? "bg-cyan-300/45" : "bg-white/20"
                )}
                aria-label={`Go to checkpoint ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onComplete}
            disabled={!isComplete}
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-sm bg-cyan-300 px-4 text-sm font-semibold text-black hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
          >
            Show path <ArrowRight size={16} />
          </button>
        </div>
        <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{answeredCount}/{assessmentQuestions.length} taps complete</p>
      </div>
    </section>
  );
}

function JourneyLink({ href, icon, title, note }: { href: string; icon: ReactNode; title: string; note: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] p-3 hover:border-cyan-300/60 hover:bg-cyan-300/10">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-cyan-300 text-black">{icon}</span>
      <span>
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="mt-0.5 block text-xs leading-5 text-slate-300">{note}</span>
      </span>
    </Link>
  );
}
