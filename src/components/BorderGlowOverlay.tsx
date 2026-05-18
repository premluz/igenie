export function BorderGlowOverlay({ isActive }: { isActive: boolean }) {
  return (
    <>
      <style>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: inset 0 0 40px rgba(124, 128, 239, 0.3), inset 0 0 80px rgba(139, 92, 246, 0.2), inset 0 0 120px rgba(236, 72, 153, 0.1);
          }
          50% {
            box-shadow: inset 0 0 60px rgba(124, 128, 239, 0.5), inset 0 0 100px rgba(139, 92, 246, 0.4), inset 0 0 150px rgba(236, 72, 153, 0.2);
          }
        }

        .glow-pulse-active {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>
      <div
        className={`
          fixed inset-0 pointer-events-none z-40 transition-opacity duration-700 ease-in-out
          ${isActive ? 'opacity-100 glow-pulse-active' : 'opacity-0'}
        `}
        style={{
          boxShadow: `
            inset 0 0 40px rgba(124, 128, 239, 0.3),
            inset 0 0 80px rgba(139, 92, 246, 0.2),
            inset 0 0 120px rgba(236, 72, 153, 0.1)
          `
        }}
      />
    </>
  )
}
