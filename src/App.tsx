import { Search, Home, Activity, Compass, Database, Box, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CanvasGrid } from '@/components/CanvasGrid'
import { PrestoSidebar } from '@/components/PrestoSidebar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { useViewSync } from '@/hooks/useViewSync'

export default function App() {
  useViewSync()

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR NAV */}
      <nav className="w-14 border-r border-border bg-background flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-accent text-background rounded-lg flex items-center justify-center font-bold text-lg mb-2">
          P
        </div>
        <div className="flex flex-col space-y-4 text-muted-foreground">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Search size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Home size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-lg text-foreground bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-colors duration-150"
          >
            <Activity size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Compass size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Database size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Box size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <BarChart3 size={16} />
          </Button>
        </div>
      </nav>

      {/* CENTER CANVAS */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-15 border-b border-border flex items-center bg-card/20">
             <Breadcrumb />
        </div>
        <CanvasGrid />
      </div>

      {/* RIGHT SIDEBAR PRESTO */}
      <PrestoSidebar />
    </div>
  )
}
