import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  indicatorColor?: 'blue' | 'emerald' | 'orange'
  size?: 'xthin' | 'md'
}

const CustomProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorColor = 'blue', size = 'md', ...props }, ref) => {
  const colorMap = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500'
  }

  const sizeConfig = {
    xthin: 'h-[3px]',
    md: 'h-1'
  }

  const rootHeight = sizeConfig[size]

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(`relative w-full overflow-hidden rounded-full ${rootHeight}`, className)}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full rounded-full", colorMap[indicatorColor])}
        style={{
          width: `${value || 0}%`,
          transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      />
    </ProgressPrimitive.Root>
  )
})
CustomProgress.displayName = "CustomProgress"

export { CustomProgress }
