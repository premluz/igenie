import { Tabs } from '@/components/Tabs'
import { SearchFilterBar } from '@/components/SearchFilterBar'
import { WidgetRenderer } from '@/components/WidgetRenderer'
import { brandPerception } from '@/scenarios/brand-perception'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

export function BrandPerceptionPage() {
  const [cellsRevealed, setCellsRevealed] = useState(false)

  useEffect(() => {
    // Reveal cells immediately — no shimmer delay needed
    setCellsRevealed(true)
  }, [])
  const allRows = brandPerception.initialLayout
  const topRow = allRows[0]
  const bottomRow = allRows[1]

  const winnerCell = { ...topRow.cells[0], status: cellsRevealed ? 'ready' : 'thinking' }
  const loserCell = { ...topRow.cells[1], status: cellsRevealed ? 'ready' : 'thinking' }
  const trendCell = { ...topRow.cells[2], status: cellsRevealed ? 'ready' : 'thinking' }
  const rankingCell = { ...bottomRow.cells[0], status: cellsRevealed ? 'ready' : 'thinking' }

  return (
    <div className="min-h-screen flex items-start justify-center py-6">
      <div className="p-6 m-6 mt-0 border border-border rounded-sm max-w-8xl w-full space-y-4">
        {/* Header with Title and Search Bar */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-4">Brand Pulse</h1>

            {/* Tabs - Main dimensions */}
            <Tabs
              tabs={[
                { id: 'dimensions', label: 'Dimensions' },
                { id: 'social', label: 'Social + retail' },
                { id: 'composite', label: 'Composite' }
              ]}
              className="mb-4"
            />

            {/* Tabs - Sub dimensions */}
            <Tabs
              tabs={[
                { id: 'buzz', label: 'Buzz' },
                { id: 'superiority', label: 'Superiority' },
                { id: 'advocacy', label: 'Advocacy' }
              ]}
              variant="pill"
            />
          </div>

          {/* Search/Filter Bar - Right aligned */}
          <div className="flex-shrink-0">
            <SearchFilterBar />
          </div>
        </div>

        {/* Narrative/Insight */}
        <div className="flex items-center gap-3 mb-8">
          <p className="text-lg text-muted-foreground">Challenger momentum is accelerating — Pepsi gaining fastest across the category while legacy brands face broad declines.</p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-border text-subtle-foreground hover:border-purple-500 hover:text-accent transition-colors rounded-sm text-md">
              <Sparkles size={16} />
              Generate recommendations
            </button>
            <span className="text-xs text-muted-foreground whitespace-nowrap">Powered by Innov8</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="col-span-1 space-y-4">
          {/* Row 1: Winners and Losers side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-card rounded border border-border/20 overflow-hidden">
              <WidgetRenderer cell={winnerCell as any} />
            </div>
            <div className="bg-card rounded border border-border/20 overflow-hidden">
              <WidgetRenderer cell={loserCell as any} />
            </div>
          </div>

          {/* Row 2: Buzz Trends Chart */}
          <div className="bg-card rounded border border-border/20 overflow-hidden">
            <WidgetRenderer cell={trendCell as any} />
          </div>
        </div>

        {/* Right Column: Ranking Table */}
        <div className="col-span-1 bg-card rounded border border-border/20 overflow-hidden">
          <WidgetRenderer cell={rankingCell as any} />
        </div>
      </div>
      </div>
    </div>
  )
}
