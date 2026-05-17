import { useEffect, useState } from 'react'

interface TimelineStage {
  name: string
  status: 'pending' | 'active' | 'complete'
  duration: number
}

interface LoadingTimelineProps {
  stages: string[]
  totalDuration: number
  isActive: boolean
}

export function LoadingTimeline({ stages, totalDuration, isActive }: LoadingTimelineProps) {
  const [timelineStages, setTimelineStages] = useState<TimelineStage[]>(
    stages.map((name, idx) => ({
      name,
      status: idx === 0 ? 'active' : 'pending',
      duration: totalDuration / stages.length
    }))
  )

  useEffect(() => {
    if (!isActive) return

    const durationPerStage = totalDuration / stages.length
    let currentStageIndex = 0

    const stageInterval = setInterval(() => {
      if (currentStageIndex < stages.length) {
        setTimelineStages(prev =>
          prev.map((stage, idx) => ({
            ...stage,
            status:
              idx < currentStageIndex
                ? 'complete'
                : idx === currentStageIndex
                ? 'active'
                : 'pending'
          }))
        )
        currentStageIndex++
      } else {
        clearInterval(stageInterval)
      }
    }, durationPerStage)

    return () => clearInterval(stageInterval)
  }, [isActive, stages, totalDuration])

  if (!isActive) return null

  return (
    <div className="mb-4 px-4">
      <div className="flex items-center gap-2">
        {timelineStages.map((stage, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {/* Circle */}
            <div
              className={`w-3 h-3 rounded-full transition-all ${
                stage.status === 'complete'
                  ? 'bg-accent'
                  : stage.status === 'active'
                  ? 'bg-accent ring-2 ring-accent ring-opacity-50 animate-pulse'
                  : 'bg-muted-foreground/30'
              }`}
            />

            {/* Line to next stage */}
            {idx < timelineStages.length - 1 && (
              <div
                className={`w-6 h-0.5 transition-all ${
                  stage.status === 'complete'
                    ? 'bg-accent'
                    : 'bg-muted-foreground/20'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Stage labels */}
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {timelineStages.map((stage, idx) => (
          <span
            key={idx}
            className={`transition-colors ${
              stage.status !== 'pending' ? 'text-accent' : ''
            }`}
          >
            {stage.name}
          </span>
        ))}
      </div>
    </div>
  )
}
