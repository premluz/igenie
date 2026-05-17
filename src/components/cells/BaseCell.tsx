import { AlertCircle, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { usePrestoStore, type Cell } from '@/store/usePrestoStore'
import { HoverActionBar } from './HoverActionBar'

interface BaseCellProps {
  cell: Cell
  children: React.ReactNode
  isTransitioning?: boolean
}

export function BaseCell({ cell, children, isTransitioning }: BaseCellProps) {
  const { replaceCell } = usePrestoStore()
  const [isHovering, setIsHovering] = useState(false)

  // Insight cards don't need the base cell wrapper
  if (cell.type === 'insight-card') {
    return <>{children}</>
  }

  const handleRetry = () => {
    // Find the row that contains this cell
    const { currentView } = usePrestoStore.getState()
    if (currentView?.rows) {
      const row = currentView.rows.find(r => r.cells.some(c => c.id === cell.id))
      if (row) {
        replaceCell(row.id, cell.id, { status: 'thinking', error: undefined })
      }
    }
  }


  return (
    <motion.div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative flex flex-col card-glass rounded-[4px] w-full h-full min-h-64 border-[#FFFFFF2E] overflow-visible
        ${cell.status === 'ready' ? 'cell-ready cell-border-glow' : ''}
        ${cell.status === 'error' ? 'border-danger' : ''}
      `}
      style={{ borderWidth: '1px', contain: 'layout' }}
    >
      <style>{`
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.1) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: skeleton-shimmer 1.2s infinite;
        }

        /* Delay child animations until content fade-in completes (500ms) */
        .animation-delay-on-reveal [class*="animate"] {
          animation-delay: 500ms !important;
        }
      `}</style>

      {/* Skeleton overlay - covers entire card including header when thinking */}
      {cell.status === 'thinking' && (
        <div className="absolute inset-0 z-10 rounded-[4px] overflow-hidden pointer-events-none">
          <div className="skeleton-shimmer absolute inset-0" />
        </div>
      )}

      {/* Inner content wrapper with overflow hidden for proper clipping */}
      <div className="flex flex-col h-full w-full overflow-hidden rounded-[4px]">
        {/* Hover action bar */}
        {isHovering && (
          <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <HoverActionBar />
          </div>
        )}

        {/* Header - show skeleton during landing transitions, visible otherwise */}
        <div className="px-4 py-3 border-b border-border/50 flex items-start justify-between gap-3 relative z-20">
          <div className="flex-1 min-w-0">
            {/* During landing transition with thinking status, show skeleton loaders for h3 */}
            {isTransitioning && cell.status === 'thinking' ? (
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/15 to-muted-foreground/10 rounded w-32 animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">{cell.title}</h3>
                </div>
                {cell.subtitle && (
                  <p className="text-sm text-muted-foreground truncate">{cell.subtitle}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content Area - always visible, shimmer overlay provides loading effect */}
        <div className="flex-1 p-4 overflow-auto relative flex flex-col">

          {/* Error state */}
          {cell.status === 'error' && (
            <div className="flex flex-col items-center justify-center gap-3 flex-1">
              <AlertCircle size={20} className="text-danger" />
              <div className="text-center">
                <p className="text-sm text-foreground font-semibold mb-1">Error</p>
                <p className="text-sm text-muted-foreground">{cell.error || 'Something went wrong'}</p>
              </div>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-foreground bg-accent hover:bg-accent/80 rounded-[4px] transition-colors"
              >
                <RotateCcw size={12} />
                Retry
              </button>
            </div>
          )}

          {/* Actual content - hidden during thinking so shimmer is the only thing visible */}
          {cell.status !== 'error' && (
            <div className={`transition-opacity duration-500 ${cell.status === 'thinking' ? 'opacity-0' : 'opacity-100'}`}>
              {/* Pass cell status to children so animations sync with fade-in */}
              {typeof children === 'object' && children && 'props' in children
                ? children
                : children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
