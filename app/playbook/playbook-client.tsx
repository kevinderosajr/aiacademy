"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Entry = {
  id: string;
  title: string;
  type: string;
  audience: string;
  summary: string;
  tags: string;
};

const filters = ["ALL", "GUIDE", "PROMPT_TEMPLATE", "WORKFLOW_RECIPE", "FAQ", "CHECKLIST", "TOOL_COMPARISON"];

export function PlaybookClient({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return entries.filter((entry) => {
      const matchesFilter = filter === "ALL" || entry.type === filter;
      const matchesQuery = [entry.title, entry.summary, entry.audience, entry.tags, entry.type].join(" ").toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [entries, filter, query]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-xl flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search playbook entries, templates, audiences, or tags" className="pl-10" />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold",
                  filter === item ? "border-blue-600 bg-blue-600 text-white" : "bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"
                )}
              >
                {item.replaceAll("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((entry) => (
          <Link key={entry.id} href={`/playbook/${entry.id}`} className="group">
            <Card className="h-full overflow-hidden hover:border-blue-400 hover:shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge className="w-fit border-blue-200 bg-blue-50 text-blue-800">{entry.type.replaceAll("_", " ")}</Badge>
                  <ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-700" size={18} />
                </div>
                <CardTitle className="pt-2">{entry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">{entry.summary}</p>
                <div className="mt-5 border-t pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Audience</p>
                  <p className="mt-1 text-sm text-slate-700">{entry.audience}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="rounded-lg border bg-white p-8 text-center text-sm text-slate-600">No playbook entries match that search.</div>
      )}
    </div>
  );
}
