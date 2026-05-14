import { useRef } from 'react';
import { VegaEmbed } from 'react-vega';

const mockSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Signal convergence over 90 days",
  background: "transparent",
  autosize: { type: "fit", contains: "padding" },
  data: {
    values: [
      { date: "2026-02-01", signal: "Social", score: 20 },
      { date: "2026-03-01", signal: "Social", score: 45 },
      { date: "2026-04-01", signal: "Social", score: 85 },
      { date: "2026-05-01", signal: "Social", score: 95 },
      { date: "2026-02-01", signal: "Retail", score: 10 },
      { date: "2026-03-01", signal: "Retail", score: 25 },
      { date: "2026-04-01", signal: "Retail", score: 65 },
      { date: "2026-05-01", signal: "Retail", score: 90 }
    ]
  },
  mark: {
    type: "line",
    interpolate: "monotone",
    strokeWidth: 3,
    point: true
  },
  encoding: {
    x: {
      field: "date",
      type: "temporal",
      title: null,
      axis: { grid: false, labelColor: "#71717a", domainColor: "#3f3f46" }
    },
    y: {
      field: "score",
      type: "quantitative",
      title: null,
      axis: { gridColor: "#27272a", labelColor: "#71717a", domain: false }
    },
    color: {
      field: "signal",
      type: "nominal",
      scale: { range: ["#818cf8", "#e879f9"] },
      legend: { title: null, labelColor: "#a1a1aa", orient: "top-left" }
    }
  },
  config: {
    view: { stroke: "transparent" }
  }
};

export function VegaChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full h-full p-4">
      <VegaEmbed
        spec={mockSpec}
        options={{ actions: false, renderer: 'canvas' }}
      />
    </div>
  );
}