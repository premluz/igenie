import type { ReactNode } from 'react'

interface AnimatedBorderProps {
  children?: ReactNode
  className?: string
  glowColor?: 'accent' | 'blue' | 'emerald'
}

export function AnimatedBorder({ children, className = '', glowColor = 'accent' }: AnimatedBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <style>{`
        @keyframes rotate-glow {
          100% {
            transform: translate(-50%, -50%) rotate(1turn);
          }
        }

        .animated-border-glow::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 99999px;
          height: 99999px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(rgba(0,0,0,0), var(--glow-color), rgba(0,0,0,0) 25%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: rotate-glow 4s linear infinite;
          z-index: -2;
        }

        .animated-border-inner::after {
          content: '';
          position: absolute;
          inset: 5px;
          background-color: var(--bg-color);
          border-radius: 7px;
          z-index: -1;
        }
      `}</style>

      <div
        className="animated-border-glow absolute inset-0 overflow-hidden rounded-lg z-0"
        style={{
          '--glow-color': glowColor === 'accent' ? '#00d9ff' : glowColor === 'blue' ? '#3b82f6' : '#10b981'
        } as React.CSSProperties}
      />

      <div
        className="animated-border-inner absolute inset-0 rounded-lg z-0"
        style={{
          '--bg-color': 'rgb(41, 42, 46)'
        } as React.CSSProperties}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  )
}
