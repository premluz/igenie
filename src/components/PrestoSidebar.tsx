import { Send } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { usePrestoStore } from '@/store/usePrestoStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import genieImage from '@/assets/genie.png'
import { CyclingGeminiText } from './CyclingGeminiText'
import { useScenarioDetection } from '@/hooks/useScenarioDetection'
import { LoadingTimeline } from './LoadingTimeline'
import { GeminiStreamText } from './GeminiStreamText'

export function PrestoSidebar() {
  const { logs, agentStatus, runReasoning, pushLog, isTransitioning } = usePrestoStore()
  const [input, setInput] = useState('')
  const [loadingStages, setLoadingStages] = useState<string[]>([])
  const [loadingDuration, setLoadingDuration] = useState(0)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const { detectScenarioTransition, transitionToScenario } = useScenarioDetection()

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || agentStatus === 'thinking') return

    // Check if input triggers a scenario transition
    const transition = detectScenarioTransition(input)

    if (transition.matched && transition.nextScenarioId && transition.delay && transition.loadingMessages) {
      setInput('')

      // Add user message
      pushLog({ text: input, type: 'query' })

      // Start scenario transition with progressive loading messages
      transitionToScenario(transition.nextScenarioId, transition.delay)

      // Show progressive loading messages
      const messages = transition.loadingMessages
      const categories = Object.keys(messages).filter(k => k !== 'summary')
      const timePerCategory = transition.delay / categories.length

      // Set timeline stages
      setLoadingStages(categories)
      setLoadingDuration(transition.delay)

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
        pushLog({ text: messages.summary, type: 'success' })
      }, transition.delay - 100)

      return
    }

    await runReasoning(input)
    setInput('')
  }

  return (
    <aside className="w-80 border-l border-border flex flex-col bg-background">
      {/* Header */}
      {/*<div className="h-14 border-b border-border flex items-center px-6 bg-card/20">
        <span className="text-xs font-semibold text-foreground">Ask Presto</span>
      </div>*/}

      {/* Log Terminal */}
      <div className="flex-1 overflow-auto p-4 bg-black/20 font-mono text-xs border-b border-border relative">
        {/* Genie Background Image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src={genieImage} alt="Presto" className="h-60 w-40 opacity-70" />
        </div>

        {/* Loading Timeline */}
        {isTransitioning && loadingStages.length > 0 && (
          <LoadingTimeline
            stages={loadingStages}
            totalDuration={loadingDuration}
            isActive={true}
          />
        )}

        {/* Logs Content */}
        <div className="relative z-10">
          {logs.length === 0 ? (
            <div className="text-muted-foreground text-center py-4">
              <CyclingGeminiText
                texts={['Presto ready to assist', 'What can I help you with?']}
                speed={15}
                delayBetweenTexts={3000}
                showCursor={true}
              />
            </div>
          ) : (
            <div className="space-y-0.5">
              {logs.map((log, idx) => {
                const isUserMessage = log.type === 'query'
                const isHeader = log.type === 'header' || log.type === 'header-done'
                const isHeaderDone = log.type === 'header-done'
                const isTextContent = log.type === 'system'

                return (
                  <div key={log.id}>
                    {isUserMessage ? (
                      // User chat bubble - prominent with left margin
                      <div className="ml-20 flex justify-end">
                        <div className="bg-accent/20 rounded-lg px-3 py-2 max-w-xs">
                          <div className="text-xs text-accent font-medium">
                            <GeminiStreamText
                              text={log.text}
                              speed={8}
                              showCursor={false}
                            />
                          </div>
                        </div>
                      </div>
                    ) : isHeader ? (
                      // Headers with timeline dots
                      <div className="flex gap-2">
                        {/* Timeline column */}
                        <div className="flex flex-col items-center">
                          {/* Timeline dot */}
                          <div className="w-2 h-2 rounded-full bg-accent/60 flex-shrink-0" />
                          {/* Connecting line to next item */}
                          {logs[idx + 1] && (
                            <div className="w-0.5 h-1 bg-accent/30" />
                          )}
                        </div>

                        {/* Message content */}
                        <div className="flex-1 min-w-0">
                          {isHeaderDone ? (
                            <div className="text-xs text-emerald font-medium">
                              <GeminiStreamText
                                text={log.text}
                                speed={8}
                                showCursor={false}
                              />
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">
                              <GeminiStreamText
                                text={log.text}
                                speed={6}
                                showCursor={false}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : isTextContent ? (
                      // Text content under headers - no dots
                      <div className="flex gap-2 ml-4">
                        <div className="text-xs text-muted-foreground/70">
                          <GeminiStreamText
                            text={log.text}
                            speed={5}
                            showCursor={false}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
          )}
          {agentStatus === 'thinking' && (
            <div className="text-purple animate-shimmer text-xs mt-4">
              ⚡ thinking...
            </div>
          )}
          <div ref={logsEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-background">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={agentStatus === 'thinking'}
            className="text-xs h-9 rounded-[4px]"
          />
          <Button
            type="submit"
            disabled={agentStatus === 'thinking' || !input.trim()}
            size="sm"
            className="h-9 w-9 p-0 rounded-[4px]"
          >
            <Send size={14} />
          </Button>
        </form>
      </div>
    </aside>
  )
}
