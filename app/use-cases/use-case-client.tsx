"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export function UseCaseClient({ departments }: { departments: string[] }) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    const body = Object.fromEntries(formData.entries());
    const res = await fetch("/api/use-case-score", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setResult(await res.json());
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader><CardTitle>Submit a Workflow Opportunity</CardTitle></CardHeader>
        <CardContent>
          <form action={submit} className="grid gap-3 md:grid-cols-2">
            <Input name="title" placeholder="Use case title" required />
            <Select name="department" required>{departments.map((d) => <option key={d}>{d}</option>)}</Select>
            <Textarea name="currentWorkflow" placeholder="Describe the current workflow" required />
            <Textarea name="painPoint" placeholder="What makes this painful or slow?" required />
            <Input name="timeSpentPerWeek" type="number" min="1" max="80" placeholder="Hours per week" required />
            <Select name="dataSensitivity" required>
              <option value="PUBLIC">Public</option>
              <option value="INTERNAL">Internal</option>
              <option value="CONFIDENTIAL">Confidential</option>
              <option value="REGULATED">Regulated</option>
            </Select>
            <Textarea name="expectedBenefit" placeholder="Expected business benefit" required />
            <Textarea name="feasibilityNotes" placeholder="Known constraints, tools, or sample data availability" required />
            <Button className="w-fit" disabled={loading}>{loading ? "Scoring..." : "Submit and score"}</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Scoring Assistant</CardTitle></CardHeader>
        <CardContent>
          {!result ? <p className="text-sm leading-6 text-slate-600">Submit a workflow idea to estimate impact, feasibility, risk, and a suggested next step.</p> : (
            <div className="space-y-4">
              <div><div className="mb-1 flex justify-between text-sm"><span>Impact</span><span>{result.impactScore}</span></div><Progress value={result.impactScore} /></div>
              <div><div className="mb-1 flex justify-between text-sm"><span>Feasibility</span><span>{result.feasibilityScore}</span></div><Progress value={result.feasibilityScore} /></div>
              <div className="rounded-md border p-3 text-sm"><span className="font-semibold">Risk:</span> {result.riskLevel}</div>
              <div className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">{result.suggestedNextStep}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
