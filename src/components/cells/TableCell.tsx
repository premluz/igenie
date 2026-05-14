import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface TableCellProps {
  data: {
    columns: Array<{ key: string; label: string }>
    rows: Array<Record<string, any>>
    features?: {
      sorting?: boolean
      columnFilters?: string[]
      pagination?: { pageSize: number }
      virtualise?: boolean
    }
  }
}

export function TableCell({ data }: TableCellProps) {
  if (!data?.rows || data.rows.length === 0) {
    return <div className="text-sm text-muted-foreground text-center py-8">No data available</div>
  }

  const [sorting, setSorting] = useState<SortingState>([])

  // Create columns from data structure
  const columns: ColumnDef<Record<string, any>>[] = data.columns.map(col => ({
    accessorKey: col.key,
    header: col.label,
    cell: info => {
      const value = info.getValue()
      if (typeof value === 'number') {
        return typeof value === 'number' && value > 1 ? value.toFixed(1) : value
      }
      return String(value)
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
