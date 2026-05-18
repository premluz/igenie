import { VegaEmbed } from 'react-vega'
import { SimpleRadarChart } from './SimpleRadarChart'
import { useState, useEffect } from 'react'

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
    return <div className="text-md text-muted-foreground text-center py-8">No data available</div>
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

  // Use simpler approach: separate specs for each type and combine
  const actualData = chartData.filter(d => d.type === 'Actual')
  const benchmarkData = chartData.filter(d => d.type === 'Benchmark')

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width: 340,
    height: 340,
    padding: 20,
    title: null,
    layer: [
      // Benchmark layer
      {
        data: { values: benchmarkData },
        mark: { type: 'line', point: false, opacity: 0.15, color: '#6b7280', size: 2 },
        projection: { type: 'polar' },
        encoding: {
          theta: { field: 'dimension', type: 'nominal' },
          radius: { field: 'value', type: 'quantitative', scale: { zero: true, domainMax: 100 } },
          tooltip: { field: 'value', type: 'quantitative', format: '.0f' }
        }
      },
      // Benchmark area
      {
        data: { values: benchmarkData },
        mark: { type: 'area', opacity: 0.05, color: '#6b7280' },
        projection: { type: 'polar' },
        encoding: {
          theta: { field: 'dimension', type: 'nominal' },
          radius: { field: 'value', type: 'quantitative', scale: { zero: true, domainMax: 100 } }
        }
      },
      // Actual layer
      {
        data: { values: actualData },
        mark: { type: 'line', point: true, opacity: 0.8, color: '#3b82f6', size: 3 },
        projection: { type: 'polar' },
        encoding: {
          theta: { field: 'dimension', type: 'nominal' },
          radius: { field: 'value', type: 'quantitative', scale: { zero: true, domainMax: 100 } },
          tooltip: [
            { field: 'dimension', type: 'nominal', title: 'Dimension' },
            { field: 'value', type: 'quantitative', title: 'Score', format: '.0f' }
          ]
        }
      },
      // Actual area
      {
        data: { values: actualData },
        mark: { type: 'area', opacity: 0.25, color: '#3b82f6' },
        projection: { type: 'polar' },
        encoding: {
          theta: { field: 'dimension', type: 'nominal' },
          radius: { field: 'value', type: 'quantitative', scale: { zero: true, domainMax: 100 } }
        }
      }
    ],
    config: {
      view: { stroke: 'transparent' },
      axis: {
        grid: true,
        gridColor: '#1d1d20',
        gridOpacity: 0.15,
        labelFontSize: 10,
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5'
      }
    }
  }

  // Use simple SVG radar chart as it's more reliable than Vega-Lite polar projection
  const simpleData = cleanData.map(d => ({
    dimension: d.dimension,
    value: d.value,
    benchmark: d.benchmark
  }))

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center p-2 overflow-hidden">
        <SimpleRadarChart data={simpleData} />
      </div>
      {descriptionBottom && (
        <div className="px-4 pb-3 border-t border-border/20">
          <p className="text-md mt-8 bg-insight text-muted-foreground">{descriptionBottom}</p>
        </div>
      )}
    </div>
  )
}
