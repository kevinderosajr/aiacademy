import Link from "next/link";
import { BarChart3, BookOpen, Bot, CircleGauge, FlaskConical, Home, Library, MessagesSquare, ScrollText, ShieldCheck, Sparkles, Trophy, Users, Wrench } from "lucide-react";

const items = [
  [Home, "Dashboard", "/dashboard"],
  [BookOpen, "Learn", "/learn"],
  [ScrollText, "AI Definitions", "/definitions"],
  [Bot, "AI Tutor", "/tutor"],
  [FlaskConical, "Prompt Lab", "/prompt-lab"],
  [ShieldCheck, "Responsible AI", "/responsible-ai"],
  [Library, "Playbook", "/playbook"],
  [CircleGauge, "Use Cases", "/use-cases"],
  [Wrench, "Prototype Gallery", "/prototype-gallery"],
  [Users, "Champions Circle", "/champions"],
  [Trophy, "Success Stories", "/success-stories"],
  [BarChart3, "Admin Analytics", "/admin/analytics"],
  [MessagesSquare, "Admin Content", "/admin/content"]
] as const;

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-800 bg-[#060a14] text-white lg:block">
      <div className="flex h-16 items-center gap-2 border-b border-slate-800 px-5">
        <div className="flex size-9 items-center justify-center rounded-md bg-blue-600 text-white shadow-[0_0_28px_rgba(37,99,235,0.45)]">
          <Sparkles size={18} />
        </div>
        <div>
          <p className="font-semibold">AI Enablement Studio</p>
          <p className="text-xs text-slate-400">Protect Life through AI fluency</p>
        </div>
      </div>
      <nav className="space-y-1 p-3">
        {items.map(([Icon, label, href]) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-blue-500/15 hover:text-white">
            <Icon size={17} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
