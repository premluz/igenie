import { ChevronRight } from "lucide-react";
import { useAgentStore } from "@/store/useAgentStore";
import { VegaEmbed } from "react-vega";
import { useRef } from "react";

interface InsightItemProps {
  id: string;
  title: string;
  velocity: number;
  velocityChange: number;
  sentiment: number;
  sentiment_label: string;
  trend: Array<{ date: string; score: number }>;
  isSelected: boolean;
  onSelect: () => void;
}

function InsightItem({
  title,
  velocity,
  velocityChange,
  sentiment,
  sentiment_label,
  trend,
  isSelected,
  onSelect,
}: InsightItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sparklineSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    width: 60,
    height: 32,
    data: { values: trend },
    mark: { type: "line", interpolate: "monotone", strokeWidth: 2, point: false },
    encoding: {
      x: { field: "date", type: "temporal", axis: null },
      y: { field: "score", type: "quantitative", axis: null },
      color: { value: sentiment_label === "positive" ? "#818cf8" : "#f43f5e" },
    },
    config: { view: { stroke: "transparent" } },
  };

  const borderColor = sentiment_label === "positive" ? "border-green-500/50" : "border-red-500/50";

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-3 border-l-2 transition-all ${borderColor} ${
        isSelected ? "bg-accent/30" : "hover:bg-muted/30"
      } border-r border-border/30`}
    >
      <div className="flex items-start gap-3">
        {/* Sparkline */}
        <div ref={containerRef} className="flex-shrink-0 w-16">
          <VegaEmbed spec={sparklineSpec} options={{ actions: false, renderer: "canvas" }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1">{title}</h3>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="font-mono">
              {velocity}
              <span className={sentiment_label === "positive" ? "text-green-500" : "text-red-500"}>
                {" "}
                {velocityChange > 0 ? "↑" : "↓"}
                {Math.abs(velocityChange)}%
              </span>
            </span>
            <span className="font-mono">Sentiment {sentiment}%</span>
          </div>
        </div>

        {/* Indicator */}
        {isSelected && <ChevronRight size={14} className="flex-shrink-0 text-accent" />}
      </div>
    </button>
  );
}

export function PulseList() {
  const { insights, selectedInsight, setSelectedInsight } = useAgentStore();

  return (
    <div className="w-80 border-r border-border bg-background/50 flex flex-col h-screen">
      {/* Header */}
      <div className="h-14 border-b border-border flex items-center px-4 gap-2 bg-card/20">
        <span className="text-xs font-bold uppercase tracking-[0.2em] italic">Pulse</span>
        <span className="text-xs text-muted-foreground">Watching</span>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-0 py-2">
          {insights.map((insight) => (
            <InsightItem
              key={insight.id}
              id={insight.id}
              title={insight.title}
              velocity={insight.velocity}
              velocityChange={insight.velocityChange}
              sentiment={insight.sentiment}
              sentiment_label={insight.sentiment_label}
              trend={insight.trend}
              isSelected={selectedInsight?.id === insight.id}
              onSelect={() => setSelectedInsight(insight)}
            />
          ))}
        </div>
      </div>

      {/* Footer - Time filter */}
      <div className="border-t border-border p-3 bg-card/20 space-y-2">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Today</div>
        <div className="text-[10px] text-muted-foreground">Yesterday</div>
      </div>
    </div>
  );
}
