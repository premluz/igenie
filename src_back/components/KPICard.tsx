import { Card, CardContent } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
}

export function KPICard({ title, value, subtitle }: KPICardProps) {
  return (
    <Card className="bg-card/50 shadow-none border-border rounded-[8px]">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 italic">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground font-light">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}
