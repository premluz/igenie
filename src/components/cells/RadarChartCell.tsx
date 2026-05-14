import { VegaEmbed } from 'react-vega'

interface RadarChartCellProps {
  data: Array<{ dimension: string; value: number; max: number }>
}

export function RadarChartCell({ data }: RadarChartCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No data available</div>
  }

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    background: 'transparent',
    width: 320,
    height: 320,
    padding: 16,
    data: { values: data },
    mark: { type: 'point', filled: true, size: 150, color: '#3b82f6' },
    projection: { type: 'identity' },
    encoding: {
      theta: { field: 'dimension', type: 'nominal', stack: null },
      radius: {
        field: 'value',
        type: 'quantitative',
        scale: { type: 'linear', zero: true, domain: [0, 100] }
      },
      color: {
        field: 'value',
        type: 'quantitative',
        scale: { scheme: 'blues', domain: [0, 100] }
      },
      tooltip: [
        { field: 'dimension', type: 'nominal', title: 'Dimension' },
        { field: 'value', type: 'quantitative', title: 'Score' }
      ]
    },
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridColor: '#1d1d20',
        gridOpacity: 0.15,
        labelFontSize: 9,
        tickMinStep: 20,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5'
      },
      legend: {
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        labelFontSize: 9,
        titleFontSize: 10
      },
      text: { fontSize: 9, fill: '#f4f4f5' }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <VegaEmbed spec={spec} options={{ actions: false, renderer: 'canvas' }} />
    </div>
  )
}
