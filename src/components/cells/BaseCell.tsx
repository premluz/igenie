import { AlertCircle, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { usePrestoStore, type Cell } from '@/store/usePrestoStore'
import { HoverActionBar } from './HoverActionBar'
import { GeminiStreamText } from '../GeminiStreamText'
import { AnimatedGlow } from '../AnimatedGlow'

interface BaseCellProps {
  cell: Cell
  children: React.ReactNode
  isTransitioning?: boolean
}

export function BaseCell({ cell, children, isTransitioning }: BaseCellProps) {
  const { replaceCell } = usePrestoStore()
  const [isHovering, setIsHovering] = useState(false)
  const [showPrestoPopover, setShowPrestoPopover] = useState(false)

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
        relative flex flex-col card-glass rounded-[4px] w-full h-full border-[#FFFFFF2E] overflow-visible
        ${cell.status === 'ready' ? 'cell-ready' : ''}
        ${cell.status === 'error' ? 'border-danger' : ''}
      `}
      style={{ contain: 'layout' }}
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
            rgba(255, 255, 255, 0.01) 20%,
            rgba(255, 255, 255, 0.03) 50%,
            rgba(255, 255, 255, 0.01) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: skeleton-shimmer 1.2s infinite;
        }

        @keyframes border-pulse {
          0%, 100% {
            box-shadow: 0 0 0 1px #FFFFFF2E, 0 0 8px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 0 1px #FFFFFF4E, 0 0 16px rgba(255, 255, 255, 0.3);
          }
        }

        .border-pulse-glow {
          animation: border-pulse 2s ease-in-out infinite;
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
            <HoverActionBar cell={cell} />
          </div>
        )}

        {/* Header - show skeleton during loading transitions, animate content when ready */}
        <div className="px-4 py-3 flex items-start justify-between gap-2 relative z-20">
          {/* Presto Summary Lamp Icon */}
          {cell.prestosummary && (
            <div
              onMouseEnter={() => setShowPrestoPopover(true)}
              onMouseLeave={() => setShowPrestoPopover(false)}
              className="absolute cursor-pointer group"
              style={{
                top: 'calc(var(--spacing, 0.25rem) * 4)',
                right: 'calc(var(--spacing, 0.25rem) * 4)'
              }}
            >
              <img src="/images/lamp.svg" alt="Presto Summary" className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />

              {showPrestoPopover && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 bg-card border border-purple-500/40 rounded-md p-3 shadow-xl w-72 z-50"
                    style={{
                      right: 'calc(var(--spacing, 0.25rem) * -4)'
                    }}
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      {cell.prestosummary}
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute w-72 -mt-1"
                    style={{
                      top: '100%',
                      right: 'calc(var(--spacing, 0.25rem) * -4)',
                      zIndex: 40
                    }}
                  >
                    <AnimatedGlow
                      glowType="outer"
                      glowSize={6}
                      hoverGlowSize={6}
                      blurAmount={14}
                      hoverBlurAmount={14}
                      baseOpacity={0.6}
                      hoverOpacity={0.6}
                      animationDuration={4}
                      borderRadius={12}
                      borderSize={0}
                      showBorder={false}
                      disableHoverEffect={true}
                      className="w-full"
                    >
                      <div className="h-2" />
                    </AnimatedGlow>
                  </motion.div>
                </>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {/* During loading with thinking status, show skeleton loaders for h3 */}
            {isTransitioning && cell.status === 'thinking' ? (
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/15 to-muted-foreground/10 rounded w-32 animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1" key={`title-${cell.status}`}>
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    <GeminiStreamText text={cell.title} speed={8} showCursor={false} />
                  </h3>
                </div>
                {cell.subtitle && (
                  <div key={`subtitle-${cell.status}`}>
                    <p className="text-md mt-4 mb-8 text-muted-foreground truncate">
                      <GeminiStreamText text={cell.subtitle} speed={8} showCursor={false} />
                    </p>
                  </div>
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
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-foreground bg-accent hover:bg-accent/80 rounded-[4px] transition-colors"
              >
                <RotateCcw size={12} />
                Retry
              </button>
            </div>
          )}

          {/* Actual content - hidden during thinking so shimmer is the only thing visible */}
          {cell.status !== 'error' && (
            <div className={`transition-opacity duration-500 w-full h-full ${cell.status === 'thinking' ? 'opacity-0' : 'opacity-100'}`}>
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
