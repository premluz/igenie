import { ChevronUp, ChevronDown } from 'lucide-react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { WidgetRenderer } from './WidgetRenderer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function CanvasGrid() {
  const { currentView, moveRow, cellTypeFilter, cellTitleFilter } = usePrestoStore()
  const [activeTab, setActiveTab] = useState('pulse')

  if (!currentView) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // Use rows if available (detail view), otherwise use cells directly (listing view)
  let filteredRows = currentView.rows || []

  if (currentView.rows) {
    // Filter rows based on cell content
    filteredRows = filteredRows
      .map(row => ({
        ...row,
        cells: row.cells.filter(cell => {
          if (cellTypeFilter && cell.type !== cellTypeFilter) return false
          if (cellTitleFilter && !cell.title.toLowerCase().includes(cellTitleFilter.toLowerCase())) return false
          return true
        })
      }))
      .filter(row => row.cells.length > 0)
  }

  // All cells in a row get equal flex space
  const getColWidth = () => 'flex-1 min-w-0'

  // Determine if this is a listing view or detail view
  const isListingView = !currentView.rows

  // For listing view, organize cells by date groups with tabs
  if (isListingView) {
    // Split insights into today and yesterday groups
    const todayInsights = currentView.cells.slice(0, Math.ceil(currentView.cells.length / 2))
    const yesterdayInsights = currentView.cells.slice(Math.ceil(currentView.cells.length / 2))

    return (
      <div className="w-full h-full flex flex-col overflow-hidden bg-background">

        {/* Tabs Bar */}
        <div className="border-b -ml-4 border-border bg-background px-6 py-0 sticky top-0 z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-10 bg-transparent border-0 p-0 gap-0">
              <TabsTrigger
                value="pulse"
                className="text-xs px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-0 data-[state=active]:border-accent transition-colors border-b-0 border-transparent"
              >
                Pulse
              </TabsTrigger>
              <TabsTrigger
                value="watching"
                className="text-xs px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-0 data-[state=active]:border-accent transition-colors border-b-0 border-transparent"
              >
                Watching
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Insights List */}
        <div className="flex-1 overflow-y-auto">
          <div className="w-full">
            {/* Today Section */}
            {todayInsights.length > 0 && (
              <div>
                <div className="bg-background px-6 py-2 border-b border-border/20">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Today</h2>
                </div>
                <div className="border-t border-border/30 divide-y divide-border/30">
                  {todayInsights.map(cell => (
                    <div key={cell.id} className="flex">
                      <WidgetRenderer cell={cell} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yesterday Section */}
            {yesterdayInsights.length > 0 && (
              <div>
                <div className="bg-background px-6 py-2 border-b border-border/20">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Yesterday</h2>
                </div>
                <div className="border-t border-border/30 divide-y divide-border/30">
                  {yesterdayInsights.map(cell => (
                    <div key={cell.id} className="flex">
                      <WidgetRenderer cell={cell} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background">

      {/* Vertical scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-8xl mx-auto space-y-4">
          {/* Page Header - Title & Description (scrolls with content) */}
          {currentView.title && (
            <div className="mb-4 pb-6 border-b border-border">
              <h1 className="text-4xl font-bold text-foreground mb-2">{currentView.title}</h1>
              {currentView.description && (
                <p className="text-sm text-muted-foreground">{currentView.description}</p>
              )}
            </div>
          )}
          {filteredRows.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No rows. Click "Load Scenario" to begin.</p>
            </div>
          ) : (
            filteredRows.map((row) => (
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
