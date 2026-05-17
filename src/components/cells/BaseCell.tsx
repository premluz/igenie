import { AlertCircle, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { usePrestoStore, type Cell } from '@/store/usePrestoStore'
import { HoverActionBar } from './HoverActionBar'

interface BaseCellProps {
  cell: Cell
  children: React.ReactNode
}

export function BaseCell({ cell, children }: BaseCellProps) {
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
        @keyframes diagonal-shimmer {
          0% {
            transform: translateX(-150%) translateY(-150%) rotate(45deg);
          }
          100% {
            transform: translateX(150%) translateY(150%) rotate(45deg);
          }
        }
        .diagonal-skeleton-loader {
          animation: diagonal-shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 80%,
            transparent 100%
          );
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
          filter: blur(8px);
        }
      `}</style>

      {/* Shimmer layer - constrained with overflow hidden */}
      {cell.status === 'thinking' && (
        <div className="absolute inset-0 rounded-[4px] overflow-hidden pointer-events-none">
          <div className="diagonal-skeleton-loader" />
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

        {/* Header */}
        <div className="px-4 py-3 border-b border-border/50 flex items-start justify-between gap-3 relative">
          {cell.status === 'ready' && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-foreground truncate">{cell.title}</h3>
              </div>
              {cell.subtitle && (
                <p className="text-sm text-muted-foreground truncate">{cell.subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Content Area */}
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

          {/* Actual content - only show when ready */}
          {cell.status === 'ready' && (
            <div className="transition-opacity duration-500">
              {children}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
