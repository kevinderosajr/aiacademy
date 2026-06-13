"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Exercise = { id: string; title: string; scenario: string; weakPrompt: string };

export function PromptLabClient({ exercises }: { exercises: Exercise[] }) {
  const [selected, setSelected] = useState(exercises[0]);
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch("/api/prompt-feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ exerciseTitle: selected.title, weakPrompt: selected.weakPrompt, improvedPrompt: prompt }) });
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_1fr_360px]">
      <Card>
        <CardHeader><CardTitle>Exercises</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {exercises.map((exercise) => (
            <button key={exercise.id} onClick={() => { setSelected(exercise); setResult(null); }} className="w-full rounded-md border p-3 text-left text-sm hover:bg-slate-50">{exercise.title}</button>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>{selected.title}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-900"><span className="font-semibold">Weak prompt:</span> {selected.weakPrompt}</div>
          <p className="text-sm leading-6 text-slate-600">{selected.scenario}</p>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Improve the prompt with role, task, context, constraints, output format, examples, and safety boundaries..." className="min-h-56" />
          <Button onClick={submit} disabled={loading || prompt.length < 10}>{loading ? "Scoring..." : "Get AI feedback"}</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Prompt Formula</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-700">
          {["Role", "Task", "Context", "Constraints", "Output format", "Examples", "Safety/data boundaries"].map((part) => <div key={part} className="rounded-md bg-slate-50 p-2">{part}</div>)}
          {result && (
            <div className="space-y-3 pt-4">
              {["clarity", "context", "constraints", "safety", "format"].map((key) => (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-xs capitalize"><span>{key}</span><span>{result[key]}</span></div>
                  <Progress value={result[key]} />
                </div>
              ))}
              <p className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">{result.feedback}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
