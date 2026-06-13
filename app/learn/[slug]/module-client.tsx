"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { BrainCircuit, CheckCircle2, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck, Sparkles, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Lesson = { id: string; title: string; body: string; order: number };
type Question = { id: string; prompt: string; options: string; answer: string };

const scenarioChoices = [
  {
    label: "Green light",
    tone: "border-emerald-300 bg-emerald-50 text-emerald-950",
    copy: "Low-risk task, approved data, human review available."
  },
  {
    label: "Needs guardrails",
    tone: "border-amber-300 bg-amber-50 text-amber-950",
    copy: "Useful idea, but data sensitivity, approval, or scope needs review."
  },
  {
    label: "Stop and escalate",
    tone: "border-rose-300 bg-rose-50 text-rose-950",
    copy: "Sensitive, regulated, high-impact, or irreversible without governance."
  }
];

function FlipCard({
  id,
  title,
  front,
  back,
  flipped,
  onFlip
}: {
  id: string;
  title: string;
  front: string;
  back: string;
  flipped: boolean;
  onFlip: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onFlip(id)}
      className={cn(
        "min-h-44 rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-soft",
        flipped ? "border-blue-500 bg-blue-50" : "bg-white"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Badge className={flipped ? "border-blue-200 bg-white text-blue-800" : "bg-slate-50 text-slate-600"}>{flipped ? "Revealed" : "Tap to flip"}</Badge>
        <RotateCcw size={16} className={flipped ? "text-blue-700" : "text-slate-400"} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{flipped ? back : front}</p>
    </button>
  );
}

export function ModuleClient({
  module,
  lessons,
  questions
}: {
  module: {
    title: string;
    level: string;
    duration: number;
    summary: string;
    content: string;
    examples: string;
    takeaways: string;
  };
  lessons: Lesson[];
  questions: Question[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, string>>({});
  const steps = useMemo(() => ["Mission Brief", ...lessons.map((lesson) => lesson.title), "Boss Level"], [lessons]);
  const examples = module.examples.split("\n").filter(Boolean);
  const takeaways = module.takeaways.split("\n").filter(Boolean);
  const activeLesson = lessons[step - 1];
  const flipCount = Object.values(flipped).filter(Boolean).length;
  const scenarioCount = Object.keys(scenarioAnswers).length;
  const quizCorrect = questions.filter((question) => answers[question.id] === question.answer).length;
  const score = questions.length ? Math.round((quizCorrect / questions.length) * 100) : 0;
  const xp = Math.min(100, flipCount * 8 + scenarioCount * 10 + quizCorrect * 15 + (completed ? 20 : 0));
  const progress = completed ? 100 : Math.round(((step + 1) / steps.length) * 100);

  function flip(id: string) {
    setFlipped((current) => ({ ...current, [id]: !current[id] }));
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else setCompleted(true);
  }

  function previous() {
    setStep(Math.max(0, step - 1));
  }

  const overviewCards = [
    {
      title: "What this really means",
      front: "Tap for the plain-English version.",
      back: module.content.replaceAll("#", "").split("\n").filter(Boolean).slice(1, 3).join(" ").slice(0, 260) + "..."
    },
    {
      title: "Business example",
      front: "Tap to see how a team might use it.",
      back: examples[0] ?? "Use AI for low-risk drafting, summarization, and workflow planning with human review."
    },
    {
      title: "Safety move",
      front: "Tap for the guardrail.",
      back: takeaways.at(-1) ?? "Use approved data, verify facts, and require human review for high-impact work."
    }
  ];

  const lessonCards = activeLesson
    ? [
        {
          title: "Core idea",
          front: "Tap for the main lesson.",
          back: activeLesson.body
        },
        {
          title: "What good looks like",
          front: "Tap for the winning behavior.",
          back: "Use approved context, ask for a specific output, and make the review step obvious before anyone acts on the AI output."
        },
        {
          title: "Risk signal",
          front: "Tap for the thing to watch.",
          back: "If the task uses sensitive data, affects people, changes records, or creates an external commitment, slow down and add an approval gate."
        }
      ]
    : [];

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
      <aside className="space-y-4">
        <div className="rounded-lg border border-slate-800 bg-[#070b16] p-4 text-white shadow-soft">
          <div className="flex flex-wrap gap-2">
            <Badge className="border-blue-400/40 bg-blue-400/10 text-blue-100">{module.level}</Badge>
            <Badge className="border-cyan-300/40 bg-cyan-300/10 text-cyan-100">{module.duration} min</Badge>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{module.title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">Flip cards, make quick calls, beat the boss check, and earn the completion badge.</p>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-300">
                <span>Mission progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-slate-800" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs text-slate-300">
                <span>XP earned</span>
                <span>{xp}/100</span>
              </div>
              <Progress value={xp} className="bg-slate-800" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-2">
          {steps.map((label, index) => (
            <button
              key={label}
              onClick={() => setStep(index)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-medium",
                step === index ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <span className={cn("flex size-6 items-center justify-center rounded-full border text-xs", step >= index || completed ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300")}>
                {step > index || completed ? <CheckCircle2 size={14} /> : index + 1}
              </span>
              {label}
            </button>
          ))}
        </div>
        <div className="rounded-lg border bg-white p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
            <Trophy size={17} className="text-blue-700" />
            Badge criteria
          </div>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
            <li>Flip at least 3 cards.</li>
            <li>Make at least 2 scenario calls.</li>
            <li>Score 100% on the boss check.</li>
          </ul>
        </div>
      </aside>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        {completed ? (
          <div className="flex min-h-[520px] flex-col justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_36px_rgba(37,99,235,0.35)]">
              <Trophy size={30} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold text-slate-950">Mission complete</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              You earned {xp} XP and scored {score}% on the boss check. This module is ready to apply with approved data and a human review step.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border bg-slate-50 p-4">
                <p className="text-2xl font-semibold text-slate-950">{flipCount}</p>
                <p className="text-xs text-slate-500">Cards flipped</p>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4">
                <p className="text-2xl font-semibold text-slate-950">{scenarioCount}</p>
                <p className="text-xs text-slate-500">Risk calls made</p>
              </div>
              <div className="rounded-lg border bg-slate-50 p-4">
                <p className="text-2xl font-semibold text-slate-950">{score}%</p>
                <p className="text-xs text-slate-500">Boss check score</p>
              </div>
            </div>
            <Button className="mt-6 w-fit" onClick={() => { setCompleted(false); setStep(0); }}>
              Replay mission
            </Button>
          </div>
        ) : step === 0 ? (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-800 bg-[#070b16] p-5 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <Sparkles size={18} />
                Mission brief
              </div>
              <h2 className="mt-4 text-3xl font-semibold">{module.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">{module.summary}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {overviewCards.map((card, index) => (
                <FlipCard
                  key={card.title}
                  id={`overview-${index}`}
                  title={card.title}
                  front={card.front}
                  back={card.back}
                  flipped={Boolean(flipped[`overview-${index}`])}
                  onFlip={flip}
                />
              ))}
            </div>
            <div className="prose-lite max-w-none rounded-lg border bg-slate-50 p-5">
              <ReactMarkdown>{module.content}</ReactMarkdown>
            </div>
          </div>
        ) : activeLesson ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Mission {activeLesson.order}</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">{activeLesson.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Flip the cards, then make a risk call. No typing required.</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {lessonCards.map((card, index) => (
                <FlipCard
                  key={card.title}
                  id={`lesson-${activeLesson.id}-${index}`}
                  title={card.title}
                  front={card.front}
                  back={card.back}
                  flipped={Boolean(flipped[`lesson-${activeLesson.id}-${index}`])}
                  onFlip={flip}
                />
              ))}
            </div>
            <div className="rounded-lg border bg-white p-5">
              <div className="flex items-center gap-2">
                <BrainCircuit size={19} className="text-blue-700" />
                <h3 className="font-semibold text-slate-950">Risk-call challenge</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A teammate wants to use AI for this concept with internal workflow notes and asks whether they can try a small prototype. What is the right call?
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {scenarioChoices.map((choice) => {
                  const selected = scenarioAnswers[activeLesson.id] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => setScenarioAnswers({ ...scenarioAnswers, [activeLesson.id]: choice.label })}
                      className={cn(
                        "rounded-lg border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft",
                        selected ? choice.tone : "bg-white hover:border-blue-300"
                      )}
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {selected ? <CheckCircle2 size={17} /> : <Zap size={17} className="text-blue-700" />}
                        {choice.label}
                      </div>
                      <p className="mt-2 text-sm leading-6">{choice.copy}</p>
                    </button>
                  );
                })}
              </div>
              {scenarioAnswers[activeLesson.id] && (
                <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3 text-sm leading-6 text-blue-950">
                  Nice. The strongest answer is usually <span className="font-semibold">Needs guardrails</span>: use approved sample data, define scope, and keep human review in the loop.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-950">
              <ShieldCheck size={20} />
              <p className="text-sm">Boss level: choose the best answer. The correct answer reveals immediately so this feels like practice, not a test.</p>
            </div>
            {questions.map((question) => (
              <div key={question.id} className="rounded-lg border p-4">
                <h3 className="font-semibold text-slate-950">{question.prompt}</h3>
                <div className="mt-4 grid gap-2 md:grid-cols-2">
                  {question.options.split("|").map((option) => {
                    const chosen = answers[question.id] === option;
                    const answered = Boolean(answers[question.id]);
                    const correct = option === question.answer;
                    return (
                      <button
                        key={option}
                        onClick={() => setAnswers({ ...answers, [question.id]: option })}
                        className={cn(
                          "rounded-md border px-4 py-3 text-left text-sm transition hover:-translate-y-0.5",
                          chosen && correct && "border-emerald-500 bg-emerald-50 text-emerald-900",
                          chosen && !correct && "border-rose-500 bg-rose-50 text-rose-900",
                          !chosen && answered && correct && "border-emerald-200 bg-emerald-50 text-emerald-900",
                          !chosen && !answered && "hover:border-blue-300 hover:bg-slate-50"
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-slate-950 p-4 text-white">
              <p className="text-sm text-slate-300">Boss check score</p>
              <p className="mt-1 text-3xl font-semibold">{score}%</p>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t pt-5">
          <Button variant="outline" onClick={previous} disabled={step === 0}>
            <ChevronLeft size={16} /> Back
          </Button>
          <Button onClick={next}>
            {step === steps.length - 1 ? "Complete mission" : "Continue"} <ChevronRight size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
