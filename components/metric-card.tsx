import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.14em] text-slate-500">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold text-slate-950">{value}</div>
        <p className="mt-2 text-xs text-slate-500">{note}</p>
      </CardContent>
    </Card>
  );
}
