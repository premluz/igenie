import { Plus, Edit2, MessageSquare, Bell, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function HoverActionBar() {
  return (
    <TooltipProvider>
      <div className="absolute right-3 -top-0 -translate-y-1/2 flex items-center gap-1 p-0 rounded-sm bg-card backdrop-blur-2xl border border-white/10 shadow-lg z-50 pointer-events-auto">
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
