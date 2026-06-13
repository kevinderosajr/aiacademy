import Link from "next/link";
import { ArrowRight, BookOpen, Bot, CircleGauge, FlaskConical, Library, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  [BookOpen, "AI Foundations", "Beginner-friendly lessons that explain concepts in plain English."],
  [FlaskConical, "Prompt Practice Lab", "Hands-on exercises with scoring across clarity, context, constraints, safety, and format."],
  [ShieldCheck, "Responsible AI Guide", "Practical guardrails for data safety, human review, hallucinations, and AI-generated code."],
  [CircleGauge, "Use Case Discovery", "A structured intake flow that estimates impact, feasibility, risk, and next steps."],
  [Users, "Champions Circle", "Community profiles, office hours, and reusable success patterns."],
  [Library, "Adoption Dashboard", "Seeded analytics for progress, engagement, business impact, and adoption trends."]
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,6,23,0.96),rgba(29,78,216,0.74),rgba(8,145,178,0.64)),url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-between px-6 py-8 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-md bg-blue-600 text-white shadow-[0_0_32px_rgba(37,99,235,0.55)]">
                <Bot size={20} />
              </div>
              <span className="text-lg font-semibold">AI Enablement Studio</span>
            </div>
            <Link href="/dashboard" className="rounded-md border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/10">
              Open Studio
            </Link>
          </nav>
          <div className="max-w-3xl pb-10 pt-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Enterprise AI adoption hub</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">Learn AI. Apply it safely. Create leverage.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
              A public-safety-inspired internal platform that helps employees understand AI, practice safely, discover practical business use cases, and measure adoption impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-semibold text-slate-950 hover:bg-slate-100">
                Start Learning <ArrowRight size={16} />
              </Link>
              <Link href="/tutor" className="inline-flex h-11 items-center gap-2 rounded-md border border-white/35 px-5 text-sm font-semibold hover:bg-white/10">
                Ask the AI Tutor
              </Link>
              <Link href="/use-cases" className="inline-flex h-11 items-center gap-2 rounded-md border border-white/35 px-5 text-sm font-semibold hover:bg-white/10">
                Explore Use Cases
              </Link>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-semibold">90 days</p>
              <p className="text-sm text-slate-100">Seeded adoption metrics</p>
            </div>
            <div className="rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-semibold">10 modules</p>
              <p className="text-sm text-slate-100">Foundations, RAG, agents, safety</p>
            </div>
            <div className="rounded-md border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-2xl font-semibold">4 AI flows</p>
              <p className="text-sm text-slate-100">Tutor, prompt feedback, scoring, drafts</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 px-6 py-12 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map(([Icon, title, description]) => (
            <Card key={title} className="border-slate-200">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                  <Icon size={19} />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
