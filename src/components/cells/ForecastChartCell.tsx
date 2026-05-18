import { VegaEmbed } from 'react-vega'

interface ForecastDataPoint {
  date: string
  value: number
  type: 'historical' | 'forecast' | 'today'
  isToday?: boolean
  lower?: number
  upper?: number
}

interface ForecastChartCellProps {
  data: ForecastDataPoint[]
  descriptionBottom?: string
}

export function ForecastChartCell({ data, descriptionBottom }: ForecastChartCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No data available</div>
  }

  // Separate historical and forecast data
  const historicalData = data.filter(d => d.type === 'historical' && typeof d.value === 'number')
  const forecastData = data.filter(d => d.type === 'forecast' && typeof d.value === 'number')
  const todayMarker = data.find(d => d.isToday)

  // Extend historical data to Today with the same value for seamless connection
  const extendedHistorical = todayMarker && historicalData.length > 0
    ? [...historicalData, { date: todayMarker.date, value: historicalData[historicalData.length - 1]?.value || 0, type: 'historical' }]
    : historicalData

  // Create confidence band data with lower and upper bounds
  const confidenceBand = forecastData.flatMap(d => [
    { date: d.date, value: d.lower || d.value * 0.9 },
    { date: d.date, value: d.upper || d.value * 1.1 }
  ])

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 450,
    height: 280,
    padding: 16,
    layer: [
      // Confidence band (area between upper and lower bounds)
      {
        data: { values: forecastData },
        mark: { type: 'area', opacity: 0.12, interpolate: 'monotone', color: '#3b82f6' },
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: { format: '%b %d', labelAngle: -45, labelFontSize: 10, title: null }
          },
          y: {
            field: 'lower',
            type: 'quantitative',
            axis: { title: 'Projected Volume', titleFontSize: 11, labelFontSize: 9 }
          },
          y2: { field: 'upper' }
        }
      },
      // Historical line
      {
        data: { values: extendedHistorical },
        mark: { type: 'line', point: true, color: '#3b82f6', size: 3 },
        encoding: {
          x: {
            field: 'date',
            type: 'temporal',
            axis: { format: '%b %d', labelAngle: -45, labelFontSize: 10, title: null }
          },
          y: {
            field: 'value',
            type: 'quantitative',
            axis: { title: 'Projected Volume', titleFontSize: 11, labelFontSize: 9 }
          },
          tooltip: [
            { field: 'date', type: 'temporal', title: 'Date', format: '%B %d, %Y' },
            { field: 'value', type: 'quantitative', title: 'Volume', format: ',.0f' }
          ]
        }
      },
      // Forecast line (dashed)
      {
        data: { values: forecastData },
        mark: { type: 'line', point: true, color: '#f97316', size: 3, strokeDash: [4, 4] },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
          tooltip: [
            { field: 'date', type: 'temporal', title: 'Forecast Date', format: '%B %d, %Y' },
            { field: 'value', type: 'quantitative', title: 'Projected Volume', format: ',.0f' },
            { field: 'lower', type: 'quantitative', title: 'Lower Bound', format: ',.0f' },
            { field: 'upper', type: 'quantitative', title: 'Upper Bound', format: ',.0f' }
          ]
        }
      },
      // Today divider line
      ...(todayMarker
        ? [
            {
              data: { values: [{ date: todayMarker.date }] },
              mark: { type: 'rule', color: '#10b981', size: 2 },
              encoding: {
                x: { field: 'date', type: 'temporal' }
              }
            },
            {
              data: { values: [{ date: todayMarker.date, label: 'Today' }] },
              mark: { type: 'text', align: 'left', dx: 4, fontSize: 10, color: '#10b981' },
              encoding: {
                x: { field: 'date', type: 'temporal' },
                text: { field: 'label' }
              }
            }
          ]
        : [])
    ],
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridColor: '#1d1d20',
        gridOpacity: 0.15,
        labelFontSize: 9,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5'
      },
      legend: {
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        labelFontSize: 9,
        titleFontSize: 10
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-stretch justify-center p-2 min-h-0">
        <VegaEmbed spec={spec as any} options={{ actions: false, renderer: 'canvas' }} />
      </div>
      {descriptionBottom && (
        <div className="px-4 py-2 border-t border-border/20 flex-shrink-0">
          <p className="text-xs text-muted-foreground leading-relaxed">{descriptionBottom}</p>
        </div>
      )}
    </div>
  )
}
