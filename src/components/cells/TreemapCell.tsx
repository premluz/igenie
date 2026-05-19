import { VegaEmbed } from 'react-vega'
import { DescriptionBottom } from '../WidgetRenderer'

interface TreemapCellProps {
  data: Array<{ label: string; value: number; category?: string }>
  descriptionBottom?: string
}

// Squarified treemap layout — computes rectangle coordinates so we can render
// the treemap natively in Vega-Lite (which has no built-in treemap transform).
interface TreemapRect {
  label: string
  value: number
  category: string
  share: number
  x0: number
  y0: number
  x1: number
  y1: number
  width: number
  height: number
  cx: number
  cy: number
}

function squarify(
  items: Array<{ label: string; value: number; category: string }>,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): TreemapRect[] {
  const total = items.reduce((sum, d) => sum + d.value, 0)
  if (total <= 0) return []

  // Scale values to area of bounding box
  const area = (x1 - x0) * (y1 - y0)
  const scaled = items.map(d => ({
    ...d,
    scaledValue: (d.value / total) * area,
  }))
  // Sort descending — squarify expects this
  scaled.sort((a, b) => b.scaledValue - a.scaledValue)

  const result: TreemapRect[] = []

  function worst(row: typeof scaled, w: number): number {
    if (row.length === 0) return Infinity
    const rowSum = row.reduce((s, d) => s + d.scaledValue, 0)
    const rMax = Math.max(...row.map(d => d.scaledValue))
    const rMin = Math.min(...row.map(d => d.scaledValue))
    const w2 = w * w
    const s2 = rowSum * rowSum
    return Math.max((w2 * rMax) / s2, s2 / (w2 * rMin))
  }

  function layoutRow(
    row: typeof scaled,
    rx0: number,
    ry0: number,
    rx1: number,
    ry1: number,
    horizontal: boolean
  ) {
    const rowSum = row.reduce((s, d) => s + d.scaledValue, 0)
    if (rowSum <= 0) return
    if (horizontal) {
      // Row sits along top; each item takes proportional width
      const rowHeight = rowSum / (rx1 - rx0)
      let cursor = rx0
      for (const item of row) {
        const w = item.scaledValue / rowHeight
        result.push(makeRect(item, cursor, ry0, cursor + w, ry0 + rowHeight))
        cursor += w
      }
    } else {
      const rowWidth = rowSum / (ry1 - ry0)
      let cursor = ry0
      for (const item of row) {
        const h = item.scaledValue / rowWidth
        result.push(makeRect(item, rx0, cursor, rx0 + rowWidth, cursor + h))
        cursor += h
      }
    }
  }

  function makeRect(
    item: { label: string; value: number; category: string; scaledValue: number },
    rx0: number,
    ry0: number,
    rx1: number,
    ry1: number
  ): TreemapRect {
    return {
      label: item.label,
      value: item.value,
      category: item.category,
      share: item.scaledValue / area,
      x0: rx0,
      y0: ry0,
      x1: rx1,
      y1: ry1,
      width: rx1 - rx0,
      height: ry1 - ry0,
      cx: (rx0 + rx1) / 2,
      cy: (ry0 + ry1) / 2,
    }
  }

  function recurse(items: typeof scaled, rx0: number, ry0: number, rx1: number, ry1: number) {
    if (items.length === 0) return
    if (items.length === 1) {
      result.push(makeRect(items[0], rx0, ry0, rx1, ry1))
      return
    }
    const rw = rx1 - rx0
    const rh = ry1 - ry0
    const horizontal = rw >= rh
    const shortSide = Math.min(rw, rh)
    const row: typeof scaled = []
    let i = 0
    while (i < items.length) {
      const next = items[i]
      const candidate = [...row, next]
      if (row.length === 0 || worst(candidate, shortSide) <= worst(row, shortSide)) {
        row.push(next)
        i++
      } else {
        break
      }
    }
    // Place row
    const rowSum = row.reduce((s, d) => s + d.scaledValue, 0)
    if (horizontal) {
      const rowHeight = rowSum / rw
      layoutRow(row, rx0, ry0, rx1, ry0 + rowHeight, true)
      recurse(items.slice(i), rx0, ry0 + rowHeight, rx1, ry1)
    } else {
      const rowWidth = rowSum / rh
      layoutRow(row, rx0, ry0, rx0 + rowWidth, ry1, false)
      recurse(items.slice(i), rx0 + rowWidth, ry0, rx1, ry1)
    }
  }

  recurse(scaled, x0, y0, x1, y1)
  return result
}

export function TreemapCell({ data, descriptionBottom }: TreemapCellProps) {
  if (!data || data.length === 0) {
    return <div className="text-md text-muted-foreground text-center py-8">No data available</div>
  }

  const validData = data.filter(
    d =>
      d &&
      typeof d === 'object' &&
      typeof d.label === 'string' &&
      d.label.length > 0 &&
      typeof d.value === 'number' &&
      isFinite(d.value) &&
      d.value > 0
  )

  if (validData.length === 0) {
    return <div className="text-xs text-muted-foreground text-center py-8">No valid data</div>
  }

  const width = 450
  const height = 280

  const normalized = validData.map(d => ({
    label: d.label,
    value: d.value,
    category: d.category || d.label,
  }))

  const categories = [...new Set(normalized.map(d => d.category))]
  const colorScale = [
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
    '#ec4899',
    '#14b8a6',
    '#eab308',
    '#f97316',
  ]

  const rects = squarify(normalized, 0, 0, width, height)
  const total = normalized.reduce((s, d) => s + d.value, 0)

  // Labels are rendered as separate marks via a layer so we can conditionally hide
  // them when a rectangle is too small to display text.
  const labelData = rects.map(r => ({
    ...r,
    showLabel: r.width >= 50 && r.height >= 28,
    showValue: r.width >= 60 && r.height >= 44,
    sharePct: (r.value / total) * 100,
  }))

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v6.json',
    background: 'transparent',
    width,
    height,
    padding: 0,
    data: { values: labelData },
    layer: [
      {
        // Rectangle marks — the treemap tiles
        mark: {
          type: 'rect',
          stroke: '#24242E',
          strokeWidth: 1,
          cursor: 'pointer',
        },
        encoding: {
          x: { field: 'x0', type: 'quantitative', scale: { domain: [0, width] }, axis: null },
          x2: { field: 'x1' },
          y: { field: 'y0', type: 'quantitative', scale: { domain: [0, height] }, axis: null },
          y2: { field: 'y1' },
          color: {
            field: 'category',
            type: 'nominal',
            scale: { domain: categories, range: colorScale },
            legend:
              categories.length > 1 && categories[0] !== normalized[0].label
                ? {
                    orient: 'bottom',
                    title: 'Category',
                    labelFontSize: 9,
                    titleFontSize: 10,
                    symbolSize: 100,
                  }
                : null,
          },
          opacity: {
            condition: { param: 'hover', empty: false, value: 1 },
            value: 0.9,
          },
          tooltip: [
            { field: 'label', type: 'nominal', title: 'Label' },
            { field: 'category', type: 'nominal', title: 'Category' },
            { field: 'value', type: 'quantitative', format: ',.0f', title: 'Value' },
            { field: 'sharePct', type: 'quantitative', format: '.1f', title: 'Share %' },
          ],
        },
        params: [
          {
            name: 'hover',
            select: { type: 'point', on: 'mouseover', clear: 'mouseout' },
          },
        ],
      },
      {
        // Primary label (name) — centered horizontally, near top of cell
        transform: [{ filter: 'datum.showLabel' }],
        mark: {
          type: 'text',
          align: 'left',
          baseline: 'top',
          fontSize: 11,
          fontWeight: 600,
          fill: '#f4f4f5',
          dx: 6,
          dy: 6,
        },
        encoding: {
          x: { field: 'x0', type: 'quantitative', scale: { domain: [0, width] } },
          y: { field: 'y0', type: 'quantitative', scale: { domain: [0, height] } },
          text: { field: 'label', type: 'nominal' },
        },
      },
      {
        // Secondary label (value)
        transform: [{ filter: 'datum.showValue' }],
        mark: {
          type: 'text',
          align: 'left',
          baseline: 'top',
          fontSize: 10,
          fill: '#B2B2BF',
          dx: 6,
          dy: 22,
        },
        encoding: {
          x: { field: 'x0', type: 'quantitative', scale: { domain: [0, width] } },
          y: { field: 'y0', type: 'quantitative', scale: { domain: [0, height] } },
          text: { field: 'value', type: 'quantitative', format: ',.0f' },
        },
      },
      {
        // Share percentage label
        transform: [{ filter: 'datum.showValue' }],
        mark: {
          type: 'text',
          align: 'left',
          baseline: 'top',
          fontSize: 9,
          fill: '#8a8a96',
          dx: 6,
          dy: 36,
        },
        encoding: {
          x: { field: 'x0', type: 'quantitative', scale: { domain: [0, width] } },
          y: { field: 'y0', type: 'quantitative', scale: { domain: [0, height] } },
          text: { field: 'sharePct', type: 'quantitative', format: '.1f' },
        },
      },
    ],
    config: {
      view: { stroke: 'transparent' },
      axis: { disable: true },
      legend: {
        labelColor: '#f4f4f5',
        titleColor: '#f4f4f5',
        labelFontSize: 9,
        titleFontSize: 10,
        symbolType: 'square',
      },
      text: { font: 'Inter, system-ui, sans-serif' },
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
