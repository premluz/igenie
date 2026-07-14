import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState, memo, useMemo, useRef, useEffect } from 'react'
import { ChevronUp, ChevronDown, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInViewAnimation } from '@/hooks/useInViewAnimation'
import { createPortal } from 'react-dom'

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
  const [openPopover, setOpenPopover] = useState<string | null>(null)
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 })
  const popoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { tbodyRef, onMouseEnter, onMouseLeave } = useHoverClass('row-hovered')

  const handleHotspotEnter = (e: React.MouseEvent, rowId: string) => {
    const btn = e.currentTarget as HTMLButtonElement
    const rect = btn.getBoundingClientRect()
    setPopoverPos({
      x: rect.left - 264 + 34,
      y: rect.top + 32,
    })
    setOpenPopover(rowId)
    if (popoverTimeoutRef.current) clearTimeout(popoverTimeoutRef.current)
  }

  const handleHotspotLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      setOpenPopover(null)
    }, 200)
  }

  const handlePopoverEnter = () => {
    if (popoverTimeoutRef.current) clearTimeout(popoverTimeoutRef.current)
  }

  const handlePopoverLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      setOpenPopover(null)
    }, 200)
  }

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
            {table.getRowModel().rows.map((row, idx) => {
              const rowId = row.id
              const insight = row.original.insight

              return (
                <tr
                  key={row.id}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  className={`border-b border-border/30 transition-colors relative ${
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

                  {/* Insight Hotspot */}
                  {insight && (
                    <td className="px-2 py-2">
                      <button
                        onMouseEnter={(e) => handleHotspotEnter(e, rowId)}
                        onMouseLeave={handleHotspotLeave}
                        className="p-1 hover:bg-background/50 rounded transition-colors"
                        title="View insight"
                      >
                        <Lightbulb size={14} className={`${insight.color === 'green' ? 'text-green-400' : insight.color === 'red' ? 'text-red-400' : 'text-blue-400'}`} />
                      </button>

                      {/* Popover - Using Portal to escape table overflow */}
                      {openPopover === rowId && createPortal(
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-50"
                            onMouseEnter={handlePopoverEnter}
                            onMouseLeave={handlePopoverLeave}
                            style={{
                              left: `${popoverPos.x}px`,
                              top: `${popoverPos.y}px`
                            }}
                          >
                            <div className={`bg-background/95 border rounded-sm p-3 w-64 backdrop-blur-sm shadow-lg ${
                              insight.color === 'green' ? 'border-green-400/30 shadow-green-500/20' :
                              insight.color === 'red' ? 'border-red-400/30 shadow-red-500/20' :
                              'border-blue-400/30 shadow-blue-500/20'
                            }`}>
                              <p className={`text-sm font-medium mb-2 ${
                                insight.color === 'green' ? 'text-green-400' :
                                insight.color === 'red' ? 'text-red-400' :
                                'text-blue-400'
                              }`}>{row.original.brand}</p>
                              <p className="text-sm text-foreground leading-relaxed">{insight.description}</p>
                            </div>
                          </motion.div>
                        </AnimatePresence>,
                        document.body
                      )}
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
