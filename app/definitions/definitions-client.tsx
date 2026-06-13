"use client";

import { useMemo, useState } from "react";
import { BookOpen, Lightbulb, Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { aiDefinitions, definitionCategories, type DefinitionCategory } from "@/lib/definitions";
import { cn } from "@/lib/utils";

export function DefinitionsClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DefinitionCategory | "All">("All");
  const [expanded, setExpanded] = useState<string>(aiDefinitions[0].term);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return aiDefinitions.filter((definition) => {
      const categoryMatch = category === "All" || definition.category === category;
      const queryMatch = [definition.term, definition.technical, definition.plain, definition.analogy, definition.workplaceExample]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-800 bg-[#070b16] p-5 text-white shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">AI fluency glossary</p>
            <h2 className="mt-2 text-2xl font-semibold">Technical terms translated for real work</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
              Each term includes a technical definition, a plain-English version, an analogy, and a workplace example.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md border border-white/10 bg-white/10 p-3">
              <p className="text-2xl font-semibold">{aiDefinitions.length}</p>
              <p className="text-xs text-slate-300">terms</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/10 p-3">
              <p className="text-2xl font-semibold">{definitionCategories.length}</p>
              <p className="text-xs text-slate-300">groups</p>
            </div>
            <div className="rounded-md border border-white/10 bg-white/10 p-3">
              <p className="text-2xl font-semibold">0</p>
              <p className="text-xs text-slate-300">typing tasks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative max-w-2xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search MCP, RAG, agents, embeddings, prompt injection..." className="pl-10" />
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
          return (
            <Card key={definition.term} className={cn("overflow-hidden transition hover:border-blue-300", isExpanded && "border-blue-400 shadow-soft")}>
              <button className="w-full text-left" onClick={() => setExpanded(isExpanded ? "" : definition.term)}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge className="mb-3 border-blue-200 bg-blue-50 text-blue-800">{definition.category}</Badge>
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
          No definitions match that search.
        </div>
      )}
    </div>
  );
}
