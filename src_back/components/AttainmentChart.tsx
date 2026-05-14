import { useRef } from "react";
import { VegaEmbed } from "react-vega";

interface AttainmentChartProps {
  data: any[];
  targetData: Array<{ period: string; target: number }>;
  title: string;
  colors?: string[];
  height?: number;
}

export function AttainmentChart({
  data,
  targetData,
  title,
  colors = ["#0ea5e9", "#0284c7", "#0369a1", "#10b981", "#059669"],
  height = 320,
}: AttainmentChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if this is monthly or quarterly based on data
  const isQuarterly = data[0]?.quarter !== undefined;
  const xField = isQuarterly ? "quarter" : "month";
  const segmentFields = isQuarterly
    ? ["expansionUpsell", "newBusiness", "renewal"]
    : ["enterprise", "midMarket", "smb", "strategic", "other"];

  // Transform data for Vega (long format for stacking)
  const transformedData = data.flatMap((d: any) =>
    segmentFields.map((field) => ({
      period: d[xField],
      segment: field,
      value: d[field] || 0,
    }))
  );

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    width: 600,
    height: height,
    layer: [
      // Stacked bars
      {
        data: { values: transformedData },
        mark: { type: "bar", opacity: 0.9 },
        encoding: {
          x: {
            field: "period",
            type: "nominal",
            axis: {
              labelColor: "#71717a",
              labelFontSize: 9,
              labelAngle: -45,
              title: null,
            },
          },
          y: {
            field: "value",
            type: "quantitative",
            stack: "zero",
            axis: {
              labelColor: "#71717a",
              labelFontSize: 9,
              format: "$,.0f",
              title: null,
              gridColor: "#27272a",
              gridOpacity: 0.3,
            },
          },
          color: {
            field: "segment",
            type: "nominal",
            scale: { range: colors },
            legend: {
              orient: "top-left",
              labelColor: "#a1a1aa",
              labelFontSize: 9,
              symbolSize: 100,
              title: null,
            },
          },
        },
      },
      // Target line
      {
        data: { values: targetData },
        mark: { type: "line", color: "#ffffff", size: 3, point: true, interpolate: "monotone" },
        encoding: {
          x: {
            field: "period",
            type: "nominal",
          },
          y: {
            field: "target",
            type: "quantitative",
            axis: {
              labelColor: "#71717a",
              labelFontSize: 9,
              format: "$,.0f",
              title: null,
            },
          },
        },
      },
    ],
    config: {
      view: { stroke: "transparent" },
      axis: { domain: false },
      mark: { tooltip: true },
    },
  };

  return (
    <div ref={containerRef} className="w-full">
      <VegaEmbed spec={spec} options={{ actions: false, renderer: "canvas" }} />
    </div>
  );
}
