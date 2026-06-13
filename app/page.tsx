import Link from "next/link";
import { ArrowRight, BookOpen, CircleGauge, FlaskConical, Library, ShieldCheck, Users } from "lucide-react";
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
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/ai-command-center-hero.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.9)_35%,rgba(0,72,180,0.34)_68%,rgba(0,181,255,0.12)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-300/70" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 py-8 lg:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-28 items-center justify-center rounded-sm bg-white px-3 shadow-[0_0_34px_rgba(0,164,255,0.28)]">
                <img src="/axon-logo.png" alt="Axon" className="h-5 w-auto object-contain" />
              </div>
              <span className="hidden h-6 w-px bg-white/25 sm:block" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">AI Academy</span>
            </div>
            <Link href="/dashboard" className="rounded-sm border border-cyan-300/60 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.18)] hover:bg-cyan-300 hover:text-black">
              Open Studio
            </Link>
          </nav>
          <div className="max-w-4xl pb-10 pt-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-cyan-300">Protect Life through AI fluency</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-none md:text-7xl">
              AI training built for mission-critical teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              A secure enablement hub where employees learn AI fundamentals, practice with guided challenges, review the playbook, and turn responsible adoption into measurable business impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="inline-flex h-11 items-center gap-2 rounded-sm bg-[#00a3ff] px-5 text-sm font-semibold text-black shadow-[0_0_34px_rgba(0,163,255,0.36)] hover:bg-cyan-200">
                Start Learning <ArrowRight size={16} />
              </Link>
              <Link href="/playbook" className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/35 px-5 text-sm font-semibold hover:border-cyan-300 hover:bg-cyan-300/10">
                Review Playbook
              </Link>
              <Link href="/use-cases" className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/35 px-5 text-sm font-semibold hover:border-cyan-300 hover:bg-cyan-300/10">
                Explore Use Cases
              </Link>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-sm border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-2xl font-semibold">90 days</p>
              <p className="text-sm text-slate-300">Adoption impact tracking</p>
            </div>
            <div className="rounded-sm border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-2xl font-semibold">10 modules</p>
              <p className="text-sm text-slate-300">Foundations, RAG, agents, safety</p>
            </div>
            <div className="rounded-sm border border-white/15 bg-white/[0.06] p-4 backdrop-blur">
              <p className="text-2xl font-semibold">4 AI flows</p>
              <p className="text-sm text-slate-300">Tutor, prompt feedback, scoring, drafts</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white px-6 py-12 text-slate-950 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map(([Icon, title, description]) => (
            <Card key={title} className="rounded-sm border-slate-200 shadow-none">
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-sm bg-black text-cyan-300">
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
