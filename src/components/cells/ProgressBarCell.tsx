import { SparklineChart } from './SparklineChart'
import { AnimatedCounter } from './AnimatedCounter'
import { AnimatedProgressBar } from './AnimatedProgressBar'
import { Radio, Flame, TrendingUp } from 'lucide-react'

interface ProgressBarCellProps {
  title: string
  subtitle: string
  descriptionTop?: string
  descriptionBottom?: string
  metric: {
    type: 'trend' | 'strength' | 'trust'
    value: number
    max?: number
    sparklineData?: number[]
    color?: string
  }
  status?: 'ready' | 'thinking' | 'error'
}

export function ProgressBarCell({ metric, descriptionTop, descriptionBottom }: ProgressBarCellProps) {
  return (
    <div className="flex flex-col h-full">
      {descriptionTop && (
        <p className="text-xs text-muted-foreground mb-2">{descriptionTop}</p>
      )}
      <div className="flex-1">
        {metric.type === 'trend' ? (
          <TrendCard metric={metric} />
        ) : (
          <StrengthTrustCard metric={metric} />
        )}
      </div>
      {descriptionBottom && (
        <p className="text-xs text-muted-foreground mt-2">{descriptionBottom}</p>
      )}
    </div>
  )
}

function TrendCard({ metric }: { metric: any }) {
  const sparklineData = metric.sparklineData || [2, 3, 2, 4, 3, 5, 9]
  const color = metric.color || '#10b981'
  const lastValue = sparklineData[sparklineData.length - 1]
  const prevValue = sparklineData[sparklineData.length - 2] || sparklineData[0]
  const change = ((lastValue - prevValue) / prevValue) * 100

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Data point - left aligned */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-2">
          <TrendingUp size={20} className={change > 0 ? 'text-emerald-500' : 'text-orange-500'} />
          <div>
            <div className="text-3xl font-bold text-foreground">
              {change > 0 ? '+' : ''}<AnimatedCounter value={Math.abs(change)} precision={1} suffix="%" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Weekly change</div>
          </div>
        </div>
      </div>

      {/* Sparkline - right */}
      <div className="flex items-center justify-center w-full max-h-16">
        <SparklineChart data={sparklineData} color={color} width="100%" height="100%" />
      </div>
    </div>
  )
}

function StrengthTrustCard({ metric }: { metric: any }) {
  const max = metric.max || 10
  const Icon = metric.type === 'strength' ? Radio : Flame
  const iconColor = metric.type === 'strength' ? 'text-blue-500' : 'text-emerald-500'

  return (
    <div className="flex flex-col justify-center h-full space-y-4">
      {/* Data point with icon and animated counter */}
      <div className="flex items-center gap-3">
        <Icon size={20} className={iconColor} />
        <div className="text-3xl font-bold text-foreground">
          <AnimatedCounter value={metric.value} precision={1} suffix={metric.type === 'trust' ? '%' : ''} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <AnimatedProgressBar
          value={metric.value}
          max={max}
          indicatorColor={metric.type === 'strength' ? 'blue' : 'emerald'}
          size="md"
        />
      </div>
    </div>
  )
}
