import { VegaEmbed } from 'react-vega'

interface SegmentData {
  channel?: string
  dimension?: string
  value: number
  benchmark?: number
  max?: number
}

interface SegmentStrengthCellProps {
  data: SegmentData[]
  descriptionBottom?: string
}

export function SegmentStrengthCell({ data, descriptionBottom }: SegmentStrengthCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No data available</div>
  }

  // Prepare data with labels and sort by value descending
  const cleanData = data
    .filter(d =>
      d &&
      typeof d === 'object' &&
      (typeof d.channel === 'string' || typeof d.dimension === 'string') &&
      typeof d.value === 'number' &&
      isFinite(d.value)
    )
    .map(d => ({
      label: d.channel || d.dimension || '',
      value: d.value,
      max: d.max || 100
    }))
    .sort((a, b) => b.value - a.value)

  if (cleanData.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No valid data</div>
  }

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 450,
    height: 280,
    padding: 16,
    data: { values: cleanData },
    mark: { type: 'bar', color: '#3b82f6', opacity: 0.8 },
    encoding: {
      y: {
        field: 'label',
        type: 'nominal',
        axis: { title: null, labelFontSize: 10, labelColor: '#f4f4f5' },
        sort: { encoding: 'x', order: 'descending' }
      },
      x: {
        field: 'value',
        type: 'quantitative',
        axis: {
          title: 'Strength Score',
          titleFontSize: 11,
          labelFontSize: 9,
          labelColor: '#f4f4f5',
          titleColor: '#f4f4f5'
        },
        scale: { domain: [0, 100] }
      },
      color: {
        field: 'value',
        type: 'quantitative',
        scale: {
          domain: [0, 50, 100],
          range: ['#ef4444', '#fbbf24', '#10b981']
        },
        legend: null
      },
      tooltip: [
        { field: 'label', type: 'nominal', title: 'Channel' },
        { field: 'value', type: 'quantitative', title: 'Strength', format: '.0f' }
      ]
    },
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridColor: '#1d1d20',
        gridOpacity: 0.15
      },
      text: { fontSize: 10, fill: '#f4f4f5' }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-2">
        <VegaEmbed spec={spec as any} options={{ actions: false, renderer: 'canvas' }} />
      </div>
      {descriptionBottom && (
        <div className="px-4 pb-3 border-t border-border/20">
          <p className="text-md mg-8 bg-insight text-muted-foreground">{descriptionBottom}</p>
        </div>
      )}
    </div>
  )
}
