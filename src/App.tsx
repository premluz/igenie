import { Search, Home, Activity, Compass, Database, Box, BarChart3, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CanvasGrid } from '@/components/CanvasGrid'
import { PrestoSidebar } from '@/components/PrestoSidebar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { LandingScreen } from '@/components/LandingScreen'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export default function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  )
  const [justLoggedIn, setJustLoggedIn] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    setIsAuthenticated(false)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setJustLoggedIn(true)
    // Reset after animations complete
    setTimeout(() => setJustLoggedIn(false), 2000)
  }

  const isHome = location.pathname === '/'
  const isInsights = location.pathname.startsWith('/insights')

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        <LoginPage key="login" onLogin={handleLogin} />
      </AnimatePresence>
    )
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      {/* LEFT SIDEBAR NAV */}
      <nav className="w-16 border-r border-border bg-background flex flex-col items-center py-4 space-y-6 relative z-10">
        <Link
          to="/"
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg mb-2 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity duration-150"
        >
          <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </Link>
        <div className="flex flex-col space-y-4 text-muted-foreground flex-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <Search size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Search</TooltipContent>
          </Tooltip>

          <Link to="/">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 rounded-lg transition-colors duration-150 ${
                    isHome ? 'text-foreground bg-accent/10 border border-accent/20' : 'hover:bg-white/10'
                  }`}
                >
                  <Home size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
          </Link>

          <Link to="/insights">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`w-8 h-8 rounded-lg transition-colors duration-150 ${
                    isInsights ? 'text-foreground bg-accent/10 border border-accent/20 hover:bg-accent/20' : 'hover:bg-white/10'
                  }`}
                >
                  <Activity size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Insights</TooltipContent>
            </Tooltip>
          </Link>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <Compass size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Explore</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <Database size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Data</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <Box size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Projects</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-150">
                <BarChart3 size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="w-8 h-8 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors duration-150 text-muted-foreground"
            >
              <LogOut size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </nav>

      {/* HOLDING CONTAINER - wraps breadcrumb, content, and sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* BREADCRUMB - Spans full width within holding container */}
        {location.pathname.startsWith('/insights') && (
          <div className="h-10 border-b border-border flex items-center bg-card/0">
            <Breadcrumb />
          </div>
        )}

        {/* CENTER CANVAS + RIGHT SIDEBAR CONTAINER */}
        <div className="flex-1 flex overflow-hidden relative z-10">
          {/* CENTER CANVAS */}
          <div className="flex-1 flex flex-col overflow-hidden relative z-10">
            <Routes>
              <Route path="/" element={<LandingScreen shouldAnimate={justLoggedIn} />} />
              <Route path="/insights" element={<CanvasGrid />} />
              <Route path="/insights/:scenarioId" element={<CanvasGrid />} />
            </Routes>
          </div>

          {/* RIGHT SIDEBAR PRESTO */}
          {location.pathname.startsWith('/insights') && <PrestoSidebar />}
        </div>
      </div>
    </div>
  )
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return

    setIsLoading(true)
    await new Promise(res => setTimeout(res, 2000))
    setIsLoading(false)

    localStorage.setItem('isAuthenticated', 'true')
    onLogin()
  }

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-background"
      style={{
        backgroundImage: 'url(/images/genie-bg.png)',
        backgroundSize: 'auto 120%',
        backgroundPosition: '75% 20%',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <motion.div
        exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md rounded-md p-12 shadow-2xl"
        style={{ backgroundColor: '#343651' }}
      >
        <div className="mb-10 flex flex-col items-center">
          <img src="/images/logo-full.png" alt="i-Genie.ai" className="h-12 mb-4" />
          <p className="text-lg text-muted-foreground text-center">30 seconds away from your next consumer insight</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 bg-[#2A2A3E] text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#2A2A3E] text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:border-accent transition-colors"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password.trim()}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isLoading
                ? 'bg-[#F9D028] text-black cursor-not-allowed'
                : 'bg-[#F9D028] text-black hover:bg-[#E6C01F] active:bg-[#D4A91A]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Logging in...</span>
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}
