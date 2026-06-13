import { AppSidebar } from "@/components/app-sidebar";
import { ShieldCheck } from "lucide-react";

export function PageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="w-full">
        <header className="border-b border-slate-200 bg-white/90 px-4 py-5 backdrop-blur md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
              <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p>
            </div>
            <div className="flex max-w-xl items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs text-cyan-950">
              <ShieldCheck size={16} className="shrink-0" />
              Use approved data only. Treat AI output as a draft and verify facts.
            </div>
          </div>
        </header>
        <div className="px-4 py-6 md:px-8">{children}</div>
      </main>
    </div>
  );
}
