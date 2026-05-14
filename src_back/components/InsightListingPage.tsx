import { Flame, Radio, ChevronRight, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreadcrumbBar } from "./BreadcrumbBar";
import { useAgentStore } from "@/store/useAgentStore";
import { useState } from "react";
import { useRef } from "react";
import { VegaEmbed } from "react-vega";

export function InsightListingPage() {
  const { insights, setSelectedInsight } = useAgentStore();
  const [activeTab, setActiveTab] = useState("pulse");

  // Group insights by "Today" and "Yesterday"
  const todayInsights = insights.slice(0, 2);
  const yesterdayInsights = insights.slice(2);

  const InsightRow = ({ insight }: { insight: (typeof insights)[0] }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const sparklineSpec = {
      $schema: "https://vega.github.io/schema/vega-lite/v5.json",
      background: "transparent",
      width: 100,
      height: 40,
      data: { values: insight.trend },
      mark: { type: "area", interpolate: "monotone", opacity: 0.6 },
      encoding: {
        x: { field: "date", type: "temporal", axis: null },
        y: { field: "score", type: "quantitative", axis: null },
        color: { value: insight.sentiment_label === "positive" ? "#818cf8" : "#f43f5e" },
      },
      config: { view: { stroke: "transparent" } },
    };

    return (
      <button
        onClick={() => setSelectedInsight(insight)}
        className="w-full p-4 border-b border-border/30 hover:bg-muted/20 transition-colors duration-100 ease-out text-left group"
      >
        <div className="flex items-start gap-4">
          {/* Sparkline - with glow container */}
          <div
            ref={containerRef}
            className={`flex-shrink-0 w-28 animate-float-in ${
              insight.velocity > 8
                ? "sparkline-high-velocity animate-glow-pulse"
                : insight.sentiment > 80
                  ? "sparkline-positive animate-glow-pulse-emerald"
                  : ""
            }`}
          >
            <VegaEmbed spec={sparklineSpec} options={{ actions: false, renderer: "canvas" }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold  text-foreground line-clamp-2 mb-2">
              {insight.title}
            </h3>
           {/* Description preview */}
            <p className="text-xs font-normal mb-4 text-muted-foreground line-clamp-1 group-hover:text-foreground/80 transition-colors duration-100">
              {insight.description}
            </p>
            {/* Two Progress Bars */}
            <div className="space-y-2 mb-3">
              {/* Signal Strength - with optional sparkle */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 flex-shrink-0 w-16">
                  <div className="relative flex items-center gap-1.5">
                    <Radio size={12} className="text-blue-500" />
                    <span className="text-xs text-muted-foreground">{insight.velocity}</span>
                    {insight.velocity > 8 && (
                      <Sparkles
                        size={10}
                        className="text-blue-400 animate-sparkle absolute -right-2"
                      />
                    )}
                  </div>
                </div>
                <Progress value={Math.min(insight.velocity * 10, 100)} className="h-1 flex-1 max-w-3xs" />
              </div>

              {/* Signal Trust (Sentiment) - with optional glow */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 flex-shrink-0 w-16">
                  <div className="relative flex items-center gap-1.5">
                    <Flame
                      size={12}
                      className={insight.sentiment > 80 ? "text-emerald-500 animate-sparkle" : "text-orange-500"}
                    />
                    <span className="text-xs text-muted-foreground">{insight.sentiment}%</span>
                  </div>
                </div>
                <Progress
                  value={insight.sentiment}
                  className="h-1 flex-1 max-w-3xs"
                  style={{
                    background: insight.sentiment_label === 'positive'
                      ? 'hsl(0 0% 18%)'
                      : 'hsl(0 0% 18%)'
                  }}
                />
              </div>
            </div>

    
          </div>

          {/* Arrow indicator */}
          <ChevronRight size={16} className="text-accent flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
        </div>
      </button>
    );
  };

  return (
    <div className="flex-1 bg-background flex flex-col h-screen">
      {/* Breadcrumb Bar */}
      <BreadcrumbBar
        title="Insights"
        showFilter={true}
      />

      {/* Tabs Bar */}
      <div className="border-b border-border/50 bg-background/50 px-6 py-2 sticky top-14 z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-6 bg-transparent border-0 p-0 gap-1">
            <TabsTrigger
              value="pulse"
              className="text-xs px-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent hover:text-accent transition-colors"
            >
              Pulse
            </TabsTrigger>
            <TabsTrigger
              value="watching"
              className="text-xs px-3 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-accent hover:text-accent transition-colors"
            >
              Watching
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Insights List */}
      <ScrollArea className="flex-1">
        <div>
          {/* Today Section */}
          <div className="sticky top-0 bg-background/80 backdrop-blur px-6 py-2 border-b border-border/20">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Today</span>
          </div>
          {todayInsights.map((insight) => (
            <InsightRow key={insight.id} insight={insight} />
          ))}

          {/* Yesterday Section */}
          <div className="sticky top-0 bg-background/80 backdrop-blur px-6 py-2 border-b border-border/20 mt-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Yesterday</span>
          </div>
          {yesterdayInsights.map((insight) => (
            <InsightRow key={insight.id} insight={insight} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
