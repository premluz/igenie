import { VegaEmbed } from 'react-vega'
import { DescriptionBottom } from '../WidgetRenderer'

interface DivergingBarCellProps {
  data: Array<{ driver: string; positive: number; negative: number }>
  descriptionBottom?: string
}

export function DivergingBarCell({ data, descriptionBottom }: DivergingBarCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-md text-muted-foreground text-center py-8">No data available</div>
  }

  // Validate and transform data for diverging bar
  const validData = data.filter(d =>
    d &&
    typeof d === 'object' &&
    typeof d.driver === 'string' &&
    d.driver.length > 0 &&
    typeof d.positive === 'number' &&
    isFinite(d.positive) &&
    typeof d.negative === 'number' &&
    isFinite(d.negative)
  )

  if (validData.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No valid data</div>
  }

  const transformedData = validData.flatMap(d => [
    { driver: d.driver, value: d.positive, direction: 'Positive' },
    { driver: d.driver, value: d.negative, direction: 'Negative' }
  ])

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 450,
    height: 280,
    padding: 16,
    data: { values: transformedData },
    mark: 'bar',
    encoding: {
      y: {
        field: 'driver',
        type: 'nominal',
        axis: { title: null, labelFontSize: 9 },
        sort: { encoding: 'x', order: 'descending' }
      },
      x: {
        field: 'value',
        type: 'quantitative',
        axis: { title: 'Sentiment Volume', titleFontSize: 11, labelFontSize: 9 },
        scale: { domain: [-3000, 3000] }
      },
      color: {
        field: 'direction',
        type: 'nominal',
        scale: { domain: ['Positive', 'Negative'], range: ['#10b981', '#ef4444'] },
        legend: { orient: 'bottom', labelFontSize: 9, symbolSize: 100 }
      },
      tooltip: [
        { field: 'driver', type: 'nominal', title: 'Driver' },
        { field: 'direction', type: 'nominal', title: 'Sentiment' },
        { field: 'value', type: 'quantitative', format: ',d', title: 'Volume' }
      ]
    },
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
        labelFontSize: 9,
        titleFontSize: 10
      },
      text: { fontSize: 9, fill: '#f4f4f5' }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center min-h-0">
        <VegaEmbed spec={spec as any} options={{ actions: false, renderer: 'canvas' }} />
      </div>
      {descriptionBottom && <DescriptionBottom text={descriptionBottom} />}
    </div>
  )
}
