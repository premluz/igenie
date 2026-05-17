import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { usePrestoStore } from '@/store/usePrestoStore'
import { scenarioMap } from '@/scenarios'

export function ScenarioListing() {
  const navigate = useNavigate()
  const { loadScenario } = usePrestoStore()

  const handleSelectScenario = (scenarioId: string) => {
    loadScenario(scenarioId)
    navigate(`/insights/${scenarioId}`)
  }

  return (
    <div className="flex-1 flex flex-col bg-background overflow-auto">
      <div className="flex-1 flex flex-col p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Insights
          </h1>
          <p className="text-muted-foreground">
            Select a brand insight to explore trends, signals, and recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
          {Object.entries(scenarioMap).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => handleSelectScenario(key)}
              className="group p-6 rounded-lg border border-border bg-card hover:bg-card hover:border-accent/50 transition-all duration-200 text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-1">
                    {scenario.brand}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    {scenario.category}
                  </p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1" />
              </div>

              <p className="text-sm text-foreground mb-4">
                {scenario.title}
              </p>

              <div className="flex gap-4 pt-4 border-t border-border/50">
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {scenario.velocityScore.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Velocity
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {scenario.sentimentScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Sentiment
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
