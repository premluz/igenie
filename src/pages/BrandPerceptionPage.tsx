import { Tabs } from '@/components/Tabs'
import { SearchFilterBar } from '@/components/SearchFilterBar'
import { WidgetRenderer } from '@/components/WidgetRenderer'
import { brandPerception } from '@/scenarios/brand-perception'

export function BrandPerceptionPage() {
  // Get cells from scenario - handle both flat and nested structure
  const allRows = brandPerception.initialLayout
  const leftRowCells = allRows[0]
  const rightRowCells = allRows[1]

  // Left column cells
  const winnerCell = leftRowCells.cells[0]
  const trendCell = leftRowCells.cells[1]
  
  // Right column cell
  const rankingCell = rightRowCells.cells[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold text-foreground mb-4">Brand perception</h1>

        {/* Tabs - Main dimensions */}
        <Tabs
          tabs={[
            { id: 'dimensions', label: 'Dimensions' },
            { id: 'social', label: 'Social + retail' },
            { id: 'composite', label: 'Composite' }
          ]}
          className="mb-6"
        />

        {/* Tabs - Sub dimensions */}
        <Tabs
          tabs={[
            { id: 'buzz', label: 'Buzz' },
            { id: 'superiority', label: 'Superiority' },
            { id: 'advocacy', label: 'Advocacy' }
          ]}
          variant="pill"
          className="mb-6"
        />
      </div>

      {/* Search/Filter Bar */}
      <SearchFilterBar />

      {/* Narrative/Insight */}
      <div className="px-6 py-4 text-sm text-muted-foreground">
        <p>Challenger momentum is accelerating — Pepsi gaining fastest across the category while legacy brands face broad declines.</p>
      </div>

      {/* Main Content Grid */}
      <div className="px-6 py-6 grid grid-cols-3 gap-6">
        {/* Left Column - 2 rows */}
        <div className="col-span-2 space-y-6">
          {/* Row 1: Will contain winners + losers when we have them */}
          {/* For now just show the first cell from left column */}
          <div className="bg-card rounded-lg border border-border/20 overflow-hidden">
            <WidgetRenderer cell={winnerCell as any} />
          </div>

          {/* Row 2: Trends Chart */}
          <div className="bg-card rounded-lg border border-border/20 overflow-hidden">
            <WidgetRenderer cell={trendCell as any} />
          </div>
        </div>

        {/* Right Column: Full Height Ranking Table */}
        <div className="col-span-1 bg-card rounded-lg border border-border/20 overflow-hidden">
          <WidgetRenderer cell={rankingCell as any} />
        </div>
      </div>
    </div>
  )
}
