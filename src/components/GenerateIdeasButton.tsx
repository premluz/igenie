import React from 'react'
import { Sparkles } from 'lucide-react'

export const GenerateIdeasButton = () => {
  // Debug: set to true to see layer boundaries
  const DEBUG = false

  return (
    <div className="inline-flex items-center gap-3 font-sans">
      {/* COMPOSITE LAYER STENCIL BUTTON */}
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 'fit-content',
          height: 'fit-content',
          overflow: 'visible'
        }}
      >

        {/* LAYER 1: AMBIENT BACKING AURA (GPU-accelerated blur glow) */}
        <div className="absolute pointer-events-none"
          style={{
            top: '-8px',
            left: '-8px',
            right: '-8px',
            bottom: '-8px',
            background: DEBUG ? 'red' : 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 25%, #f97316 50%, #3b82f6 75%, #8b5cf6 100%)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-sweep 4s linear infinite',
            filter: DEBUG ? 'none' : 'blur(20px)',
            opacity: DEBUG ? 0.3 : 0.8,
            borderRadius: '12px',
            zIndex: 0
          }}
        />

        {/* LAYER 2: THE OUTLINE MASK (crisp gradient border) */}
        <div className="absolute pointer-events-none"
          style={{
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: DEBUG ? 'blue' : 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 25%, #f97316 50%, #3b82f6 75%, #8b5cf6 100%)',
            backgroundSize: '200% 100%',
            animation: 'rainbow-sweep 4s linear infinite',
            borderRadius: '8px',
            padding: '2px',
            zIndex: 1,
            opacity: DEBUG ? 0.3 : 1
          }}
        >
          {/* Inner dark mask to expose only the border */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '6px',
            backgroundColor: '#0a0a0c'
          }} />
        </div>

        {/* LAYER 3: THE FOREGROUND MASK (solid dark button core) */}
        <button className="relative inline-flex items-center justify-center h-10 px-5
          bg-[#0a0a0c] text-sm font-medium text-white
          transition-all duration-300
          hover:shadow-[0_0_32px_rgba(139,92,246,0.4)]
          group z-10"
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative'
          }}
        >
          {/* Icon + label */}
          <Sparkles
            className="w-4 h-4 mr-2 text-white transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
          <span className="tracking-wide text-[13px]">Generate Ideas</span>
        </button>
      </div>

      {/* Footer label */}
      <span className="text-[12px] text-zinc-600 font-normal tracking-wide">
        Powered by i-Genie
      </span>
    </div>
  )
}
