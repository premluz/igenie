import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = ({ children, delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>
    {children}
  </TooltipPrimitive.Root>
)

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-sm px-3 py-1.5 text-sm text-foreground shadow-md bg-black/70 backdrop-blur-md border-0 data-[state=closed]:invisible",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
