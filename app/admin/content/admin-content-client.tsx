"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";

export function AdminContentClient() {
  const [message, setMessage] = useState("");

  async function post(url: string, formData: FormData) {
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData.entries())) });
    setMessage(res.ok ? "Content saved. Refresh the related page to see the new item." : "Validation failed. Check required fields and try again.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Create Learning Module</CardTitle></CardHeader>
        <CardContent>
          <form action={(fd) => post("/api/admin/modules", fd)} className="space-y-3">
            <Input name="title" placeholder="Module title" required />
            <Input name="slug" placeholder="module-slug" required />
            <Input name="level" placeholder="Beginner / Applied / Responsible AI" required />
            <Input name="duration" type="number" placeholder="Duration minutes" required />
            <Textarea name="summary" placeholder="Short summary" required />
            <Textarea name="content" placeholder="Markdown lesson content" required />
            <Button>Save module</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Create Playbook Entry</CardTitle></CardHeader>
        <CardContent>
          <form action={(fd) => post("/api/admin/playbook", fd)} className="space-y-3">
            <Input name="title" placeholder="Entry title" required />
            <Select name="type">
              <option value="GUIDE">Guide</option>
              <option value="PROMPT_TEMPLATE">Prompt template</option>
              <option value="WORKFLOW_RECIPE">Workflow recipe</option>
              <option value="TOOL_COMPARISON">Tool comparison</option>
              <option value="FAQ">FAQ</option>
              <option value="CHECKLIST">Checklist</option>
            </Select>
            <Input name="audience" placeholder="Audience" required />
            <Input name="tags" placeholder="Tags" required />
            <Textarea name="summary" placeholder="Short summary" required />
            <Textarea name="body" placeholder="Markdown content" required />
            <Button>Save playbook entry</Button>
          </form>
        </CardContent>
      </Card>
      {message && <div className="rounded-md border bg-white p-4 text-sm text-slate-700 xl:col-span-2">{message}</div>}
    </div>
  );
}
