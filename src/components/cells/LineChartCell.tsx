import { VegaEmbed } from 'react-vega'
import { DescriptionBottom } from '../WidgetRenderer'

interface LineChartCellProps {
  data: Array<{ date: string; value: number }>
  title?: string
  descriptionBottom?: string
}

export function LineChartCell({ data, title, descriptionBottom }: LineChartCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-md text-muted-foreground text-center py-8">No data available</div>
  }

  const validData = data.filter(
    d =>
      d &&
      typeof d === 'object' &&
      typeof d.date === 'string' &&
      d.date.length > 0 &&
      typeof d.value === 'number' &&
      isFinite(d.value)
  )

  if (validData.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No valid data</div>
  }

  // Compute min/max for annotation marks (highlights peak and trough)
  const sorted = [...validData].sort((a, b) => a.value - b.value)
  const minPoint = sorted[0]
  const maxPoint = sorted[sorted.length - 1]
  const values = validData.map(d => d.value)
  const mean = values.reduce((s, v) => s + v, 0) / values.length

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 'container',
    height: 260,
    padding: { left: 16, right: 16, top: 16, bottom: 8 },
    autosize: { type: 'fit', contains: 'padding', resize: true },
    title: title
      ? {
          text: title,
          color: '#f4f4f5',
          fontSize: 12,
          fontWeight: 600,
          anchor: 'start',
          dx: 4,
        }
      : undefined,
    data: { values: validData },
    layer: [
      {
        // Gradient area fill under the line
        mark: {
          type: 'area',
          interpolate: 'monotone',
          line: false,
          opacity: 0.25,
          color: {
            x1: 1,
            y1: 1,
            x2: 1,
            y2: 0,
            gradient: 'linear',
            stops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#7C80EF' },
            ],
          },
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
        },
      },
      {
        // Mean reference line
        data: { values: [{ mean }] },
        mark: {
          type: 'rule',
          stroke: '#8a8a96',
          strokeDash: [4, 4],
          strokeOpacity: 0.6,
        },
        encoding: {
          y: { field: 'mean', type: 'quantitative' },
        },
      },
      {
        // The line itself
        mark: {
          type: 'line',
          interpolate: 'monotone',
          stroke: '#7C80EF',
          strokeWidth: 2.5,
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
        },
      },
      {
        // Data points
        mark: {
          type: 'point',
          filled: true,
          size: 50,
          color: '#7C80EF',
          stroke: '#0F0F11',
          strokeWidth: 1.5,
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
          opacity: {
            condition: { param: 'hover', empty: false, value: 1 },
            value: 0.85,
          },
          size: {
            condition: { param: 'hover', empty: false, value: 140 },
            value: 50,
          },
          tooltip: [
            { field: 'date', type: 'temporal', title: 'Date', format: '%b %d, %Y' },
            { field: 'value', type: 'quantitative', format: '.2f', title: 'Score' },
          ],
        },
        params: [
          {
            name: 'hover',
            select: {
              type: 'point',
              fields: ['date'],
              nearest: true,
              on: 'mouseover',
              clear: 'mouseout',
            },
          },
        ],
      },
      {
        // Vertical hover rule
        mark: { type: 'rule', stroke: '#7C80EF', strokeOpacity: 0.4 },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          opacity: {
            condition: { param: 'hover', empty: false, value: 1 },
            value: 0,
          },
        },
      },
      {
        // Peak annotation
        data: { values: [maxPoint] },
        mark: {
          type: 'point',
          filled: true,
          size: 90,
          color: '#10b981',
          stroke: '#f4f4f5',
          strokeWidth: 1.5,
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
          tooltip: [
            { field: 'date', type: 'temporal', title: 'Peak Date', format: '%b %d, %Y' },
            { field: 'value', type: 'quantitative', format: '.2f', title: 'Peak Value' },
          ],
        },
      },
      {
        // Trough annotation
        data: { values: [minPoint] },
        mark: {
          type: 'point',
          filled: true,
          size: 90,
          color: '#ef4444',
          stroke: '#f4f4f5',
          strokeWidth: 1.5,
        },
        encoding: {
          x: { field: 'date', type: 'temporal' },
          y: { field: 'value', type: 'quantitative' },
          tooltip: [
            { field: 'date', type: 'temporal', title: 'Trough Date', format: '%b %d, %Y' },
            { field: 'value', type: 'quantitative', format: '.2f', title: 'Trough Value' },
          ],
        },
      },
    ],
    encoding: {
      x: {
        field: 'date',
        type: 'temporal',
        axis: {
          title: null,
          labelFontSize: 9,
          format: '%b %Y',
          labelAngle: 0,
          tickCount: 6,
          grid: false,
        },
      },
      y: {
        field: 'value',
        type: 'quantitative',
        axis: {
          title: 'Score',
          titleFontSize: 11,
          labelFontSize: 9,
          titlePadding: 8,
          tickCount: 5,
        },
        scale: { zero: false, nice: true },
      },
    },
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridOpacity: 0.15,
        gridColor: '#1d1d20',
        domainOpacity: 0,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        tickColor: '#3a3a44',
      },
      legend: {
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        labelFontSize: 9,
        titleFontSize: 10,
      },
      text: { fontSize: 9, fill: '#f4f4f5' },
      font: 'Inter, system-ui, sans-serif',
    },
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
