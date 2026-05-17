import { useState, useRef } from 'react'
import { Send, Mic, Plus, Folder } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AmbientGridBackground } from './AmbientGridBackground'
import { NeuralGridBackground } from './NeuralGridBackground'
import { CyclingGeminiText } from './CyclingGeminiText'
import { useNavigate } from 'react-router-dom'
import { usePrestoStore } from '@/store/usePrestoStore'
import { getScenario } from '@/scenarios'

const LANDING_TRIGGERS = [
  { keywords: ['genz', 'gen-z', 'gen z'], scenarioId: 'cucumber-mint' },
  { keywords: ['millennial', 'millennials'], scenarioId: 'neutrogena-natural' }
]

const REPORTS = [
  { id: 1, title: 'Brand Pulse Report Card', count: 11 },
  { id: 2, title: 'Brand Salience And Activation Performance', count: 30 },
  { id: 3, title: 'Product Strength And Brand Attributes', count: 4 },
  { id: 4, title: 'Ecommerce Share Of Influence', count: 15 },
  { id: 5, title: 'Social Channels Share Of Influence', count: 9 },
  { id: 6, title: 'Consumer Voice', count: 8 },
  { id: 7, title: 'Summarise The Category Dynamics And...', count: 22 }
]

const QUICK_ACTIONS = [
  {
    id: 'snapshot',
    icon: '📷',
    title: 'Snapshot brands',
    description: 'Get a snapshot of my brands pulse score'
  },
  {
    id: 'top-brands',
    icon: '⭐',
    title: 'Top brands',
    description: 'Which are the top 5 brands by Brand Pulse score'
  },
  {
    id: 'breakthrough',
    icon: '🎯',
    title: 'Find breakthrough',
    description: 'Find breakthrough brands in the category'
  },
  {
    id: 'buzz',
    icon: '🔥',
    title: 'Snapshot Buzz',
    description: 'Get a snapshot of Buzz score for my brands'
  }
]

export function LandingScreen() {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { pushLog, setTransitioning, revealCellsGradually } = usePrestoStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const lowerQuery = query.toLowerCase().trim()

    // Check for scenario triggers
    for (const trigger of LANDING_TRIGGERS) {
      for (const keyword of trigger.keywords) {
        if (lowerQuery.includes(keyword)) {
          // Add user message to logs
          pushLog({ text: query, type: 'query' })

          // Get the scenario
          const scenario = getScenario(trigger.scenarioId)

          if (scenario) {
            setQuery('')

            // Show loading state
            setTransitioning(true)

            // Trigger loading sequence
            const loadingMessages = (scenario as any)?.loadingMessages
            const loadingDelay = (scenario as any)?.loadingDelay
            if (loadingMessages && loadingDelay) {
              const messages = loadingMessages
              const categories = Object.keys(messages).filter(k => k !== 'summary')
              const timePerCategory = loadingDelay / categories.length

              let currentTime = 0
              categories.forEach((categoryKey) => {
                const category = messages[categoryKey]

                // Show header
                setTimeout(() => {
                  pushLog({ text: category.header, type: 'header' })
                }, currentTime)

                // Show texts if available
                if (category.texts && Array.isArray(category.texts)) {
                  const textDelay = timePerCategory / (category.texts.length + 1)
                  category.texts.forEach((text: string, textIndex: number) => {
                    setTimeout(() => {
                      pushLog({ text, type: 'system' })
                    }, currentTime + textDelay * (textIndex + 1))
                  })
                }

                // Show header_done
                setTimeout(() => {
                  pushLog({ text: category.header_done, type: 'header-done' })
                }, currentTime + timePerCategory - 100)

                currentTime += timePerCategory
              })

              // Show summary at the end
              setTimeout(() => {
                pushLog({ text: messages.summary, type: 'header-done' })
              }, loadingDelay - 100)

              // Start revealing cells at 50% of loading delay
              setTimeout(() => {
                revealCellsGradually(loadingDelay / 2)
              }, loadingDelay / 2)

              // Hide loading state and ensure all cells are revealed
              setTimeout(() => {
                const { revealCells } = usePrestoStore.getState()
                revealCells() // Ensure all remaining cells transition to 'ready'
                setTransitioning(false)
              }, loadingDelay)
            }

            // Navigate to scenario (this triggers CanvasGrid to load data)
            navigate(`/insights/${trigger.scenarioId}`)
          }
          return
        }
      }
    }

    // If no trigger matched, just log it
    console.log('Query:', query)
    setQuery('')
  }

  const handleBoxClick = () => {
    inputRef.current?.focus()
  }

  const handleQuickAction = (actionId: string) => {
    // TODO: Handle quick action click
    console.log('Quick action:', actionId)
  }

  return (
    <div className="flex-1 flex overflow-hidden relative">
      {/* Left Container - Reports List */}
      <div className="w-80 flex-shrink-0 border-r border-border overflow-y-auto backdrop-blur-md bg-background/20">
        <ul className="p-3 space-y-0 list-none">
          {REPORTS.map((report) => (
            <li
              key={report.id}
              className="list-text-item card-padding-md flex items-center gap-3 text-left group cursor-pointer rounded-sm"
            >
              <Folder size={18} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              <p className="text-sm font-medium text-foreground truncate flex-1 min-w-0">
                {report.title}
              </p>
              <Badge variant="outline" className="flex-shrink-0 text-xs ">
                {report.count}
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Container - Main Content with Genie Background */}
      <div
        className="flex-1 flex flex-col overflow-auto relative"
        style={{
          backgroundImage: 'url(/images/genie-bg.png)',
          backgroundSize: 'auto 120%',
          backgroundPosition: '75%  20% ',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <AmbientGridBackground
          showNodeLines={false}
          enableMagneticCursor={false}
          nodeLineColor="rgba(255, 255, 255, 1)"
          nodeLineOpacity={0.9}
          nodeLineDistance={50}
          nodeConnectionCount={1}
          activeNodeCount={920}
          magneticStrength={12}
          magneticRadius={180}
        />

        {/* Top section with greeting and subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative z-10">

        <h1 className="text-4xl  h-16  font-normal text-foreground mb-3">
          <CyclingGeminiText
            texts={['Insight Intelligence. Infinite wishes.', 'Good morning Trevor!']}
            speed={12}
            delayBetweenTexts={3000}
            showCursor={false}
          />
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 min-h-14">
          <CyclingGeminiText
            texts={[
              'Ask questions, explore trends, and uncover insights across your data.',
              'What would you like to do today?'
            ]}
            speed={1}
            delayBetweenTexts={3600}
            showCursor={false}
          />
        </p>

        {/* Quick action cards */}
        <div className="grid grid-cols-4 gap-3 mb-0 max-w-4xl w-full">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="card-glass card-padding-md text-left group cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl">{action.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors text-lg">
                  {action.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </button>
          ))}
        </div>
        {/* Bottom input section */}
        <div className="px-8 w-full py-4 relative z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div
              onClick={handleBoxClick}
              className="input-container card-glass card-padding-lg cursor-pointer flex flex-col"
            >
              {/* Input field with native placeholder */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about a brand, trend, or category..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-lg flex-1"
              />

              {/* Icons row */}
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={() => {}}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <Plus size={18} />
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  >
                    <Mic size={18} />
                  </button>
                  <button
                    type="submit"
                    className="text-muted-foreground hover:text-accent transition-colors p-2"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
        </form>
      </div>
        </div>
      </div>
    </div>
  )
}
