import { ArrowRight, Mic, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
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
  glowSize = 12,
  hoverGlowSize = 12,
  blurAmount = 16,
  hoverBlurAmount = 24,
  baseOpacity = 0.6,
  hoverOpacity = 0.8,
  animationDuration = 4
}: QueryInputBoxProps) {
  const [query, setQuery] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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
        onClick={handleBoxClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`input-container card-glass ${padding} cursor-pointer flex flex-col`}
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

  return (
    <div className={`w-full flex flex-col gap-0 input-box-wrapper ${isHovering ? 'is-hovering' : ''}`}>
      {inputContent}
      <div className={`${maxWidth} mx-auto w-full -mt-1`}>
        <AnimatedGlow
          glowType="outer"
          glowSize={glowSize}
          hoverGlowSize={isHovering ? hoverGlowSize : glowSize}
          blurAmount={blurAmount}
          hoverBlurAmount={isHovering ? hoverBlurAmount : blurAmount}
          baseOpacity={isHovering ? hoverOpacity : baseOpacity}
          hoverOpacity={hoverOpacity}
          animationDuration={animationDuration}
          borderRadius={12}
          borderSize={2}
          showBorder={false}
          disableHoverEffect={false}
          className="w-full"
        >
          <div className="h-2" />
        </AnimatedGlow>
      </div>
    </div>
  )
}
