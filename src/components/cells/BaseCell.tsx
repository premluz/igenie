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
      layout
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        relative flex flex-col bg-card border border-border rounded-[4px] overflow-visible w-full h-full
        ${cell.status === 'ready' ? 'cell-ready cell-border-glow' : ''}
        ${cell.status === 'error' ? 'border-danger' : ''}
        transition-all duration-300
      `}
      style={{ borderWidth: '1px', contain: 'layout' }}
    >
      {/* Hover action bar */}
      {isHovering && (
        <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <HoverActionBar />
        </div>
      )}
      <style>{`
        @keyframes skeleton-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.02) 20%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(255, 255, 255, 0.02) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: skeleton-shimmer 1.2s infinite;
        }

        @keyframes glow-border-rotate {
          100% {
            transform: translate(-50%, -50%) rotate(1turn);
          }
        }

        .glow-border-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 99999px;
          height: 99999px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(rgba(0, 212, 255, 0.6), rgba(0, 212, 255, 0), rgba(0, 212, 255, 0));
          transform: translate(-50%, -50%) rotate(0deg);
          animation: glow-border-rotate 4s linear infinite;
          z-index: -1;
        }

        .glow-border-inner::after {
          content: '';
          position: absolute;
          inset: 1px;
          background: rgb(22, 23, 28);
          border-radius: 4px;
          z-index: -1;
        }
      `}</style>

      {/* Glow border - AI operating indicator */}
      {cell.status === 'thinking' && (
        <>
          <div className="glow-border-container absolute inset-0 rounded-[4px] overflow-hidden" />
          <div className="glow-border-inner absolute inset-0 rounded-[4px]" />
        </>
      )}

      {/* Skeleton overlay - covers entire card including header when thinking */}
      {cell.status === 'thinking' && (
        <div className="absolute inset-0 z-10 skeleton-shimmer rounded-[4px]" />
      )}

      {/* Header */}
      <div className="px-4 py-3 border-b border-border/50 flex items-start justify-between gap-3 relative z-20 bg-card">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-foreground truncate">{cell.title}</h3>
            {cell.status === 'thinking' && (
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
            )}
          </div>
          {cell.subtitle && (
            <p className="text-sm text-muted-foreground truncate">{cell.subtitle}</p>
          )}
        </div>

      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-auto relative flex flex-col bg-card">
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

        {/* Content - always rendered, opacity changes */}
        <div
          className={`flex-1 transition-opacity duration-300 ${
            cell.status === 'ready' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}
