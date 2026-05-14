import { VegaEmbed } from 'react-vega'

interface SparklineCardProps {
  value: string | number
  unit: string
  trend?: Array<{ date: string; score: number }>
}

export function SparklineCard({ value, unit, trend }: SparklineCardProps) {
  const sparklineSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    background: 'transparent',
    width: 120,
    height: 50,
    padding: 0,
    data: { values: trend || [] },
    mark: { type: 'line', interpolate: 'monotone', strokeWidth: 2, point: false },
    encoding: {
      x: { field: 'date', type: 'temporal', axis: null },
      y: { field: 'score', type: 'quantitative', axis: null, scale: { zero: false } },
      color: { value: '#3b82f6' }
    },
    config: { view: { stroke: 'transparent' } }
  }

  return (
    <div className="flex items-center h-full gap-6">
      {/* Left: Data Point */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="text-3xl font-bold text-accent mb-2">
          {value}
        </div>
        <div className="text-xs text-muted-foreground">
          {unit}
        </div>
      </div>

      {/* Right: Sparkline */}
      {trend && trend.length > 0 && (
        <div className="flex-1 flex items-center justify-end">
          <VegaEmbed spec={sparklineSpec} options={{ actions: false, renderer: 'canvas' }} />
        </div>
      )}
    </div>
  )
}
