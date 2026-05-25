import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnomalyHotspotProps {
  x: number
  y: number
  type: 'peak' | 'valley' | 'spike'
  color: 'red' | 'green' | 'blue'
  label: string
  description: string
}

export function AnomalyHotspot({ x, y, type, color, label, description }: AnomalyHotspotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const hotspotRef = useRef<HTMLDivElement>(null)

  const colorStyles = {
    red: { borderColor: 'rgba(248, 113, 113, 0.3)', boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.2)' },
    green: { borderColor: 'rgba(74, 222, 128, 0.3)', boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.2)' },
    blue: { borderColor: 'rgba(96, 165, 250, 0.3)', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.2)' }
  }

  const popoverBg = {
    red: 'border-red-400/30 shadow-lg shadow-red-500/20',
    green: 'border-green-400/30 shadow-lg shadow-green-500/20',
    blue: 'border-blue-400/30 shadow-lg shadow-blue-500/20'
  }

  const textColor = {
    red: 'text-red-400',
    green: 'text-green-400',
    blue: 'text-blue-400'
  }

  const glowBg = {
    red: 'bg-red-500/10',
    green: 'bg-green-500/10',
    blue: 'bg-blue-500/10'
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (hotspotRef.current && !hotspotRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={hotspotRef} className="relative" style={{ position: 'absolute', left: `${x}px`, top: `${y}px` }}>
      {/* Hotspot Circle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 rounded-full border-4 transition-all hover:scale-110 cursor-pointer"
        style={colorStyles[color]}
      />

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-20"
          >
            <div className="relative">
              {/* Popover Content */}
              <div className={`bg-background/95 rounded-sm p-3 w-48 backdrop-blur-sm ${popoverBg[color]}`}>
                <p className={`text-sm font-medium ${textColor[color]} mb-1`}>{label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>

              {/* Glow Effect Under Popover */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 -z-10 rounded-full blur-lg ${glowBg[color]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
