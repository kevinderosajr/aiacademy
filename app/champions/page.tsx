import { PageShell } from "@/components/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function ChampionsPage() {
  const champions = await prisma.championProfile.findMany({ include: { user: { include: { department: true } }, officeHours: true } });
  return (
    <PageShell title="Champions Circle" description="Internal AI champions who coach peers, host office hours, share success stories, and turn ideas into safe experiments.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {champions.map((champion) => (
          <Card key={champion.id}>
            <CardHeader>
              <CardTitle>{champion.user.name}</CardTitle>
              <p className="text-sm text-slate-500">{champion.user.department.name} · {champion.specialty}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-600">{champion.bio}</p>
              <div className="mt-4 rounded-md bg-teal-50 p-3 text-sm text-teal-900">{champion.officeHours[0]?.topic} · {champion.officeHours[0]?.format}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Nominate an AI Champion</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Nominee name" />
          <Input placeholder="Department" />
          <Textarea placeholder="Why would they be a strong champion?" className="md:col-span-2" />
          <Button className="w-fit">Submit nomination</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
