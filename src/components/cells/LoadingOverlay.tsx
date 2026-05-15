interface LoadingOverlayProps {
  isLoading: boolean
  glowColor?: 'accent' | 'blue' | 'emerald'
}

export function LoadingOverlay({ isLoading, glowColor = 'accent' }: LoadingOverlayProps) {
  if (!isLoading) return null

  const colorMap = {
    accent: '#00d9ff',
    blue: '#3b82f6',
    emerald: '#10b981'
  }

  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden z-20 pointer-events-none">
      <style>{`
        @keyframes rotate-glow {
          100% {
            transform: translate(-50%, -50%) rotate(1turn);
          }
        }

        .loading-border::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 99999px;
          height: 99999px;
          background-repeat: no-repeat;
          background-position: 0 0;
          background-image: conic-gradient(rgba(0,0,0,0), ${colorMap[glowColor]}, rgba(0,0,0,0) 25%);
          transform: translate(-50%, -50%) rotate(0deg);
          animation: rotate-glow 4s linear infinite;
          z-index: -1;
        }
      `}</style>

      <div className="loading-border absolute inset-0 rounded-lg" />

      {/* Inner background */}
      <div
        className="absolute inset-1 rounded-md"
        style={{ backgroundColor: 'rgba(41, 42, 46, 0.95)' }}
      />

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-accent animate-spin" />
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </div>
    </div>
  )
}
