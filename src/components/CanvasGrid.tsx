import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { usePrestoStore, type CellType } from '@/store/usePrestoStore'
import { WidgetRenderer } from './WidgetRenderer'
import { Button } from '@/components/ui/button'

export function CanvasGrid() {
  const { rows, removeCell, moveRow, cellTypeFilter, cellTitleFilter, activeInsight } = usePrestoStore()

  // Filter rows based on cell content
  const filteredRows = rows
    .map(row => ({
      ...row,
      cells: row.cells.filter(cell => {
        if (cellTypeFilter && cell.type !== cellTypeFilter) return false
        if (cellTitleFilter && !cell.title.toLowerCase().includes(cellTitleFilter.toLowerCase())) return false
        return true
      })
    }))
    .filter(row => row.cells.length > 0)

  // All cells in a row get equal flex space
  const getColWidth = () => 'flex-1 min-w-0'

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background">
      {/* Vertical scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-8xl mx-auto space-y-4">
          {/* Page Header - Title & Description (scrolls with content) */}
          {activeInsight && (
            <div className="mb-4 pb-6 border-b border-border">
              <h1 className="text-2xl font-bold text-foreground mb-2">{activeInsight.title}</h1>
              {activeInsight.description && (
                <p className="text-sm text-muted-foreground">{activeInsight.description}</p>
              )}
            </div>
          )}
          {filteredRows.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No rows. Click "Load Scenario" to begin.</p>
            </div>
          ) : (
            filteredRows.map((row, idx) => (
              <div key={row.id} className="group relative">
                {/* Move controls (on hover, left side) */}
                <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => moveRow(row.id, 'up')}
                    title="Move row up"
                  >
                    <ChevronUp size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => moveRow(row.id, 'down')}
                    title="Move row down"
                  >
                    <ChevronDown size={14} />
                  </Button>
                </div>

                {/* Row: flex container with equal-width columns and equal height */}
                <div className="flex gap-4 w-full items-stretch">
                  {row.cells.map(cell => (
                    <div key={cell.id} className={`${getColWidth()} flex`}>
                      <WidgetRenderer cell={cell} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
