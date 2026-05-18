import { ChevronUp, ChevronDown, Grid3x3, List } from 'lucide-react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { WidgetRenderer } from './WidgetRenderer'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InsightGridCard } from './cells/InsightGridCard'
import { useParams } from 'react-router-dom'
import { GeminiStreamText } from './GeminiStreamText'
import { BorderGlowOverlay } from './BorderGlowOverlay'
import { AmbientGridBackground } from './AmbientGridBackground'

export function CanvasGrid() {
  const { scenarioId } = useParams<{ scenarioId: string }>()
  const { currentView, moveRow, cellTypeFilter, cellTitleFilter, isTransitioning, revealCells, revealCellsGradually } = usePrestoStore()
  const [activeTab, setActiveTab] = useState('pulse')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [cellsRevealed, setCellsRevealed] = useState(false)

  // Load scenario from URL on mount or when scenarioId changes
  useEffect(() => {
    const store = usePrestoStore.getState()

    // Reset cellsRevealed when navigating to a new scenario
    setCellsRevealed(false)

    if (scenarioId) {
      // Only load if not already loaded (prevents duplicate loading from LandingScreen pre-load)
      if (!store.currentView || store.currentView.scenarioId !== scenarioId) {
        store.loadScenarioDetail(scenarioId)
      }
    } else {
      // No scenarioId means we should show the listing view
      store.clearCanvas()
    }
  }, [scenarioId])

  // Also reset cellsRevealed when the view id changes (covers detail→detail transitions
  // where scenarioId URL param doesn't change because no navigate() is called)
  useEffect(() => {
    if (currentView?.id) {
      setCellsRevealed(false)
    }
  }, [currentView?.id])

  // Reveal cells when ready: only for direct URL navigation (not managed transitions).
  // When isTransitioning is true, the transition manager (LandingScreen or
  // useScenarioDetection) is responsible for calling revealCellsGradually/revealCells.
  useEffect(() => {
    if (currentView?.rows && currentView.rows.length > 0 && !cellsRevealed && !isTransitioning) {
      // Check if any cells are still in 'thinking' state — if so, we need to reveal them.
      // This covers normal URL navigation where no managed transition is running.
      const hasThinkingCells = currentView.rows.some(row =>
        row.cells.some(cell => cell.status === 'thinking')
      )

      if (hasThinkingCells) {
        // Show shimmer for a short period, then gradually reveal cells
        const timer = setTimeout(() => {
          revealCellsGradually(600)
          setCellsRevealed(true)
        }, 800)

        return () => clearTimeout(timer)
      }
    }
  }, [isTransitioning, currentView?.rows, currentView?.id, cellsRevealed, revealCells, revealCellsGradually])

  // Show loading message only if no current view
  if (!currentView) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  // For detail views, show loading message while rows are being loaded
  const isDetailView = currentView.id?.startsWith('detail-')
  if (isDetailView && !currentView.rows) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading scenario...</p>
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
        <div className="border-b -ml-4 border-border bg-background px-6 py-0 sticky top-0 z-10 flex items-center justify-between">
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

          {/* View Mode Toggle */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              className="h-8 px-2"
              onClick={() => setViewMode('list')}
              title="List view"
            >
              <List size={14} />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              className="h-8 px-2"
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Grid3x3 size={14} />
            </Button>
          </div>
        </div>

        {/* Insights List/Grid */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'list' ? (
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
                        <WidgetRenderer cell={cell} isTransitioning={isTransitioning} />
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
                        <WidgetRenderer cell={cell} isTransitioning={isTransitioning} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl">
                {[...todayInsights, ...yesterdayInsights].map(cell => (
                  <InsightGridCard
                    key={cell.id}
                    data={cell.data as any}
                    title={cell.title}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-background relative">
      <BorderGlowOverlay isActive={isTransitioning} />

      {/* Ambient grid background - change false to true or isTransitioning to enable */}
      {false && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <AmbientGridBackground
            showNodeLines={false}
            enableMagneticCursor={false}
            nodeLineColor="rgba(255, 255, 255, 0.5)"
            nodeLineOpacity={0.3}
            nodeLineDistance={60}
            nodeConnectionCount={1}
            activeNodeCount={600}
            magneticStrength={8}
            magneticRadius={150}
          />
        </div>
      )}

      {/* Vertical scrollable content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="p-6 max-w-8xl mx-auto space-y-4">
          {/* Page Header - Title & Description (scrolls with content) */}
          {(currentView.title || isTransitioning) && (
            <div className="mb-4 pb-6 border-b border-border">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {isTransitioning ? (
                  // During loading: show dynamic loading text with cursor
                  <GeminiStreamText
                    text={(currentView as any)?.loadingTitle || 'Assembling insight dashboard'}
                    speed={12}
                    showCursor={true}
                  />
                ) : (
                  // After loading: show real title with reveal animation
                  <GeminiStreamText
                    text={currentView.title || ''}
                    speed={((currentView as any)?.animationSpeed?.title as number) ?? 12}
                    showCursor={false}
                  />
                )}
              </h1>
              {currentView.description && (
                <p className={`text-lg text-subtle-foreground transition-opacity duration-700 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                  <GeminiStreamText
                    text={currentView.description}
                    speed={((currentView as any)?.animationSpeed?.description as number) ?? 12}
                    showCursor={false}
                  />
                </p>
              )}
            </div>
          )}
          {filteredRows.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">No rows. Click "Load Scenario" to begin.</p>
            </div>
          ) : (
            filteredRows.map((row) => (
              <div key={row.id} className={`group relative transition-opacity duration-700 ${isTransitioning ? 'pointer-events-none' : 'opacity-100'} opacity-100`}>
                {/* Move controls (on hover, left side) */}
                <div className={`absolute -left-12 top-2 ${isTransitioning ? 'hidden' : 'opacity-0 group-hover:opacity-100'} transition-opacity flex flex-col gap-1`}>
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
                      <WidgetRenderer cell={cell} isTransitioning={isTransitioning} />
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
