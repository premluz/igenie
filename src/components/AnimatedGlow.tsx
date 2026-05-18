import React, { type ReactNode } from 'react'

interface AnimatedGlowProps {
  children: ReactNode
  /** Type of glow: 'outer' expands outward, 'inner' glows from inside */
  glowType?: 'outer' | 'inner'
  /** Gradient colors as CSS gradient string */
  colors?: string
  /** Base blur amount in pixels */
  blurAmount?: number
  /** Blur amount on hover */
  hoverBlurAmount?: number
  /** Animation duration in seconds */
  animationDuration?: number
  /** Base opacity (0-1) */
  baseOpacity?: number
  /** Hover opacity (0-1) */
  hoverOpacity?: number
  /** Base glow size offset in pixels */
  glowSize?: number
  /** Hover glow size offset in pixels */
  hoverGlowSize?: number
  /** Whether to show the crisp border */
  showBorder?: boolean
  /** Border thickness in pixels */
  borderSize?: number
  /** Rounded corners in pixels */
  borderRadius?: number
  /** Custom className for the wrapper */
  className?: string
  /** Disable glow on hover (static glow) */
  disableHoverEffect?: boolean
}

const DEFAULT_COLORS = 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 25%, #f97316 50%, #3b82f6 75%, #8b5cf6 100%)'

export const AnimatedGlow = ({
  children,
  glowType = 'outer',
  colors = DEFAULT_COLORS,
  blurAmount = 20,
  hoverBlurAmount = 28,
  animationDuration = 4,
  baseOpacity = 0.5,
  hoverOpacity = 0.9,
  glowSize = 8,
  hoverGlowSize = 16,
  showBorder = false,
  borderSize = 3,
  borderRadius = 8,
  className = '',
  disableHoverEffect = false
}: AnimatedGlowProps) => {
  const glowOffset = glowType === 'outer' ? `-${glowSize}px` : `${glowSize}px`
  const hoverOffset = glowType === 'outer' ? `-${hoverGlowSize}px` : `${hoverGlowSize}px`

  const glowId = `glow-${Math.random().toString(36).slice(2)}`

  return (
    <div
      className={`animated-glow-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'visible'
      }}
      data-glow-id={glowId}
    >
      <style>{`
        [data-glow-id="${glowId}"] .animated-glow-layer {
          position: absolute;
          pointer-events: none;
          background: ${colors};
          background-size: 200% 100%;
          animation: rainbow-sweep ${animationDuration}s linear infinite;
          border-radius: ${borderRadius + 4}px;
          z-index: 0;
          transition: all 0.3s ease;
        }

        [data-glow-id="${glowId}"] .animated-glow-outer {
          top: ${glowOffset};
          left: ${glowOffset};
          right: ${glowOffset};
          bottom: ${glowOffset};
          filter: blur(${blurAmount}px);
          opacity: ${baseOpacity};
        }

        [data-glow-id="${glowId}"] .animated-glow-border {
          top: -${borderSize}px;
          left: -${borderSize}px;
          right: -${borderSize}px;
          bottom: -${borderSize}px;
          padding: ${borderSize}px;
          z-index: 1;
        }

        [data-glow-id="${glowId}"] .animated-glow-border::after {
          content: '';
          position: absolute;
          inset: ${borderSize}px;
          border-radius: ${borderRadius - 1}px;
          background-color: inherit;
        }

        ${!disableHoverEffect ? `
          [data-glow-id="${glowId}"]:hover .animated-glow-outer {
            top: ${hoverOffset};
            left: ${hoverOffset};
            right: ${hoverOffset};
            bottom: ${hoverOffset};
            opacity: ${hoverOpacity};
            filter: blur(${hoverBlurAmount}px);
          }
        ` : ''}

        [data-glow-id="${glowId}"] .animated-glow-core {
          position: relative;
          z-index: 2;
        }
      `}</style>

      {/* Outer glow layer */}
      <div className="animated-glow-layer animated-glow-outer" />

      {/* Border layer */}
      {showBorder && (
        <div className="animated-glow-layer animated-glow-border" />
      )}

      {/* Content */}
      <div className="animated-glow-core">
        {children}
      </div>
    </div>
  )
}
