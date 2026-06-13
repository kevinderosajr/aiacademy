"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

const starters = ["What is a large language model?", "How is ChatGPT different from a search engine?", "What makes a good prompt?", "What is RAG?", "What are AI agents?", "What should I never paste into an AI tool?"];
type Message = { role: "user" | "assistant"; content: string };

export function TutorClient() {
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hi, I am your AI tutor. Ask me beginner questions about AI, prompting, responsible use, RAG, agents, or workflow ideas." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask(content = input) {
    if (!content.trim()) return;
    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/tutor", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.filter((m) => m.role !== "assistant" || m.content !== messages[0].content) }) });
    const data = await res.json();
    setMessages([...nextMessages, { role: "assistant", content: data.answer ?? "I could not answer that yet." }]);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Beginner AI Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-[420px] space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "ml-auto max-w-2xl rounded-md bg-primary p-3 text-sm leading-6 text-white" : "max-w-2xl rounded-md bg-slate-100 p-3 text-sm leading-6 text-slate-800"}>
                {message.content}
              </div>
            ))}
            {loading && <div className="max-w-2xl rounded-md bg-slate-100 p-3 text-sm text-slate-500">Drafting a beginner-friendly answer...</div>}
          </div>
          <div className="mt-4 flex gap-2">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question about AI at work..." className="min-h-16" />
            <Button onClick={() => ask()} disabled={loading} aria-label="Send"><Send size={16} /></Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Starter Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {starters.map((starter) => (
            <button key={starter} onClick={() => ask(starter)} className="w-full rounded-md border bg-white p-3 text-left text-sm hover:bg-slate-50">{starter}</button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
