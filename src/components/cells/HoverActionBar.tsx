import { Plus, Edit2, MessageSquare, Bell, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'

export function HoverActionBar() {
  const [showMagicInput, setShowMagicInput] = useState(false)
  const [magicInput, setMagicInput] = useState('')

  const handleMagicLayer = () => {
    if (magicInput.trim()) {
      console.log('Magic layer input:', magicInput)
      setMagicInput('')
      setShowMagicInput(false)
    }
  }

  return (
    <TooltipProvider>
      <div className="absolute right-3 -top-0 -translate-y-1/2 flex items-center gap-1 p-0 rounded-sm bg-card backdrop-blur-2xl border border-white/10 shadow-lg z-50 pointer-events-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/20"
              onClick={() => setShowMagicInput(!showMagicInput)}
            >
              <img src="/images/lamp.svg" alt="Magic" className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <p>Add magic layer</p>
          </TooltipContent>
        </Tooltip>

        {showMagicInput && (
          <div className="absolute right-0 top-full mt-2 bg-card border border-white/20 rounded-md p-2 shadow-xl w-48 z-50">
            <input
              type="text"
              placeholder="Describe the insight..."
              value={magicInput}
              onChange={(e) => setMagicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleMagicLayer()}
              className="w-full px-2 py-1 text-xs bg-background/50 border border-white/10 rounded text-foreground placeholder-muted-foreground focus:outline-none focus:border-white/30"
              autoFocus
            />
            <div className="flex gap-1 mt-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-6 text-xs"
                onClick={() => setShowMagicInput(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="flex-1 h-6 text-xs"
                onClick={handleMagicLayer}
              >
                Add
              </Button>
            </div>
          </div>
        )}

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
