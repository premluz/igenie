import { useRef } from "react";
import { VegaEmbed } from "react-vega";

interface RadarChartDatum {
  dimension: string;
  value: number;
  max: number;
}

interface RadarChartProps {
  data: RadarChartDatum[];
}

export function RadarChart({ data }: RadarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize data to 0-100 scale for radar
  const normalizedData = data.map(d => ({
    ...d,
    normalized: (d.value / d.max) * 100
  }));

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    background: "transparent",
    width: 280,
    height: 280,
    data: { values: normalizedData },
    mark: { type: "line", interpolate: "linear-closed", filled: true, color: "#818cf8", opacity: 0.4 },
    transform: [
      { calculate: "datum.normalized", as: "value_norm" }
    ],
    encoding: {
      theta: {
        field: "dimension",
        type: "nominal",
        axis: {
          labelFontSize: 9,
          labelColor: "#71717a",
          labelPadding: 8
        }
      },
      radius: {
        field: "value_norm",
        type: "quantitative",
        scale: { type: "linear", zero: true, domain: [0, 100] },
        axis: {
          labelFontSize: 8,
          labelColor: "#71717a",
          grid: true,
          gridColor: "#27272a"
        }
      },
      color: { value: "#818cf8" },
      opacity: { value: 0.6 },
    },
    config: {
      view: { stroke: "transparent" },
      arc: { innerRadius: 0 }
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <VegaEmbed spec={spec} options={{ actions: false, renderer: "canvas" }} />
    </div>
  );
}
