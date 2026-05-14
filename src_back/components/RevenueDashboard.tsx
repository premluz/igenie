import { Card } from "@/components/ui/card";
import { KPICard } from "./KPICard";
import { AttainmentChart } from "./AttainmentChart";
import {
  monthlyARRData,
  monthlyTargetData,
  quarterlyARRData,
  quarterlyTargetData,
  kpiCards,
} from "@/data/mockRevenue";

export function RevenueDashboard() {
  return (
    <div className="flex-1 bg-background overflow-auto">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight italic">Net New ARR to Target</h1>
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            Monthly and quarterly attainment against our Net New ARR target.
          </p>
        </header>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-4 gap-4">
          {kpiCards.map((card, idx) => (
            <KPICard key={idx} {...card} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Monthly ARR Chart */}
          <Card className="bg-card/50 shadow-none border-border rounded-[8px] p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 italic">
                Monthly Revenue
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Stacked by segment with target overlay
              </p>
            </div>
            <AttainmentChart
              data={monthlyARRData}
              targetData={monthlyTargetData}
              title="Monthly ARR"
              colors={["#0ea5e9", "#0284c7", "#0369a1", "#10b981", "#059669"]}
            />
          </Card>

          {/* Quarterly ARR Chart */}
          <Card className="bg-card/50 shadow-none border-border rounded-[8px] p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400 italic">
                Quarterly Pipeline
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Stacked by opportunity type with target
              </p>
            </div>
            <AttainmentChart
              data={quarterlyARRData}
              targetData={quarterlyTargetData}
              title="Quarterly ARR"
              colors={["#7c3aed", "#a78bfa", "#c4b5fd"]}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
