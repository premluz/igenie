import { Radio, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { SparklineChart } from './SparklineChart'
import { MetricDataPoint } from './MetricDataPoint'
import { AnimatedProgressBar } from './AnimatedProgressBar'

interface InsightGridCardProps {
  data: {
    scenarioId: string
    title: string
    description: string
    velocityScore?: number
    sentimentScore?: number
    sparklineData?: number[]
  }
  title: string
}

export function InsightGridCard({ data, title }: InsightGridCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/insights/${data.scenarioId}`)
  }

  const velocityScore = data.velocityScore || 0
  const sentimentScore = data.sentimentScore || 0
  const sparklineData = data.sparklineData || [2, 3, 2, 4, 3, 5, 9]

  // Determine status color based on sentiment
  const statusColor = sentimentScore > 80 ? '#10b981' : sentimentScore > 60 ? '#3b82f6' : '#ef4444'

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col card-glass rounded-[4px] overflow-hidden w-full h-full border-[#FFFFFF2E] hover:border-accent/30 transition-all cursor-pointer p-4"
      style={{ borderWidth: '1px', minHeight: '280px' }}
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-1 text-left">
          {title}
        </h3>
        <p className="text-md text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors text-left">
          {data.description}
        </p>
      </div>

      {/* Sparkline */}
      <div className="flex-1 flex items-center justify-center mb-3 min-h-6 px-2" style={{ aspectRatio: '3' }}>
        <SparklineChart data={sparklineData} color={statusColor} width="100%" height="100%" />
      </div>

      {/* Metrics - Strength and Trust */}
      <div className="space-y-2 pt-3 border-t border-border/30">
        {/* Strength (Velocity) */}
        <div className="flex items-center gap-2">
          <span className="text-lg">💪</span>
          <div className="flex-1">
            <AnimatedProgressBar
              value={Math.min((velocityScore / 10) * 100, 100)}
              max={100}
              indicatorColor="blue"
              size="xthin"
            />
          </div>
          <MetricDataPoint
            icon={Radio}
            iconSize={14}
            iconColor="text-blue-500"
            textColor="text-blue-500"
            value={velocityScore}
            precision={1}
          />
        </div>

        {/* Trust (Sentiment) */}
        <div className="flex items-center gap-2">
          <span className="text-lg">💯</span>
          <div className="flex-1">
            <AnimatedProgressBar
              value={Math.min(sentimentScore, 100)}
              max={100}
              indicatorColor={sentimentScore > 80 ? 'emerald' : 'orange'}
              size="xthin"
            />
          </div>
          <MetricDataPoint
            icon={Flame}
            iconSize={14}
            iconColor={sentimentScore > 80 ? 'text-emerald-500' : 'text-orange-500'}
            textColor={sentimentScore > 80 ? 'text-emerald-500' : 'text-orange-500'}
            value={sentimentScore}
            suffix="%"
            precision={0}
          />
        </div>
      </div>
    </button>
  )
}
