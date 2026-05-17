import { Radio, Flame } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePrestoStore } from '@/store/usePrestoStore'
import { SparklineChart } from './SparklineChart'
import { MetricDataPoint } from './MetricDataPoint'
import { AnimatedProgressBar } from './AnimatedProgressBar'

interface InsightCardProps {
  data: {
    scenarioId: string
    title: string
    description: string
    velocityScore?: number
    sentimentScore?: number
    sparklineData?: number[]
  }
  title: string
  subtitle?: string
}

export function InsightCard({ data, title }: InsightCardProps) {
  const navigate = useNavigate()
  const { loadScenarioDetail } = usePrestoStore()

  const handleClick = () => {
    loadScenarioDetail(data.scenarioId)
    navigate(`/insights/${data.scenarioId}`)
  }

  return (
    <InsightCardContent data={data} title={title} handleClick={handleClick} />
  )
}

function InsightCardContent({ data, title, handleClick }: any) {

  const velocityScore = data.velocityScore || 0
  const sentimentScore = data.sentimentScore || 0
  const sparklineData = data.sparklineData || [2, 3, 2, 4, 3, 5, 9]

  // Determine status color based on sentiment
  const statusColor = sentimentScore > 80 ? '#10b981' : sentimentScore > 60 ? '#3b82f6' : '#ef4444'

  return (
    <button
      onClick={handleClick}
      className="list-row-item w-full text-left group flex items-stretch gap-3"
    >

      {/* Left Column - Sparkline */}
      <div className="flex flex-col items-center justify-center py-1 px-2 w-28 flex-shrink-0 sparkline-animate" style={{ aspectRatio: '2.4' }}>
        <SparklineChart data={sparklineData} color={statusColor} width="100%" height="100%" />
      </div>

      {/* Right Column - Content & Metrics */}
      <div className="flex-1 px-4 py-3 min-w-0 flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-md font-normal text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors mb-2">
            {data.description}
          </p>
        </div>

        {/* Metrics - Velocity and Sentiment */}
        <div className="flex max-w-xs gap-6 items-center">
          {/* Signal Strength (Velocity) */}
          <div className="flex items-center gap-2 flex-1">
            <MetricDataPoint
              icon={Radio}
              iconSize={16}
              iconColor="text-blue-500"
              textColor="text-blue-500"
              value={velocityScore}
              precision={1}
            />
            <div className="flex-1">
              <AnimatedProgressBar
                value={Math.min((velocityScore / 10) * 100, 100)}
                max={100}
                indicatorColor="blue"
                size="xthin"
              />
            </div>
          </div>

          {/* Signal Trust (Sentiment) */}
          <div className="flex items-center gap-2 flex-1">
            <MetricDataPoint
              icon={Flame}
              iconSize={16}
              iconColor={sentimentScore > 80 ? 'text-emerald-500' : 'text-orange-500'}
              textColor={sentimentScore > 80 ? 'text-emerald-500' : 'text-orange-500'}
              value={sentimentScore}
              suffix="%"
              precision={0}
            />
            <div className="flex-1">
              <AnimatedProgressBar
                value={Math.min(sentimentScore, 100)}
                max={100}
                indicatorColor={sentimentScore > 80 ? 'emerald' : 'orange'}
                size="xthin"
              />
            </div>
          </div>
        </div>
      </div>

    </button>
  )
}
