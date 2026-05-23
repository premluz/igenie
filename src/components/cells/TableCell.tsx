import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
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
function SparklineRenderer({ data }: { data: number[] }) {
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

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={trend === 'positive' ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// Render special cell types
function RenderCell({ value, columnName, row }: { value: any; columnName: string; row?: any }) {
  const { ref, isVisible } = useInViewAnimation({ delay: 200 })

  // Sparkline in Buzz column
  if ((columnName === 'Buzz' || columnName === 'buzz') && typeof value === 'number' && row?.sparkline) {
    return (
      <div ref={ref} className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SparklineRenderer data={row.sparkline} />
        </motion.div>
        <span className="text-xs font-medium text-foreground">{value}</span>
      </div>
    )
  }

  // Progress bar for numeric values in progress column
  if ((columnName === 'Progress' || columnName === 'progress') && typeof value === 'number') {
    return (
      <div ref={ref} className="flex items-center gap-2 w-full">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${(value / 100) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-0.5 bg-blue-600 rounded-full flex-1"
        />
        <span className="text-xs text-muted-foreground whitespace-nowrap">{value}</span>
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
    return <>{typeof value === 'number' && value > 1 ? value.toFixed(1) : value}</>
  }
  return <>{String(value)}</>
}

export function TableCell({ data }: TableCellProps) {
  if (!data?.rows || data.rows.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">No data available</div>
  }

  const [sorting, setSorting] = useState<SortingState>([])

  // Normalize columns to object format
  const normalizedColumns = Array.isArray(data.columns)
    ? data.columns.map(col =>
        typeof col === 'string'
          ? { key: col, label: col }
          : col
      )
    : data.columns

  // Create columns from data structure
  const columns: ColumnDef<Record<string, any>>[] = normalizedColumns.map(col => ({
    accessorKey: col.key,
    header: col.label,
    cell: info => {
      const value = info.getValue()
      const columnName = col.label
      const row = info.row.original
      return <RenderCell value={value} columnName={columnName} row={row} />
    },
  }))

  const table = useReactTable({
    data: data.rows,
    columns,
    state: {
      sorting,
    },
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
                    className="px-3 py-2 text-left font-semibold text-foreground border-r border-border/30 last:border-r-0 whitespace-nowrap"
                    onClick={() => {
                      if (data.features?.sorting && header.column.columnDef.enableSorting !== false) {
                        header.column.toggleSorting()
                      }
                    }}
                    style={{
                      cursor: data.features?.sorting ? 'pointer' : 'default',
                      width: isSmallCol ? '80px' : isBrand ? 'fit-content' : isProgress ? '1fr' : undefined,
                      maxWidth: isProgress ? '400px' : undefined,
                      paddingRight: isBrand ? '40px' : undefined
                    }}
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
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b border-border/30 hover:bg-card/50 transition-colors ${
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
                    className="px-3 py-2 text-muted-foreground border-r border-border/20 last:border-r-0"
                    style={{
                      width: isSmallCol ? '80px' : isBrand ? 'fit-content' : isProgress ? '1fr' : undefined,
                      maxWidth: isProgress ? '400px' : undefined,
                      paddingRight: isBrand ? '40px' : undefined
                    }}
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
