import { Search, Home, Activity, Compass, Database, Box, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CanvasGrid } from '@/components/CanvasGrid'
import { PrestoSidebar } from '@/components/PrestoSidebar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { LandingScreen } from '@/components/LandingScreen'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

export default function App() {
  // useViewSync disabled - using React Router for URL management
  const location = useLocation()

  const isHome = location.pathname === '/'
  const isInsights = location.pathname.startsWith('/insights')

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR NAV */}
      <nav className="w-14 border-r border-border bg-background flex flex-col items-center py-4 space-y-6 relative z-10">
        <Link
          to="/"
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg mb-2 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-150"
        >
          <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </Link>
        <div className="flex flex-col space-y-4 text-muted-foreground">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
            <Search size={16} />
          </Button>
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 rounded-lg transition-colors duration-150 ${
                isHome ? 'text-foreground bg-accent/10 border border-accent/20' : 'hover:bg-white/10'
              }`}
            >
              <Home size={16} />
            </Button>
          </Link>
          <Link to="/insights">
            <Button
              variant="ghost"
              size="icon"
              className={`w-8 h-8 rounded-lg transition-colors duration-150 ${
                isInsights ? 'text-foreground bg-accent/10 border border-accent/20 hover:bg-accent/20' : 'hover:bg-white/10'
              }`}
            >
              <Activity size={16} />
            </Button>
          </Link>
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
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {location.pathname.startsWith('/insights') && (
          <div className="h-15 border-b border-border flex items-center bg-card/0">
            <Breadcrumb />
          </div>
        )}
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/insights" element={<CanvasGrid />} />
          <Route path="/insights/:scenarioId" element={<CanvasGrid />} />
        </Routes>
      </div>

      {/* RIGHT SIDEBAR PRESTO */}
      {location.pathname.startsWith('/insights') && <PrestoSidebar />}
    </div>
  )
}
