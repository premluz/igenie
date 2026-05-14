import { Search, Home, Activity, Compass, Database, Box, BarChart3, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CanvasGrid } from '@/components/CanvasGrid'
import { PrestoSidebar } from '@/components/PrestoSidebar'
import { usePrestoStore } from '@/store/usePrestoStore'
import { scenarioMap } from '@/scenarios'

export default function App() {
  const { loadScenario } = usePrestoStore()

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR NAV */}
      <nav className="w-14 border-r border-border bg-card/20 flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-accent text-background rounded-lg flex items-center justify-center font-bold text-lg mb-2">
          P
        </div>
        <div className="flex flex-col space-y-4 text-muted-foreground">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <Search size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <Home size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg text-foreground bg-accent/10 border border-accent/20"
          >
            <Activity size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <Compass size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <Database size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <Box size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
            <BarChart3 size={16} />
          </Button>
        </div>
      </nav>

      {/* CENTER CANVAS */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-card/20">
          <h1 className="text-sm font-semibold text-foreground">Canvas</h1>
          <div className="flex items-center gap-2">
            <select
              defaultValue="neutrogena-natural"
              onChange={(e) => loadScenario(e.target.value)}
              className="h-8 px-2 text-xs bg-card border border-border rounded-lg text-foreground cursor-pointer"
            >
              {Object.keys(scenarioMap).map(key => (
                <option key={key} value={key}>
                  {scenarioMap[key as keyof typeof scenarioMap].brand}
                </option>
              ))}
            </select>
            <Button
              onClick={() => loadScenario('neutrogena-natural')}
              size="sm"
              className="h-8 px-3 text-xs gap-2 rounded-lg"
            >
              <Play size={14} />
              Load
            </Button>
          </div>
        </div>
        <CanvasGrid />
      </div>

      {/* RIGHT SIDEBAR PRESTO */}
      <PrestoSidebar />
    </div>
  )
}
