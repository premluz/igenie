import { VegaEmbed } from 'react-vega'

interface RadarProperCellProps {
  data: Array<{
    dimension?: string
    channel?: string
    value: number
    benchmark?: number
    max?: number
  }>
  descriptionBottom?: string
}

export function RadarProperCell({ data, descriptionBottom }: RadarProperCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No data available</div>
  }

  console.log('[RadarProperCell] Received data:', data)

  const cleanData = data
    .filter(d =>
      d &&
      typeof d === 'object' &&
      (typeof d.channel === 'string' || typeof d.dimension === 'string') &&
      typeof d.value === 'number' &&
      isFinite(d.value)
    )
    .map(d => ({
      dimension: d.channel || d.dimension || '',
      value: d.value,
      benchmark: d.benchmark || d.value * 0.75,
      max: d.max || 100
    }))

  console.log('[RadarProperCell] Clean data after filtering:', cleanData)

  if (cleanData.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No valid data</div>
  }

  // Create dataset with both actual and benchmark values for layering
  const chartData = [
    ...cleanData.map(d => ({ ...d, type: 'Actual' })),
    ...cleanData.map(d => ({ ...d, value: d.benchmark, type: 'Benchmark' }))
  ]

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 340,
    height: 340,
    padding: 20,
    data: { values: chartData },
    mark: { type: 'area', filled: true, line: true, point: true },
    projection: { type: 'polar' },
    encoding: {
      theta: {
        field: 'dimension',
        type: 'nominal',
        scale: { type: 'point' }
      },
      radius: {
        field: 'value',
        type: 'quantitative',
        scale: { type: 'linear', zero: true, domain: [0, 100] }
      },
      color: {
        field: 'type',
        type: 'nominal',
        scale: {
          domain: ['Actual', 'Benchmark'],
          range: ['#3b82f6', '#6b7280']
        },
        legend: { title: null }
      },
      opacity: {
        field: 'type',
        type: 'nominal',
        scale: {
          domain: ['Actual', 'Benchmark'],
          range: [0.4, 0.1]
        },
        legend: null
      },
      tooltip: [
        { field: 'dimension', type: 'nominal', title: 'Dimension' },
        { field: 'type', type: 'nominal', title: 'Type' },
        { field: 'value', type: 'quantitative', title: 'Score', format: '.0f' }
      ]
    },
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridColor: '#1d1d20',
        gridOpacity: 0.15,
        labelFontSize: 10,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5'
      },
      legend: { disable: true }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-2">
        <VegaEmbed spec={spec as any} options={{ actions: false, renderer: 'canvas' }} />
      </div>
      {descriptionBottom && (
        <div className="px-4 pb-3 border-t border-border/20">
          <p className="text-sm text-muted-foreground">{descriptionBottom}</p>
        </div>
      )}
    </div>
  )
}
