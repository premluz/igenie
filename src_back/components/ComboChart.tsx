import { useRef } from "react";
import { VegaEmbed } from "react-vega";

interface ComboChartDatum {
  segment: string;
  reviewVolume: number;
  avgSentiment: number;
}

interface ComboChartProps {
  data: ComboChartDatum[];
}

export function ComboChart({ data }: ComboChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    width: 400,
    height: 280,
    data: { values: data },
    resolve: { scale: { y: "independent" } },
    layer: [
      {
        mark: { type: "bar", color: "#3b82f6", opacity: 0.8 },
        encoding: {
          x: {
            field: "segment",
            type: "nominal",
            axis: { labelColor: "#71717a", labelFontSize: 10, title: null },
          },
          y: {
            field: "reviewVolume",
            type: "quantitative",
            axis: {
              labelColor: "#71717a",
              labelFontSize: 9,
              title: "Review Volume",
              titleColor: "#71717a",
              titleFontSize: 10,
            },
          },
        },
      },
      {
        mark: { type: "line", color: "#a1a1aa", size: 3, interpolate: "monotone", point: true },
        encoding: {
          x: {
            field: "segment",
            type: "nominal",
          },
          y: {
            field: "avgSentiment",
            type: "quantitative",
            axis: {
              orient: "right",
              labelColor: "#71717a",
              labelFontSize: 9,
              title: "Avg Sentiment",
              titleColor: "#71717a",
              titleFontSize: 10,
            },
          },
        },
      },
    ],
    config: {
      view: { stroke: "transparent" },
      axis: { grid: false, domain: false },
    },
  };

  return (
    <div ref={containerRef} className="w-full h-full">
      <VegaEmbed spec={spec} options={{ actions: false, renderer: "canvas" }} />
    </div>
  );
}
