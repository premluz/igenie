import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState, memo, useMemo, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'

interface TableCellProps {
  data: {
    columns: string[] | Array<{ key: string; label: string }>
    rows: Array<Record<string, any>>
    features?: {
      sorting?: boolean
      columnFilters?: string[]
      pagination?: { pageSize: number }
      virtualise?: boolean
    }
  }
}

// Sparkline renderer for Buzz column
const SparklineRenderer = memo(function SparklineRenderer({ data, isVisible }: { data: number[]; isVisible?: boolean }) {
  if (!data || !Array.isArray(data) || data.length === 0) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const width = 60
  const height = 20
  const padding = 2

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * (width - padding * 2) + padding
      const y = height - padding - ((val - min) / range) * (height - padding * 2)
      return `${x},${y}`
    })
    .join(' ')

  const trend = data[data.length - 1] > data[0] ? 'positive' : 'negative'
  const color = trend === 'positive' ? '#10b981' : '#ef4444'

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={{ strokeDashoffset: 100, strokeDasharray: 100 }}
        animate={isVisible ? { strokeDashoffset: 0 } : { strokeDashoffset: 100 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </svg>
  )
})

// Render special cell types.
// `sparkline` is passed as a stable prop so memo can compare it without
// the whole `row` object (which has a new reference every render).
const RenderCell = memo(function RenderCell({
  value,
  columnName,
  sparkline,
}: {
  value: any
  columnName: string
  sparkline?: number[]
}) {
  const { ref, isVisible } = useInViewAnimation({ delay: 0 })

  // Sparkline in Buzz column
  if ((columnName === 'Buzz' || columnName === 'buzz') && typeof value === 'number' && sparkline) {
    return (
      <div ref={ref} className="flex items-center gap-2">
        <SparklineRenderer data={sparkline} isVisible={isVisible} />
        <span className="text-xs font-medium text-foreground">{value}</span>
      </div>
    )
  }

  // Progress bar for numeric values in progress column
  if ((columnName === 'Progress' || columnName === 'progress') && typeof value === 'number') {
    return (
      <div ref={ref} className="flex items-center gap-2 w-full">
        <div className="flex-1 bg-background/30 rounded-full h-0.5 overflow-hidden">
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isVisible ? { width: `${Math.min(Math.max(value, 0), 100)}%`, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-0.5 bg-blue-600 rounded-full"
          />
        </div>
      </div>
    )
  }

  // Sentiment color for YoY column
  if ((columnName === 'YoY' || columnName === 'yoy') && typeof value === 'string') {
    const isPositive = value.startsWith('+')
    return (
      <span className={isPositive ? 'text-emerald-400' : 'text-red-400'}>
        {value}
      </span>
    )
  }

  // Default rendering
  if (typeof value === 'number') {
    return <>{value > 1 ? value.toFixed(1) : value}</>
  }
  return <>{String(value)}</>
})

// Row hover is tracked with a CSS class via a ref so it never triggers a
// React state update (and therefore never causes a re-render).
function useHoverClass(hoverClass: string) {
  const tbodyRef = useRef<HTMLTableSectionElement>(null)

  function onMouseEnter(e: React.MouseEvent<HTMLTableRowElement>) {
    const row = e.currentTarget
    // Remove from any previously hovered row first
    tbodyRef.current?.querySelectorAll('tr.' + hoverClass).forEach(el => el.classList.remove(hoverClass))
    row.classList.add(hoverClass)
  }

  function onMouseLeave(e: React.MouseEvent<HTMLTableRowElement>) {
    e.currentTarget.classList.remove(hoverClass)
  }

  return { tbodyRef, onMouseEnter, onMouseLeave }
}

export function TableCell({ data }: TableCellProps) {
  if (!data?.rows || data.rows.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">No data available</div>
  }

  const [sorting, setSorting] = useState<SortingState>([])
  const { tbodyRef, onMouseEnter, onMouseLeave } = useHoverClass('row-hovered')

  // Normalize columns to object format — stable as long as data.columns doesn't change
  const normalizedColumns = useMemo(
    () =>
      Array.isArray(data.columns)
        ? data.columns.map(col =>
            typeof col === 'string' ? { key: col, label: col } : col
          )
        : data.columns,
    [data.columns]
  )

  // Memoize column definitions so TanStack Table never sees new column objects
  // on unrelated re-renders. The cell renderer only receives stable scalar
  // props, which lets RenderCell's own memo bail out on hover.
  const columns: ColumnDef<Record<string, any>>[] = useMemo(
    () =>
      normalizedColumns.map(col => ({
        accessorKey: col.key,
        header: col.label,
        cell: info => {
          const value = info.getValue()
          const row = info.row.original
          return (
            <RenderCell
              value={value}
              columnName={col.label}
              sparkline={row.sparkline}
            />
          )
        },
      })),
    [normalizedColumns]
  )

  const table = useReactTable({
    data: data.rows,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: data.features?.pagination ? true : false,
  })

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 bg-card/50 border-b border-border">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const colName = (header.column.columnDef.header as string) || ''
                  const isSmallCol = ['yoy', 'buzz'].some(n => colName.toLowerCase().includes(n))
                  const isBrand = colName.toLowerCase().includes('brand')
                  const isProgress = colName.toLowerCase().includes('progress')
                  return (
                    <th
                      key={header.id}
                      className={`px-3 py-2 text-left font-semibold text-foreground border-r border-border/30 last:border-r-0 whitespace-nowrap ${
                        isSmallCol ? 'max-w-40' : isBrand ? 'max-w-16' : isProgress ? 'min-w-52' : ''
                      }`}
                      onClick={() => {
                        if (data.features?.sorting && header.column.columnDef.enableSorting !== false) {
                          header.column.toggleSorting()
                        }
                      }}
                      style={{ cursor: data.features?.sorting ? 'pointer' : 'default' }}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {data.features?.sorting && header.column.getIsSorted() && (
                          <div className="flex-shrink-0">
                            {header.column.getIsSorted() === 'asc' ? (
                              <ChevronUp size={12} />
                            ) : (
                              <ChevronDown size={12} />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody ref={tbodyRef}>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={`border-b border-border/30 transition-colors ${
                  idx % 2 === 0 ? 'bg-background/50' : ''
                }`}
              >
                {row.getVisibleCells().map(cell => {
                  const colName = (cell.column.columnDef.header as string) || ''
                  const isSmallCol = ['yoy', 'buzz'].some(n => colName.toLowerCase().includes(n))
                  const isBrand = colName.toLowerCase().includes('brand')
                  const isProgress = colName.toLowerCase().includes('progress')
                  return (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 text-muted-foreground border-r border-border/20 last:border-r-0 ${
                        isSmallCol ? 'max-w-16' : isBrand ? 'max-w-40' : isProgress ? 'min-w-52' : ''
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
