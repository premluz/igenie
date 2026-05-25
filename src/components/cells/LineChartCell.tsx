import { VegaEmbed } from 'react-vega'
import { DescriptionBottom } from '../WidgetRenderer'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { motion } from 'framer-motion'

interface LineChartCellProps {
  data: Array<any>
  title?: string
  descriptionBottom?: string
}

export function LineChartCell({ data, title, descriptionBottom }: LineChartCellProps) {
  const { ref, isVisible } = useInViewAnimation({ delay: 300 })

  if (!data || data.length === 0) {
    return <div className="text-md text-muted-foreground text-center py-8">No data available</div>
  }

  let spec: any = null
  let error: string | null = null

  try {
    // Detect data format and extract series names
    const firstRow = data[0]
    const isMultiSeries = firstRow && typeof firstRow === 'object' && 'date' in firstRow && !('value' in firstRow)

    console.log('[LineChartCell] Data detected:', { count: data.length, isMultiSeries, firstRow })

    let seriesNames: string[] = []
    let normalizedData: Array<{ date: string; [key: string]: any }> = []

    if (isMultiSeries) {
      // Multi-series format: { date, series1, series2, ... }
      seriesNames = Object.keys(firstRow).filter(k => k !== 'date')
      normalizedData = data.filter(d =>
        d && typeof d === 'object' && typeof d.date === 'string' && d.date.length > 0
      )
      console.log('[LineChartCell] Multi-series detected:', { seriesNames, rowCount: normalizedData.length })
    } else {
      // Single-series format: { date, value }
      normalizedData = data.filter(
        d =>
          d &&
          typeof d === 'object' &&
          typeof d.date === 'string' &&
          d.date.length > 0 &&
          typeof d.value === 'number' &&
          isFinite(d.value)
      )
      seriesNames = ['value']
      console.log('[LineChartCell] Single-series detected:', { rowCount: normalizedData.length })
    }

    if (normalizedData.length === 0) {
      return <div className="text-sm text-muted-foreground text-center py-8">No valid data</div>
    }

    // For single series, compute min/max for annotation marks
    let minPoint: any = null
    let maxPoint: any = null
    let mean: number = 0

    if (!isMultiSeries) {
      const values = normalizedData.map(d => d.value)
      const sorted = [...normalizedData].sort((a, b) => a.value - b.value)
      minPoint = sorted[0]
      maxPoint = sorted[sorted.length - 1]
      mean = values.reduce((s, v) => s + v, 0) / values.length
    }

    // Generate spec based on series count
    spec = isMultiSeries
      ? generateMultiSeriesSpec(normalizedData, title, seriesNames)
      : generateSingleSeriesSpec(normalizedData, title, minPoint, maxPoint, mean)

    console.log('[LineChartCell] Spec generated:', { isMultiSeries, hasTitle: !!title, specKeys: Object.keys(spec) })
  } catch (err) {
    console.error('[LineChartCell] Error:', err)
    error = String(err)
  }

  if (error) {
    return <div className="text-sm text-danger text-center py-8">Error rendering chart: {error}</div>
  }

  if (!spec) {
    return <div className="text-sm text-muted-foreground text-center py-8">Unable to generate chart spec</div>
  }

  return (
    <div ref={ref} className="w-full h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 flex items-center justify-center min-h-0">
          {isVisible && <VegaEmbed spec={spec as any} options={{ actions: false, renderer: 'canvas' }} />}
        </div>
        {descriptionBottom && <DescriptionBottom text={descriptionBottom} />}
      </motion.div>
    </div>
  )
}

function generateSingleSeriesSpec(
  data: Array<any>,
  title: string | undefined,
  minPoint: any,
  maxPoint: any,
  mean: number
) {
  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 660,
    height: 240,
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
    data: { values: data },
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
            condition: { param: 'hover', empty: false, value: 250 },
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
}

function generateMultiSeriesSpec(
  data: Array<any>,
  title: string | undefined,
  seriesNames: string[]
) {
  const colors = ['#7C80EF', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#8b5cf6', '#ec4899']

  // Transform data to long format for Vega-Lite
  const longData: Array<{ date: string; series: string; value: number }> = []
  data.forEach(row => {
    seriesNames.forEach((series) => {
      const value = row[series]
      if (typeof value === 'number' && isFinite(value)) {
        longData.push({
          date: row.date,
          series,
          value,
        })
      }
    })
  })

  if (longData.length === 0) {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
      background: 'transparent',
      width: 'container',
      height: 260,
      autosize: { type: 'fit', contains: 'padding' },
      data: { values: [] },
      mark: 'point',
      encoding: { x: { field: 'value', type: 'quantitative' } },
    }
  }

  return {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 660,
    height: 380,
    padding: { left: 24, right: 24, top: 0, bottom: 8 },
    autosize: { type: 'fit', contains: 'padding', resize: true },
    title: title
      ? {
          text: title,
          color: '#f4f4f5',
          fontSize: 14,
          fontWeight: 600,
          anchor: 'start',
          dx: 4,
          offset: 100
          
        }
      : undefined,
    data: { values: longData },
    layer: [
      {
        mark: { type: 'line', interpolate: 'monotone', strokeWidth: 2.5 },
      },
      {
        mark: { type: 'point', filled: true, size: 40, strokeWidth: 1.5 },
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
          title: 'Buzz Score',
          titleFontSize: 11,
          labelFontSize: 9,
          titlePadding: 8,
          tickCount: 5,
        },
        scale: { zero: false, nice: true },
      },
      color: {
        field: 'series',
        type: 'nominal',
        scale: {
          domain: seriesNames,
          range: colors.slice(0, seriesNames.length),
        },
        legend: { title: 'Brand', offset: '20', orient: 'none', legendY: '-80', legendX: '-38', direction: 'horizontal', titlePadding: 0, labelPadding: 0 },
      },
      tooltip: [
        { field: 'date', type: 'temporal', title: 'Date', format: '%b %Y' },
        { field: 'series', type: 'nominal', title: 'Brand' },
        { field: 'value', type: 'quantitative', format: '.0f', title: 'Buzz Score' },
      ],
    },
    config: {
      view: { stroke: 'transparent', continuousWidth: 'container', continuousHeight: 260 },
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
        labelFontSize: 10,
        titleFontSize: 10,
        disable: false,
      },
      text: { fontSize: 9, fill: '#f4f4f5' },
      font: 'Inter, system-ui, sans-serif',
      mark: { opacity: 0.85 },
    },
  }
}
