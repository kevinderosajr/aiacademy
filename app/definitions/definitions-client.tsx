"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, Lightbulb, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiDefinitions, aiMaturityStages, definitionCategories, type DefinitionCategory } from "@/lib/definitions";
import { cn } from "@/lib/utils";

type ActiveStage = string | "all";

const stageTone = [
  "from-cyan-400 to-blue-500",
  "from-blue-400 to-indigo-500",
  "from-emerald-400 to-cyan-500",
  "from-amber-300 to-cyan-400",
  "from-sky-400 to-blue-600",
  "from-white to-cyan-300"
];

export function DefinitionsClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DefinitionCategory | "All">("All");
  const [activeStageId, setActiveStageId] = useState<ActiveStage>(aiMaturityStages[0].id);
  const [expanded, setExpanded] = useState<string>(aiDefinitions[0].term);
  const [reviewed, setReviewed] = useState<Set<string>>(new Set([aiDefinitions[0].term]));
  const [storageKey, setStorageKey] = useState("ai-academy-reviewed-terms");
  const [hasLoadedProgress, setHasLoadedProgress] = useState(false);

  const definitionsByTerm = useMemo(() => new Map(aiDefinitions.map((definition) => [definition.term, definition])), []);
  const activeStage = aiMaturityStages.find((stage) => stage.id === activeStageId);
  const activeStageIndex = activeStage ? aiMaturityStages.findIndex((stage) => stage.id === activeStage.id) : -1;
  const journeyTerms = useMemo(() => Array.from(new Set(aiMaturityStages.flatMap((stage) => stage.terms))), []);

  const stageDefinitions = useMemo(() => {
    if (!activeStage) return aiDefinitions;
    return activeStage.terms.flatMap((term) => {
      const definition = definitionsByTerm.get(term);
      return definition ? [definition] : [];
    });
  }, [activeStage, definitionsByTerm]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stageDefinitions.filter((definition) => {
      const categoryMatch = category === "All" || definition.category === category;
      const queryMatch = [definition.term, definition.technical, definition.plain, definition.analogy, definition.workplaceExample]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, query, stageDefinitions]);

  const activeReviewedCount = stageDefinitions.filter((definition) => reviewed.has(definition.term)).length;
  const activeProgress = stageDefinitions.length ? Math.round((activeReviewedCount / stageDefinitions.length) * 100) : 0;
  const journeyReviewedCount = journeyTerms.filter((term) => reviewed.has(term)).length;
  const journeyProgress = Math.round((journeyReviewedCount / journeyTerms.length) * 100);

  const reviewTerm = (term: string) => {
    setExpanded((current) => (current === term ? "" : term));
    setReviewed((current) => new Set(current).add(term));
  };

  useEffect(() => {
    const session = window.localStorage.getItem("ai-academy-session");
    let username: string | undefined;
    try {
      username = session ? (JSON.parse(session).username as string | undefined) : undefined;
    } catch {
      username = undefined;
    }
    const key = username ? `ai-academy-reviewed-terms:${username}` : "ai-academy-reviewed-terms";
    const saved = window.localStorage.getItem(key);
    setStorageKey(key);
    if (saved) {
      try {
        const terms = JSON.parse(saved) as string[];
        setReviewed(new Set([aiDefinitions[0].term, ...terms]));
      } catch {
        setReviewed(new Set([aiDefinitions[0].term]));
      }
    }
    setHasLoadedProgress(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedProgress) return;
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(reviewed)));
  }, [hasLoadedProgress, reviewed, storageKey]);

  const nextStage = () => {
    if (activeStageIndex >= 0 && activeStageIndex < aiMaturityStages.length - 1) {
      const next = aiMaturityStages[activeStageIndex + 1];
      setActiveStageId(next.id);
      setCategory("All");
      setQuery("");
      setExpanded(next.terms[0]);
      setReviewed((current) => new Set(current).add(next.terms[0]));
    }
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-slate-800 bg-black text-white shadow-soft">
        <div className="border-b border-cyan-300/20 bg-[radial-gradient(circle_at_top_right,rgba(0,163,255,0.22),transparent_36%),linear-gradient(135deg,#020617,#05070b_52%,#08111f)] p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">AI maturity board</p>
              <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-normal">Move from AI basics to agentic orchestration</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Follow the path, click each stop, and collect terms as you review them. The journey starts with plain-English AI basics and ends with connected, measured, human-approved workflows.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-md border border-white/10 bg-white/10 p-3">
                <p className="text-2xl font-semibold">{aiDefinitions.length}</p>
                <p className="text-xs text-slate-300">terms</p>
              </div>
              <div className="rounded-md border border-white/10 bg-white/10 p-3">
                <p className="text-2xl font-semibold">{aiMaturityStages.length}</p>
                <p className="text-xs text-slate-300">levels</p>
              </div>
              <div className="rounded-md border border-cyan-300/30 bg-cyan-300/10 p-3">
                <p className="text-2xl font-semibold">{journeyProgress}%</p>
                <p className="text-xs text-slate-300">collected</p>
              </div>
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${journeyProgress}%` }} />
          </div>
        </div>

        <div className="relative p-4">
          <div className="absolute left-8 right-8 top-[5.25rem] hidden h-px bg-cyan-300/25 lg:block" />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {aiMaturityStages.map((stage, index) => {
              const isActive = stage.id === activeStageId;
              const stageReviewed = stage.terms.filter((term) => reviewed.has(term)).length;
              const isStarted = stageReviewed > 0;
              const isComplete = stageReviewed === stage.terms.length;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStageId(stage.id);
                    setCategory("All");
                    setQuery("");
                    setExpanded(stage.terms[0]);
                    setReviewed((current) => new Set(current).add(stage.terms[0]));
                  }}
                  className={cn(
                    "relative min-h-44 rounded-md border p-4 text-left transition",
                    isActive ? "border-cyan-300 bg-white text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.22)]" : "border-white/10 bg-white/[0.06] hover:border-cyan-300/60 hover:bg-white/[0.1]"
                  )}
                >
                  <div className={cn("mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br text-base font-semibold text-black", stageTone[index])}>
                    {index + 1}
                  </div>
                  <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", isActive ? "text-blue-700" : "text-cyan-200")}>{stage.level}</p>
                  <h3 className="mt-1 text-lg font-semibold">{stage.title}</h3>
                  <p className={cn("mt-2 min-h-12 text-xs leading-5", isActive ? "text-slate-600" : "text-slate-300")}>{stage.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs font-semibold">
                    <span className={cn("rounded-full border px-2 py-1", isActive ? "border-slate-200 text-slate-600" : "border-white/10 text-slate-300")}>
                      {stageReviewed}/{stage.terms.length} collected
                    </span>
                    <span className={cn("flex items-center gap-1", isComplete ? "text-emerald-500" : isStarted ? "text-cyan-300" : isActive ? "text-slate-500" : "text-slate-400")}>
                      {isComplete && <CheckCircle2 size={14} />}
                      {isComplete ? "Complete" : isActive ? "You are here" : isStarted ? "Started" : "Next stop"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{activeStage ? activeStage.level : "Reference mode"}</p>
              <h3 className="mt-1 text-2xl font-semibold text-slate-950">{activeStage ? activeStage.title : "Full Definitions Library"}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {activeStage ? activeStage.description : "Search every definition across the full library when you need a quick answer."}
              </p>
            </div>
            <button
              onClick={() => {
                setActiveStageId("all");
                setCategory("All");
                setQuery("");
              }}
              className={cn(
                "h-10 rounded-md border px-4 text-sm font-semibold",
                activeStageId === "all" ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700"
              )}
            >
              Full library
            </button>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${activeProgress}%` }} />
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {activeReviewedCount} of {stageDefinitions.length} cards collected in this view
          </p>
        </div>

        <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800">Checkpoint</p>
          <p className="mt-2 text-sm leading-6 text-cyan-950">
            {activeStage?.checkpoint ?? "Use full-library mode for lookup, then return to a stage to keep progressing through the maturity path."}
          </p>
          {activeStage && activeStageIndex < aiMaturityStages.length - 1 && (
            <button onClick={nextStage} className="mt-4 h-10 w-full rounded-md bg-black px-4 text-sm font-semibold text-white hover:bg-slate-800">
              Advance to {aiMaturityStages[activeStageIndex + 1].shortTitle}
            </button>
          )}
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative max-w-2xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search this level for MCP, RAG, agents, prompt injection..." className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All", ...definitionCategories] as const).map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold",
                  category === item ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {filtered.map((definition) => {
          const isExpanded = expanded === definition.term;
          const isReviewed = reviewed.has(definition.term);
          return (
            <Card key={definition.term} className={cn("overflow-hidden transition hover:border-blue-300", isExpanded && "border-blue-400 shadow-soft")}>
              <button className="w-full text-left" onClick={() => reviewTerm(definition.term)}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge className="border-blue-200 bg-blue-50 text-blue-800">{definition.category}</Badge>
                        {isReviewed && <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Collected</Badge>}
                      </div>
                      <CardTitle>{definition.term}</CardTitle>
                    </div>
                    <span className="rounded-full border px-2.5 py-1 text-xs font-semibold text-slate-500">{isExpanded ? "Collapse" : "Review"}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-slate-700">{definition.plain}</p>
                </CardContent>
              </button>
              {isExpanded && (
                <CardContent className="space-y-4 border-t bg-slate-50 p-5">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <BookOpen size={17} className="text-blue-700" />
                      Technical definition
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{definition.technical}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Lightbulb size={17} className="text-cyan-700" />
                      Analogy that clicks
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{definition.analogy}</p>
                  </div>
                  <div className="rounded-md border bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Workplace example</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{definition.workplaceExample}</p>
                  </div>
                  {definition.safetyNote && (
                    <div className="flex gap-2 rounded-md border border-cyan-200 bg-cyan-50 p-3 text-sm leading-6 text-cyan-950">
                      <ShieldCheck size={17} className="mt-0.5 shrink-0" />
                      <p>{definition.safetyNote}</p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </section>

      {!filtered.length && (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-slate-600">
          No definitions match that search in this level. Try full-library mode or clear the filter.
        </div>
      )}
    </div>
  );
}
