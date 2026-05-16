import { VegaEmbed } from 'react-vega'

interface ComboChartCellProps {
  data: Array<{ date: string; volume: number; sentiment: number }>
  descriptionBottom?: string
}

export function ComboChartCell({ data, descriptionBottom }: ComboChartCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No data available</div>
  }

  // Strictly validate all data points
  const cleanData = data.filter(d =>
    d &&
    typeof d === 'object' &&
    typeof d.date === 'string' &&
    d.date.length > 0 &&
    typeof d.volume === 'number' &&
    isFinite(d.volume) &&
    typeof d.sentiment === 'number' &&
    isFinite(d.sentiment)
  )

  if (cleanData.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">No valid data</div>
  }

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 450,
    height: 280,
    padding: 16,
    data: { values: cleanData },
    resolve: { scale: { y: 'independent' } },
    layer: [
      {
        mark: { type: 'bar', opacity: 0.6 },
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: { format: '%b %d', labelAngle: -45, labelFontSize: 10, title: null }
          },
          y: {
            field: 'volume',
            type: 'quantitative',
            axis: { title: 'Volume', titleFontSize: 11, labelFontSize: 9, orient: 'left' },
            scale: { zero: false }
          },
          color: { value: '#3b82f6' },
          tooltip: [
            { field: 'date', type: 'temporal', format: '%b %d' },
            { field: 'volume', type: 'quantitative', title: 'Volume' }
          ]
        }
      },
      {
        mark: { type: 'line', point: true, strokeWidth: 2, opacity: 0.8 },
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: null
          },
          y: {
            field: 'sentiment',
            type: 'quantitative',
            axis: { title: 'Sentiment %', titleFontSize: 11, labelFontSize: 9, orient: 'right' },
            scale: { domain: [0, 100], zero: false }
          },
          color: { value: '#f59e0b' },
          tooltip: [
            { field: 'date', type: 'temporal', format: '%b %d' },
            { field: 'sentiment', type: 'quantitative', title: 'Sentiment %' }
          ]
        }
      }
    ],
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridOpacity: 0.1,
        gridColor: '#1d1d20',
        domainOpacity: 0,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5'
      },
      legend: {
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        labelFontSize: 10,
        titleFontSize: 11
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
          <p className="text-sm text-muted-foreground">{descriptionBottom}</p>
        </div>
      )}
    </div>
  )
}
