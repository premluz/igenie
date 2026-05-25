import { ArrowRight, Mic, Plus } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import { AnimatedGlow } from './AnimatedGlow'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface QueryInputBoxProps {
  onSubmit: (query: string) => void
  placeholder?: string
  showGlow?: boolean
  maxWidth?: string
  compact?: boolean
  glowSize?: number
  hoverGlowSize?: number
  blurAmount?: number
  hoverBlurAmount?: number
  baseOpacity?: number
  hoverOpacity?: number
  animationDuration?: number
}

export function QueryInputBox({
  onSubmit,
  placeholder = 'Ask about a brand, trend, or category...',
  showGlow = true,
  maxWidth = 'max-w-4xl',
  compact = false,
  glowSize = 4,
  hoverGlowSize = 24,
  blurAmount = 16,
  hoverBlurAmount = 24,
  baseOpacity = 0.3,
  hoverOpacity = 0.8,
  animationDuration = 4
}: QueryInputBoxProps) {
  const [query, setQuery] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [proximityIntensity, setProximityIntensity] = useState(0) // 0-1 scale
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse proximity for glow activation - scales with distance
  useEffect(() => {
    const maxProximityDistance = 300 // Max distance to start affecting glow

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      try {
        const rect = containerRef.current.getBoundingClientRect()

        // Clamp cursor to the nearest point on the box edge
        const nearestX = Math.max(rect.left, Math.min(e.clientX, rect.right))
        const nearestY = Math.max(rect.top, Math.min(e.clientY, rect.bottom))

        // Calculate distance from cursor to nearest edge
        const distance = Math.hypot(e.clientX - nearestX, e.clientY - nearestY)

        // Scale intensity from 0 (far) to 1 (at box)
        // Distance > maxProximityDistance = 0 intensity
        // Distance = 0 (at box) = 1 intensity
        const intensity = Math.max(0, 1 - distance / maxProximityDistance)

        setProximityIntensity(intensity)
      } catch {
        // Silently handle any errors during calculation
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    onSubmit(query)
    setQuery('')
  }

  const handleBoxClick = () => {
    inputRef.current?.focus()
  }

  const inputSize = compact ? 'text-sm' : 'text-lg'
  const padding = compact ? 'card-padding-md' : 'card-padding-lg'
  const iconSize = compact ? 16 : 18

  const inputContent = (
    <form onSubmit={handleSubmit} className={`${maxWidth} mx-auto w-full`}>
      <div
        ref={containerRef}
        onClick={handleBoxClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`input-container card-glass ${padding} cursor-pointer flex flex-col transition-all duration-200 ${
          isHovering ? 'border-accent/40' : 'border-border/20'
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none ${inputSize} flex-1`}
        />

        <div className="flex items-center justify-between mt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => {}}
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
              >
                <Plus size={iconSize} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Add</TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <Mic size={iconSize} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Voice mode</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="submit"
                  className="text-muted-foreground hover:text-accent transition-colors p-2"
                >
                  <ArrowRight size={iconSize} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">Send</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </form>
  )

  if (!showGlow) {
    return <div className="w-full">{inputContent}</div>
  }

  // Interpolate glow properties based on proximity intensity (0-1)
  const scaledGlowSize = glowSize + (hoverGlowSize - glowSize) * proximityIntensity
  const scaledBlurAmount = blurAmount + (hoverBlurAmount - blurAmount) * proximityIntensity
  const scaledOpacity = baseOpacity + (hoverOpacity - baseOpacity) * proximityIntensity

  return (
    <div className={`w-full flex flex-col gap-0 input-box-wrapper ${proximityIntensity > 0.1 ? 'is-nearby' : ''}`}>
      {inputContent}
      <div className={`${maxWidth} mx-auto w-full -mt-1`}>
        <AnimatedGlow
          glowType="outer"
          glowSize={scaledGlowSize}
          hoverGlowSize={scaledGlowSize}
          blurAmount={scaledBlurAmount}
          hoverBlurAmount={scaledBlurAmount}
          baseOpacity={scaledOpacity}
          hoverOpacity={scaledOpacity}
          animationDuration={animationDuration}
          borderRadius={12}
          borderSize={2}
          showBorder={false}
          disableHoverEffect={true}
          className="w-full"
        >
          <div className="h-2" />
        </AnimatedGlow>
      </div>
    </div>
  )
}
