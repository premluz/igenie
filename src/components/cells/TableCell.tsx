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

// Render special cell types
function RenderCell({ value, columnName }: { value: any; columnName: string }) {
  const { ref, isVisible } = useInViewAnimation({ delay: 200 })

  // Progress bar for numeric values in progress column
  if ((columnName === 'Progress' || columnName === 'progress') && typeof value === 'number') {
    return (
      <div ref={ref} className="flex items-center gap-2">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${(value / 100) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-1.5 bg-blue-600 rounded-full"
          style={{ maxWidth: '60px' }}
        />
        <span className="text-xs text-muted-foreground">{value}</span>
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
      return <RenderCell value={value} columnName={columnName} />
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
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left font-semibold text-foreground border-r border-border/30 last:border-r-0 whitespace-nowrap"
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
                ))}
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
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 text-muted-foreground border-r border-border/20 last:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
