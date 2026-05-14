import { Radio, Flame, Share2, TrendingUp, Search, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { BreadcrumbBar } from "./BreadcrumbBar";
import { AttainmentChart } from "./AttainmentChart";
import { useAgentStore } from "@/store/useAgentStore";
import { monthlyARRData, monthlyTargetData, quarterlyARRData, quarterlyTargetData } from "@/data/mockRevenue";

export function InsightDetail() {
  const { selectedInsight, setSelectedInsight } = useAgentStore();

  if (!selectedInsight) return null;

  return (
    <div className="flex-1 bg-background flex flex-col h-screen">
      {/* Breadcrumb Bar */}
      <BreadcrumbBar
        title={selectedInsight.title}
        breadcrumbs={[
          {
            label: "Insights",
            onClick: () => setSelectedInsight(null),
          },
        ]}
      />

      {/* Content */}
      <ScrollArea className="flex-1 overflow-auto">
        <main id="insight-detail-content" className="p-8 max-w-8xl mx-auto space-y-8">
          {/* Title and description */}
          <header className="space-y-3">
            <h1 className="text-3xl font-bold">{selectedInsight.title}</h1>
            <p className="text-sm text-muted-foreground">{selectedInsight.description}</p>
          </header>

          {/* Signal Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Signal Strength */}
            <Card className="bg-card/50 shadow-none border-border rounded-lg hover:bg-card/70 transition-colors duration-150 ease-out">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Signal Strength</span>
                  <Radio size={14} className="text-blue-500" />
                </div>
                <Progress value={88} className="h-1" />
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Strong multi-signal convergence across social growth, retail movement, and search acceleration.
                </p>
              </CardContent>
            </Card>

            {/* Signal Trust */}
            <Card className="bg-card/50 shadow-none border-border rounded-lg hover:bg-card/70 transition-colors duration-150 ease-out">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">Signal Trust</span>
                  <Flame size={14} className="text-orange-500" />
                </div>
                <Progress value={92} className="h-1" />
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Verified through Databricks Gold Layer consistency and multi-source validation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content Sections - 3 Column Layout */}
          <div className="grid grid-cols-3 gap-4">
            {/* Executive Summary */}
            <Card className="bg-card/50 shadow-none border-border rounded-lg hover:bg-card/70 transition-colors duration-150 ease-out">
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold mb-3">Executive summary</h3>
                <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Consumer interest in cucumber-mint flavored beverages accelerated significantly over the last 90 days.
                  </p>
                  <p className="font-semibold">The trend shows:</p>
                  <ul className="space-y-1 pl-3">
                    <li>• strong social acceleration</li>
                    <li>• increasing retail sell-through</li>
                    <li>• rising search demand</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Business Implications */}
            <Card className="bg-card/50 shadow-none border-border rounded-lg hover:bg-card/70 transition-colors duration-150 ease-out">
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold mb-3">Business implications</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Potential whitespace in premium hydration</li>
                  <li>• Opportunity for limited-edition launches</li>
                  <li>• Particularly relevant for urban premium retail</li>
                  <li>• E-commerce-first launch advantage</li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Recommendations */}
            <Card className="bg-card/50 shadow-none border-border rounded-lg hover:bg-card/70 transition-colors duration-150 ease-out">
              <CardContent className="pt-5">
                <h3 className="text-sm font-semibold mb-3">Action recommendations</h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>• Launch limited-edition SKU Q2 2026</li>
                  <li>• Focus on urban premium retail channels</li>
                  <li>• Allocate budget to Gen Z social marketing</li>
                  <li>• Monitor competitor response signals</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Signal Sources Card */}
          <Card className="bg-card/50 shadow-none border-border rounded-lg">
            <CardContent className="pt-5">
              <h3 className="text-sm font-semibold mb-4">Signal sources</h3>
              <p className="text-xs text-muted-foreground mb-4">1234 data points</p>
              <div className="space-y-3">
                {[
                  { Icon: Share2, label: "Social", value: "47%" },
                  { Icon: TrendingUp, label: "Retail", value: "47%" },
                  { Icon: Search, label: "Search", value: "47%" },
                  { Icon: Activity, label: "Retail Velocity", value: "47%" },
                ].map((source, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/30 transition-colors duration-100">
                    <div className="flex items-center gap-3">
                      <source.Icon size={16} className="text-muted-foreground" />
                      <span className="text-xs">{source.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-foreground">{source.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-card/50 shadow-none border-border rounded-lg">
              <div className="p-5">
                <h3 className="text-sm font-semibold mb-1">Monthly Revenue</h3>
                <p className="text-xs text-muted-foreground mb-4">Stacked by segment with target overlay</p>
                <AttainmentChart
                  data={monthlyARRData}
                  targetData={monthlyTargetData}
                  title="Monthly"
                  height={240}
                />
              </div>
            </Card>

            <Card className="bg-card/50 shadow-none border-border rounded-lg">
              <div className="p-5">
                <h3 className="text-sm font-semibold mb-1">Quarterly Pipeline</h3>
                <p className="text-xs text-muted-foreground mb-4">By opportunity type</p>
                <AttainmentChart
                  data={quarterlyARRData}
                  targetData={quarterlyTargetData}
                  title="Quarterly"
                  colors={["#7c3aed", "#a78bfa", "#c4b5fd"]}
                  height={240}
                />
              </div>
            </Card>
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
