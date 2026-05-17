import { AnimatedCounter } from './AnimatedCounter'

interface MetricDataPointProps {
  icon: React.ComponentType<any>
  iconSize?: number
  iconColor?: string
  textColor?: string
  value: number
  suffix?: string
  precision?: number
}

export function MetricDataPoint({
  icon: Icon,
  iconSize = 16,
  iconColor,
  textColor,
  value,
  suffix = '',
  precision = 1
}: MetricDataPointProps) {
  const displayTextColor = textColor || iconColor || 'text-muted-foreground'

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      {Icon && (
        <Icon size={iconSize} className={iconColor} />
      )}
      <span className={`text-xs ${displayTextColor} font-mono min-w-6`}>
        <AnimatedCounter value={value} precision={precision} suffix={suffix} />
      </span>
    </div>
  )
}
