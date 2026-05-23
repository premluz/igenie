import { Plus, Edit2, MessageSquare, Bell, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'
import type { Cell } from '@/store/usePrestoStore'
import { AnimatedGlow } from '../AnimatedGlow'

interface HoverActionBarProps {
  cell: Cell
}

export function HoverActionBar({ cell }: HoverActionBarProps) {
  const [showMagicTooltip, setShowMagicTooltip] = useState(false)

  return (
    <TooltipProvider>
      <div className="absolute right-3 -top-0 -translate-y-1/2 flex items-center gap-1 p-0 rounded-sm bg-card backdrop-blur-2xl border border-white/10 shadow-lg z-50 pointer-events-auto">
        <div
          onMouseEnter={() => setShowMagicTooltip(true)}
          onMouseLeave={() => setShowMagicTooltip(false)}
          className="relative"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20"
              >
                <img src="/images/lamp.svg" alt="Magic" className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              <p>Magic layer</p>
            </TooltipContent>
          </Tooltip>

          {showMagicTooltip && cell.magicLayer && (
            <div className="absolute right-0 top-full mt-2 bg-card border border-white/20 rounded-md p-3 shadow-xl w-64 z-50">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {cell.magicLayer}
              </p>
              <AnimatedGlow
                disableHoverEffect={true}
                glowSize={4}
                baseOpacity={0.6}
                blurAmount={16}
                borderRadius={4}
                className="w-full"
              >
                <div className="h-1 bg-background/30 rounded-full" />
              </AnimatedGlow>
            </div>
          )}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20">
              <Plus size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Add insight</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20">
              <Edit2 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20">
              <MessageSquare size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Comment</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20">
              <Bell size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Notify</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/20">
              <MoreVertical size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
